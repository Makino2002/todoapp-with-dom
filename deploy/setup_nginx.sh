#!/bin/bash
HOSTNAME_PARAM=$1
IP_ADDRESS_PARAM=$2

echo ">>> [$HOSTNAME_PARAM] Setup TODOAPP <<<"

# Đảm bảo apt không bị lock
while sudo fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1 || sudo fuser /var/lib/apt/lists/lock >/dev/null 2>&1 ; do
  echo ">>> [$HOSTNAME_PARAM] Waiting for apt..."
  sleep 5
done

# Cài Node.js 20, Git, Nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs git nginx
echo ">>> Tự động thêm SSH public key để GitHub Actions có thể kết nối <<<"

mkdir -p /home/vagrant/.ssh

cat <<EOF >> /home/vagrant/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDDOg3eFVZnXYl9uMN8uRRv6PJ75RgiteEiKOaJT4dOBI7gSlNBS96YWBPDVFX864KEUwb93V554GIrL3XwPI2JcbKToO8G6lPM6OAZ5pm7jXr6CmpGATKBWd+W15GGhz9D6eLvUA46SDHHuRjlCMKCw1R7syCAkBGdPHn3sP9Ocq051JX1NERIuECZjUgsCoNERipRiuOgV9wrScrwThtrGg4/rj+m/aMubTIu4Dp7iBlqmdEv1oXerZUuNVY6lR9WTsOVY3SP+BEwB+hAQzmMZQCabJjEEn8pCXD07vbCcKz4XaT92AmRA+697exnDEhQb5Q1gNhTmMD0GIgO3MqSWhJBbUMKfCL6dkfm5CwEdPQU/koOmi+bL+kYViB9WPL7MEzrvnITNMwKyEPIOCeBEhhSo5RTtroMg5JQzKSl+dvtOlfTJwdgYq5yvsGFJBel06cZ6z+OYaFQPgtvC40hDy//32glesSqxh7OhjCKHL+k6wmF23aamC+WDz9yI/Anj449IHsbZNFDZwmLHERr62cZMI0LsIYqCD/2jUdm9Gt2HyFWNT8jz9av748r/ZHSDxdEPB5sFx2/UVTjSkBr2upyPGhceXvMEqV07WAeLmYx8hJCb1KBT4rKONKkCUhnn/3XGnEMGnx1M9aZ2CglzjM/UoSf62TAPiHW+RKibQ== github-cicd
EOF

chown -R vagrant:vagrant /home/vagrant/.ssh
chmod 700 /home/vagrant/.ssh
chmod 600 /home/vagrant/.ssh/authorized_keys

# Clone dự án
cd /home/vagrant
if [ ! -d "todoapp-with-dom" ]; then
  git clone https://github.com/Makino2002/todoapp-with-dom.git
fi

cd todoapp-with-dom

# Cài backend
cd backend
npm install

# Cho phép Node chạy dưới port thấp nếu cần
sudo setcap 'cap_net_bind_service=+ep' $(which node)

# Tạo reverse proxy qua Nginx
sudo cp ../deploy/nginx.conf /etc/nginx/sites-available/todoapp
sudo ln -sf /etc/nginx/sites-available/todoapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Dừng app cũ nếu có
pkill -f "node server.js" || true

# Chạy lại Node.js ở background
nohup node server.js > ~/node.log 2>&1 &
