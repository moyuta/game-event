let http = require("https");
let url = require("url");
let fs = require("fs");
let app = require("http").createServer(handler);
const Logic = require("./logic.js");

app.listen(process.env.PORT || 3000);
console.log("server  start!");

function handler(req, res) {
  let q = url.parse(req.url, true);
  if (req.method == "POST") {
    switch (q.pathname) {
      case "/first":
        req.on("data", function (chunk) {
          let logic = new Logic();
          let ban = logic.first();
          res.end(JSON.stringify(ban));
        });
        break;
      case "/click":
        let dd = "";
        req.on("data", function (chunk) {
          dd += chunk;
          let jsondata = JSON.parse(dd);
          let logic2 = new Logic();
          let num = 0
          if(jsondata.x==0 && jsondata.y==0){
            num = 0
          }else  if(jsondata.x==1 && jsondata.y==0){
            num = 1
          }else  if(jsondata.x==2 && jsondata.y==0){
            num = 2
          }else  if(jsondata.x==0 && jsondata.y==1){
            num = 3
          }else  if(jsondata.x==1 && jsondata.y==1){
            num = 4
          }else  if(jsondata.x==2 && jsondata.y==1){
            num = 5
          }else  if(jsondata.x==0 && jsondata.y==2){
            num = 6
          }else  if(jsondata.x==1 && jsondata.y==2){
            num = 7
          }else{
            num = 8
          }
          let ban2 = logic2.click(num);
          res.end(JSON.stringify(ban2));
        });
        break;
      default:
        return res.end("Error");
        break;
    }
  } else {
    switch (q.pathname) {
      case "/":
        fs.readFile("./frontend/game.html", "UTF-8", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
        break;

      case "/game.js":
        fs.readFile("./frontend/game.js", "UTF-8", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/javascript" });
          res.end(data, "utf-8");
        });
        break;

      case "/game.css":
        fs.readFile("./frontend/game.css", "UTF-8", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        });
        break;

      default:
        res.writeHead(500);
        return res.end("Error");
        break;
    }
  }
}
