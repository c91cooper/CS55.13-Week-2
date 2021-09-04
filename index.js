//load core node http module
const http = require("http");

//load core fs node module to use promises rather than callbacks
const fs = require("fs").promises;

//operations for http requests
const requestListener = function (req, res){
  // output request URL
  console.log(req.url);

  if (req.url === "/"){
    // check request url, if root, return html file
    fs.readFile(__dirname + "/page.html")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        // send back file contents + close response
        res.end(contents);
      });
  }else{
     // if request url not root, return json file
    fs.readFile(__dirname + "/data.json")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        // send back file contents + close response
        res.end(contents);
      });

  }
};

//define TCP port and IP address
const port = "8080";
const host = "0.0.0.0";

//create server
const server = http.createServer(requestListener);

//tell server to look for requests
server.listen(
  port , host , () => {
    console.log(`Server is running on http://${host} : ${port}`);
  }
);