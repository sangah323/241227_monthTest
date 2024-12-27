const express = require("express");
const app = express();

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

app.listen(3000, () => {
  console.log("server start");
});
