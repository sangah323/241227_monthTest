const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

app.set("view engine", "html");

nunjucks.configure("userBoard", { express: app });

app.use(express.urlencoded({ extended: true }));

const boardList = [
  {
    id: 1,
    user_id: "whtkddk",
    writer: "조상아",
    title: "241227 월별평가",
    content: "6시에 집갈거임",
    hit: 0,
  },
];

app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/userBoard/wirte.html");
});

app.post("/write", (req, res) => {
  const { writer, title, content } = req.body;
  boardList.push({
    id: boardList.length + 1,
    user_id: "whtkddk",
    writer: writer,
    title: title,
    content: content,
    hit: 0,
  });
});

app.listen(3000, () => {
  console.log("server start");
});
