const http = require("http");

http.createServer(function(req, res) {
	res.write("On my way to become a Full Stack engineer!");
	res.end();
}).listen(3000);

console.log("Server started on port 3000");
