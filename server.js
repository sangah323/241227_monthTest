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
  res.sendFile(__dirname + "/userBoard/write.html");
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
  res.redirect(`view/${boardList.length}`);
});

app.get("/list", (req, res) => {
  res.render("./list.html", { boardList });
});

app.get("/view/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const list = boardList.find((value) => value.id === id);
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

app.get("/modify/:id", (req, res) => {
  const id = req.params.id;
  const list = boardList.find((value) => value.id === parseInt(id));
  res.render("./modify.html", { list });
});

// modify 기능 수정 필요
app.post("/modify/:id", (req, res) => {
  const id = req.params.id;
  const { writer, title, content } = req.body;
  const index = boardList.findIndex((value) => value.id === parseInt(id));
  if (index !== 1) {
    res.status(404).send("해당 아이디를 찾지 못함");
  }
  boardList[index].title = title;
  boardList[index].writer = writer;
  boardList[index].content = content;
  res.redirect(`/view/${id}`);
});

app.listen(3000, () => {
  console.log("server start");
});
