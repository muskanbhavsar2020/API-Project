const express= require("express");


// Database
const database = require("./database");

// Initialize express
const booky=express();


/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/",(req,res) =>{
  return res.json({books:database.books});
});

/*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",(req,res) =>{
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if(getSpecificBook.length===0){
    return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book:getSpecificBook});
});

/*
Route            /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/
booky.get("/c/:category",(req,res) =>{
  const getSpecificBook=database.books.filter(
    (book) => book.category.includes(req.params.category)
  );

  if (getSpecificBook.length===0){
    return res.json({error:`No book found for the category of ${req.params.category}`});
  }

  return res.json({book:getSpecificBook});
});

/*
Route            /l
Description      Get specific book on languages
Access           PUBLIC
Parameter        language
Methods          GET
*/
booky.get("/l/:language",(req,res) =>{
  const getSpecificBook=database.books.filter(
    (book) => book.language.includes(req.params.language)
  );

  if (getSpecificBook.length===0){
    return res.json({error:`No book found for the language of ${req.params.language}`});
  }

  return res.json({book:getSpecificBook});
});



/*
Route            /author
Description      Get all author
Access           PUBLIC
Parameter        category
Methods          GET
*/
booky.get("/author",(req,res) =>{
  return res.json({authors:database.author});
});

/*
Route            /author/book
Description      Get all author based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/author/book/:isbn", (req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
  );

  if(getSpecificAuthor.length === 0){
    return res.json({
      error: `No author found for the book of ${req.params.isbn}`
    });
  }
  return res.json({authors: getSpecificAuthor});
});

/*
Route         /author/id
Description   Get specific author based on ID
Access        Public
Parameters    id
Methods       GET
*/
booky.get("/author/id/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.id));
  if (getSpecificAuthor.length === 0)
    return res.json({
      ERROR: `No author found for the id of ${req.params.id}`
    });
  else {
    return res.json({
      author: getSpecificAuthor
    });
  }
});



/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/publications",(req,res) => {
  return res.json({publications:database.publication});
});

/*
Route         /publications
Description   Get the specific publication
Access        Public
Parameter     name
Methods       GET
*/
booky.get("/publications/:name",(req,res) =>{
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.name.includes(req.params.name)
  );
  if(getSpecificPublication.length === 0) {
    return res.json({error: `No publication found for the book of ${req.params.name}`});
  }
  return res.json({publications: getSpecificPublication});
});

/*
Route            /publications/book
Description      Get publications based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/publications/book/:isbn",(req,res) =>{
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.books.includes(req.params.isbn)
  );

  if(getSpecificPublication.length === 0){
    return res.json({
      error: `No publication found for the book of ${req.params.isbn}`
    });
  }
  return res.json({publications: getSpecificPublication});
});




booky.listen(3000,() =>{
  console.log("Server is up and running");
});
