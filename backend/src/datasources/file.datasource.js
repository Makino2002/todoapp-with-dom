const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../../data.json");

function readData() {
  try {
    const content = fs.readFileSync(file, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing data:", err);
  }
}

module.exports = { readData, writeData };
