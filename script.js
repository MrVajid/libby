"use strict"
const books = [];
const addBookBtn = document.querySelector("#new-book");
const bookForm = document.querySelector("#book-form");
const cancelForm = document.querySelector("#cancel");
const submitForm = document.querySelector("#submit");
const cardContainer = document.querySelector(".card-container");
const readToggleArr = document.querySelectorAll("#complete");

const bookName = document.querySelector("#book-name");
const authorName = document.querySelector("#author-name");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#isRead");

function Book(bookName, authorName, pages, read){
    this.bookName = bookName;
    this.authorName = authorName;
    this.pages = pages;
    this.read = read;
}

Book.prototype.readToggle = function() {
    if(this.read === "true"){
        this.read = "false";
        return "Not Read";
    }
    else{
        this.read = "true";
        return "Read";
    }
}

books.push(new Book("The Kite Runner", "Khaled Hosseini", "334", "true"));
cardContainer.appendChild(cardMaker(books[0]));

document.addEventListener("click", (e) => {
    const elem = e.target;
    if(elem.getAttribute("index") !== null) {
        let index = elem.getAttribute("index");
        if(elem.tagName === "INPUT"){
            elem.previousSibling.textContent = books[index].readToggle();
        }
        else if(elem.tagName === "BUTTON"){
            delete books[index];
            elem.parentNode.parentNode.remove();
        }
    }
})

addBookBtn.addEventListener("click", () => {
    bookForm.showModal();
})
cancelForm.addEventListener("click", () => {
    bookForm.close(false);
})
submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    let isRead = false;
    if(readStatus.checked === true) isRead = true;
    bookForm.close([bookName.value, authorName.value, pages.value, isRead]);
    bookName.value = "";
    authorName.value = "";
    pages.value = null;
    readStatus.checked = false;
})
bookForm.addEventListener("close", (e) => {
    let [bookName, authorName, pages, isRead] = bookForm.returnValue.split(',');
    let book = new Book(bookName, authorName, pages, isRead);
    books.push(book);
    let newBook = cardMaker(book);
    cardContainer.appendChild(newBook);
})

function cardMaker(book){
    let isRead = "Not Read";
    if(book.read === "true"){
        isRead = "Read";
    } 
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", "info");
            const h2 = document.createElement("h2");
                h2.textContent = book.bookName;
            const h3 = document.createElement("h3");
                h3.textContent = "Author: " + book.authorName;
            const infoP = document.createElement("p");
            infoP.textContent = "Pages: " + book.pages.toString()
            infoDiv.append(h2, h3, infoP);
        const actionsDiv = document.createElement("div");
        actionsDiv.setAttribute("class", "actions");
            const label = document.createElement("label");
                label.textContent = isRead;
                label.setAttribute("for", `complete`+`${books.length - 1}`);
            const input = document.createElement("input");
                setAttributes(input, {"type":"checkbox", "index":`${books.length - 1}`, "id":"complete"+`${books.length - 1}`});
                if(book.read === "true"){input.setAttribute("checked", "true");};
            const button = document.createElement("button");
                button.textContent = "Delete";
                setAttributes(button, {"type":"button", "index":`${books.length - 1}`});
            actionsDiv.append(label, input, button);
        const ratingsDiv = document.createElement("div");
        ratingsDiv.setAttribute("class", "rating");
            const ratingsP = document.createElement("p");
            ratingsP.textContent = "Read book to give rating (will implement later)"
            ratingsDiv.append(ratingsP);
    cardDiv.append(infoDiv, actionsDiv, ratingsDiv);

    return cardDiv;
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
}

