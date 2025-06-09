
$process = Get-Process node -ErrorAction SilentlyContinue
if ($process) {
    Stop-Process -Name node -Force
    Write-Host "Đã dừng tiến trình Node cũ"
}

Start-Process `
  -FilePath "C:\Program Files\nodejs\node.exe" `
  -ArgumentList "F:\todoapp-with-dom\backend\server.js" `
  -RedirectStandardOutput "F:\todoapp-with-dom\backend\logs\stdout.log" `
  -RedirectStandardError "F:\todoapp-with-dom\backend\logs\stderr.log" `
  -NoNewWindow
Write-Host "🎉 Backend khởi động"
