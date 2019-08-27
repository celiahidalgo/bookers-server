const express = require("express");
const axios = require("axios");
const router = express.Router();

const BookModel = require("../models/Book");


router.route('/')
  .get(async (req, res) => {

    const books = await BookModel.find({ book: req.book });
    if (!books) {
      return res.status(400).send();
    }

    return res.status(200).json({ books });


  })


  .post(async (req, res) => {
    const booksApi = process.env.API_URL;

    const filterSearch =
      req.query.q && req.query.q !== "undefined" ? `q=${req.query.q}` : `q=""`;
    // const search = req.body.q
    // const query = `q=${search}`;
    const urlToFetch = `${booksApi}?${filterSearch}`;
    const books = await axios.get(urlToFetch, {
      params: {
        q: filterSearch
      }
    });
    const dataToSave = books.data.items;
    // const checkModel = BookModel.find({ "book.title": value.volumeInfo.title });
    // const articlesFiltered = dataToSave.filter(item => {
    //   const check = checkModel.find(book => book.title === item.title);
    //   return !Boolean(check);
    // });
    // console.log(check);
    dataToSave.forEach(function (value) {
      const book = new BookModel({
        title: value.volumeInfo.title,
        author: value.volumeInfo.authors || "",
        publishedOn: value.volumeInfo.publishedDate || "",
        image: value.volumeInfo.imageLinks || "",
        description: value.searchInfo.textSnippet || ""
      });


      if (req.body.query === "undefined") {
        return res.status(400).send();
      }

      book.save();
    });

  });
// router.get("/", async (req, res, next) => {
//   const booksApi = process.env.API_URL;

//   const filterSearch =
//     req.query.q && req.query.q !== "undefined" ? `q=${req.query.q}` : `q=""`;
//   // const search = req.body.q
//   // const query = `q=${search}`;
//   const urlToFetch = `${booksApi}?${filterSearch}`;
//   const books = await axios.get(urlToFetch, {
//     params: {
//       q: filterSearch
//     }
//   });
//   const dataToSave = books.data.items;
//   // const checkModel = BookModel.find({ "book.title": value.volumeInfo.title });
//   // const articlesFiltered = dataToSave.filter(item => {
//   //   const check = checkModel.find(book => book.title === item.title);
//   //   return !Boolean(check);
//   // });
//   // console.log(check);
//   dataToSave.forEach(function (value) {
//     const book = new BookModel({
//       title: value.volumeInfo.title,
//       author: value.volumeInfo.authors || "",
//       publishedOn: value.volumeInfo.publishedDate || "",
//       image: value.volumeInfo.imageLinks || "",
//       description: value.searchInfo.textSnippet || ""
//     });


//     if (req.body.query === "undefined") {
//       return res.status(400).send();
//     }

//     book.save();
//   });
// });


router.get("/:id", async (req, res) => {
  const book = await BookModel.findOne({ "_id": req.params.id });

  if (!book) {
    return res.status(400).send();
  }

  return res.status(200).json({ book });
});

// router.get("/all", async (req, res) => {
//   const books = await BookModel.find({ book: req.book });
//   if (!books) {
//     return res.status(400).send();
//   }

//   return res.status(200).json({ books });
// });

router.post("/all/favs", async (req, res) => {
  const book = await BookModel.findOne({ "book.title": req.body.query });
  console.log(req.body.query);
  if (req.body.query === "undefined") {
    console.log(book);
    return res.status(400).send();
  }

  return res.status(200).json({ book });
});

router.patch("/update-fav/:id", async function (req, res) {
  const book = await BookModel.findOne({ "book.title": req.body.title });
  book.favorite = !Boolean(book.favorite);
  BookModel.update({ "book.favorite": true });
  // const article = BookModel.find(item => item.id === req.params.id);
  // article.fav = !Boolean(article.fav);
  // BookModel.update({ "book.favorite": true });

  return res.status(200).send();
});

router.post("/search", async (req, res) => {
  const book = await BookModel.findOne({ "book.title": req.body.query });
  console.log(req.body.query);
  if (req.body.query === "undefined") {
    console.log(book);
    return res.status(400).send();
  }

  return res.status(200).json({ book });
});

module.exports = router;
