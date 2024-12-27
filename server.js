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
  {
    id: 2,
    user_id: "whtkddk1234",
    writer: "조상아",
    title: "우리 인생",
    content: "화이팅,,ㅎ",
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

app.get("/list", (req, res) => {
  res.render("./list.html", { boardList });
});

app.get("/view", (req, res) => {
  const { id } = req.query;
  const list = boardList.find((value) => value.id === parseInt(id));
  res.render("./view.html", { list });
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const index = boardList.findIndex((value) => value.id === parseInt(id));
  if (index !== 1) {
    res.status(404).send("게시글이 존재하지 않음");
  }
  boardList.splice(index, 1);
  res.redirect("/list");
});

app.listen(3000, () => {
  console.log("server start");
});
