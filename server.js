// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// ../sfr/items 폴더 경로
app.use(express.static("mainpage"));
const itemsDir = path.join(__dirname, "sfr/items");

// JSON 파일 목록을 가져오는 API
app.get("/api/items", (req, res) => {
  fs.readdir(itemsDir, (err, folders) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Failed to read directory" });
    }
    console.log("Folders found:", folders); // 폴더 목록 출력

    const items = [];
    folders.forEach(folder => {
      const folderPath = path.join(itemsDir, folder);
      if (fs.lstatSync(folderPath).isDirectory()) {
        const jsonFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".json"));
        console.log(`Files in ${folder}:`, jsonFiles); // 각 폴더 내 파일 목록 출력
        items.push({ folder, files: jsonFiles });
      }
    });

    res.json(items);
  });
});

// 특정 JSON 파일 내용을 가져오는 API
app.get("/api/items/:folder/:file", (req, res) => {
  const { folder, file } = req.params;
  const filePath = path.join(itemsDir, folder, file);

  if (filePath.endsWith(".json") && fs.existsSync(filePath)) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Failed to read file" });
      res.json(JSON.parse(data));
    });
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
