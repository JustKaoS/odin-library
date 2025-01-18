const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const btn = document.getElementById("myBtn");

const myLibrary = [];

displayBooks();

function Book(title, author, pages, hasRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
}

function addBookToLibrary() {
    const book = new Book();
    let formTitle = document.getElementById("formTitle");
    let formAuthor = document.getElementById("formAuthor");
    let formPages = document.getElementById("formPages");
    let formRead = document.getElementById("formRead");

    book.title = formTitle.value;
    book.author = formAuthor.value;
    book.pages = parseInt(formPages.value);
    book.hasRead = formRead.checked;
    book.id = generateUniqueId();
    console.log(book.id);
    console.log(book.id);

    const bookExists = myLibrary.some(existingBook =>
        existingBook.title === book.title);

    if (bookExists) {
        alert("This book is already in the library!");
    } else {
        myLibrary.push(book);
        console.log(myLibrary);
    }
    displayBooks();
}


// generates a random string for book ID's
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}



const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addBookToLibrary();
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.checked = false;
});


// adds event listener to library container for click event on delete button
const bookList = document.querySelector('.container');
bookList.addEventListener('click', function (e) {
    if (e.target && (e.target.classList.contains('delete') || e.target.classList.contains('hasRead'))) {
        const bookId = e.target.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            if (e.target.classList.contains('delete')) {
                myLibrary.splice(bookIndex, 1);
            } else if (e.target.classList.contains('hasRead')) {
                myLibrary[bookIndex].hasRead = !myLibrary[bookIndex].hasRead;
            }

            displayBooks();
        }
    }
});



btn.onclick = function () {
    modal.style.display = "block";
    modalBackdrop.style.display = "block";
    modal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
}

window.onclick = function (e) {
    if (e.target == modal || e.target == modalBackdrop) {
        modal.style.display = "none";
        modalBackdrop.style.display = "none";
    }
}


// Loops through myLibrary and creates a div "card" for each book
// Would like to add cover images accessing openlibrary api
function displayBooks() {
    const container = document.querySelector(".container");
    container.innerHTML = '';
    for (const book of myLibrary) {

        const card = document.createElement("div");
        card.setAttribute("class", "card");
        container.appendChild(card);

        const cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        card.appendChild(cardHeader);

        //this is an invisible div to center the book titles
        const emptyDiv = document.createElement("div");
        emptyDiv.innerHTML = `&times;`
        emptyDiv.setAttribute("class", "delete");
        emptyDiv.setAttribute("id", "blank");
        cardHeader.appendChild(emptyDiv);

        const titleDiv = document.createElement("div");
        titleDiv.setAttribute("class", "titleDiv");
        cardHeader.appendChild(titleDiv);

        const bookDelete = document.createElement("span");
        bookDelete.innerHTML = `&times;`
        bookDelete.setAttribute("class", "delete");
        bookDelete.setAttribute("id", book.id);
        cardHeader.appendChild(bookDelete);

        const cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");
        card.appendChild(cardFooter);


        //Loops through each object in myLibrary and displays value of each key to create
        // the card layout
        for (const [key, value] of Object.entries(book)) {

            if (key === "title") {
                const bookTitle = document.createElement("h3");
                bookTitle.setAttribute("class", "title");
                bookTitle.innerText = value;
                titleDiv.appendChild(bookTitle);

            } else if (key === "author") {
                const bookAuthor = document.createElement("h4");
                bookAuthor.setAttribute("class", "author");
                bookAuthor.innerText = value;
                titleDiv.appendChild(bookAuthor);

            } else if (key === "pages") {
                const bookPages = document.createElement("p");
                bookPages.setAttribute("class", "pages");
                bookPages.innerText = value + " Pages";
                cardFooter.appendChild(bookPages);

            }
        }


        const bookHasRead = document.createElement("p");
        bookHasRead.setAttribute("class", "hasRead");
        bookHasRead.setAttribute("id", book.id);
        bookHasRead.innerHTML = "&check;"
        if (book["hasRead"] == true) {
            bookHasRead.style.color = "rgb(83, 139, 83)";
        } else {
            bookHasRead.style.color = "rgb(145, 57, 57)";
        }
        cardFooter.appendChild(bookHasRead);
    }
}



console.log(myLibrary);
