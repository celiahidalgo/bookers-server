const axios = require("axios");
const BookModel = require("../models/Book");

exports.bookGET = async function (req, res) {

    const books = await BookModel.find({ book: req.book });
    if (!books) {
        return res.status(400).send();
    }
    return res.status(200).json({ books });
}
// let regex = new RegExp(req.query.q, 'i');

//     if (req.query.q && req.query.q !== "undefined") {
//         const books = await BookModel.find({ title: req.query.q });
//         return res.status(200).json({ books });
//     }
//     else
//         console.log(req.user)
//     const books = await BookModel.find({ books: req.books });

//     return res.status(200).json({ books });

//     if (!books) {
//         return res.status(400).send();
//     }


// }
// exports.bookFETCH = async function (req, res) {
//     const booksApi = process.env.API_URL;
//     const filterSearch = req.query.q !== undefined ? `q=${req.query.q}` : `q=""`;
//     const urlToFetch = `${booksApi}`;
//     const books = await axios.get(urlToFetch, {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         params: {
//             q: filterSearch
//         }
//     });
//     const dataToSave = (books.data.items);

//     dataToSave.forEach(function (value) {
//         // const formatBook = JSON.stringify(value)
//         // console.log(value)
//         const book = new BookModel({
//             bookId: value.id,
//             title: value.volumeInfo.title,
//             author: value.volumeInfo.authors || "",
//             publishedOn: value.volumeInfo.publishedDate || "",
//             image: value.volumeInfo.imageLinks || "",
//             description: value.searchInfo.textSnippet || ""
//         });
//         // JSON.stringify
//         book.save()

//         if (req.body.q === "undefined") {
//             return res.status(400).send();
//         }

//         return res.status(200, "ok");

//     }
//     )
// }
exports.bookPOST = async function (req, res) {
    const booksApi = process.env.API_URL;
    const filterSearch = req.query.q !== undefined ? `${req.query.q}` : `a`;
    console.log(filterSearch)
    const urlToFetch = `${booksApi}?q=${filterSearch}`;
    console.log(urlToFetch)

    const books = await axios.get(urlToFetch, {
        params: {
            q: filterSearch
        }
    });
    var googleBooks = books.data.items,
        myBooks = await BookModel.find({ "book": req.book });;

    const intersection = googleBooks.filter(book => myBooks.find(myBooks => book.id === myBooks.bookId))
    // var intersection = array1.filter(function (e) {
    //     return array2.indexOf(e) > -1;
    // });

    console.log(intersection);
    // const filtered = await BookModel.find({ "book": books.data.items });
    // console.log(filtered)
    const dataToSave = (books.data.items);

    (intersection.length > 0 ? intersection : dataToSave).forEach(function (value) {
        // const formatBook = JSON.stringify(value)
        // console.log(dataToSave)
        const book = new BookModel({
            bookId: value.id,
            title: value.volumeInfo.title || "",
            author: value.volumeInfo.authors || "",
            publishedOn: value.volumeInfo.publishedDate || "",
            image: value.volumeInfo.imageLinks || "",
            categories: value.volumeInfo.categories || [],
            description: value.volumeInfo.description || "",
            // description: value.searchInfo.textSnippet || "",
        });
        // console.log(book)
        // JSON.stringify
        book.save()

        // if (req.body.q === "undefined") {
        //     return res.status(400).send();
        // }

        return res.status(200, "ok");

    }
    )
}

exports.bookIdGET = async function (req, res) {
    const book = await BookModel.findOne({ "_id": req.params.id });

    if (!book) {
        return res.status(400).send();
    }

    return res.status(200).json({ book });
};
