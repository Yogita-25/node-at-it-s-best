const book = {
    title: 'let us c',
    author: 'Yashwant Kanetkar'
}

console.log("book", book);                           //book { title: 'let us c', author: 'Yashwant Kanetkar' }  //book.title gives title of the book

const objectToString = JSON.stringify(book);

console.log("objectToString", objectToString);      //objectToString {"title":"let us c","author":"Yashwant Kanetkar"}  //objectToString.title gives undefined as objectToString is a String

const stringToObject = JSON.parse(objectToString);

console.log("stringToObject", stringToObject);    //stringToObject { title: 'let us c', author: 'Yashwant Kanetkar' }
