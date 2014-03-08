var express = require("express");
var app = express()
var fs = require("fs");

var html_dir = './html/';

app.configure(function(){

    app.use(express.multipart());
	
});

app.get('/', function (req, res) {
	
	res.sendfile(html_dir + 'upload.html');
	
});

app.post('/file-upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {
	
		var imageName = req.files.image.name;
		
		if(!imageName){
		
			console.log("Error retrieving image");
			res.redirect("/");
			res.end();
			
		}
		else {
			
			var imagePath = "./uploads/" + imageName;
			
			fs.writeFile(imagePath, data, function (err) {
				
				res.sendfile("./uploads/" + imageName);
				
			});
		}
	});
});

var server = app.listen(8088, function() {

    console.log('Listening on port %d', server.address().port);
	
});