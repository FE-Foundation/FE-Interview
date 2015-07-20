var express = require("express"),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PROT || 3000;
var app = express();

app.use(express.static(path.join(__dirname,'site')));
app.use(bodyParser.urlencoded({extend: false}));
app.listen(port);

//Connect to database
mongoose.connect('mongodb://localhost/library');

//Schemas
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date
});

//Models
var BookModel = mongoose.model('Book', Book);

console.log('started on port ' + port);    

app.get('/api', function (req, res) {
	res.sendFile(__dirname+'/site/index.html');
});

//Get a list of all books
app.get('/api/books', function (req, res) {
	return BookModel.find(function (err, books) {
		if (!err) {
			res.send(books);
		} else {
			console.log(err);
		}
	})
});

//Insert a new book
app.post('/api/books', function (req, res) {
	var book = new BookModel({
		title: req.body.title,
		author: req.body.author,
		releaseDate: req.body.releaseDate
	});
	book.save(function (err) {
		if (!err) {
			console.log('created');
		} else {
			console.log(err);
		}
	});
	res.send(book);
});

//Get a single book by id 
app.get('/api/books/:id', function (req, res) {
	BookModel.findById(req.params.id, function (err, book) {
		if (!err) {
			res.send(book);
		} else {
			console.log(err);
		}
	});
});

//Update a book
app.put('/api/books/:id', function (req, res) {
	BookModel.findById(req.params.id, function (err, book) {
		book.title = req.body.title;
		book.author = req.body.author;
		book.releaseDate = req.body.releaseDate;

		book.save(function (err) {
			if (!err) {
				console.log('book updated');
			} else {
				console.log(err);
			}
		});
	});
});

//Delete a book
app.detele('/api/books/:id', function (req, res) {
	BookModel.findById(req.params.id, function (err, book) {
		book.remove(function (err) {
			if (!err) {
				console.log('Book removed');
				response.send('');
			} else {
				console.log(err);
			}
		});
	});
});