const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const btn = document.getElementById("myBtn");


class Book {
    constructor(title, author, pages, hasRead, id, isbn) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.id = id;
        this.isbn = isbn;
    }
}


class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        const bookExists = this.books.some(existingBook => existingBook.title === book.title);
        if (bookExists) {
            alert("This book is already in the library!");
        } else if (isNaN(book.pages)) {
            alert("Please enter Pages as a number");
        } else {
            this.books.push(book);
            console.log(this.books);
            this.displayBooks();
        }
    }
    displayBooks() {
        const container = document.querySelector(".container");
        container.innerHTML = '';
        this.books.forEach(book => {

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

            // const bookCover = document.createElement("div");
            // bookCover.setAttribute("class", "coverImg");
            // bookCover.setAttribute("id", book.id);
            // card.appendChild(bookCover);

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

                } else if (key === "isbn") {
                    const bookCover = document.createElement("img");
                    bookCover.setAttribute("class", "book-cover");
                    const coverUrl = `https://covers.openlibrary.org/b/isbn/${value}-L.jpg`;
                    bookCover.src = coverUrl;
                    bookCover.alt = "Book Cover";
                    bookCover.setAttribute("class", "coverImg");
                    card.appendChild(bookCover);

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
                bookHasRead.innerHTML = "&check;";
                if (book.hasRead) {
                    bookHasRead.style.color = "rgb(83, 139, 83)";
                } else {
                    bookHasRead.style.color = "rgb(145, 57, 57)";
                }
                cardFooter.appendChild(bookHasRead);

                bookDelete.addEventListener('click', () => this.deleteBook(book.id));
                bookHasRead.addEventListener('click', () => this.toggleHasRead(book.id, bookHasRead));
            
        });
    };

    deleteBook(bookId) {
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
            this.displayBooks();
        }
    }

    toggleHasRead(bookId, bookHasReadEle) {
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            const book = this.books[bookIndex];
            book.hasRead = !book.hasRead;
            if (book.hasRead) {
                bookHasReadEle.innerHTML = "&check;";
                bookHasReadEle.style.color = "rgb(83, 139, 83)";
            } else {
                bookHasReadEle.innerHTML = "&check;";
                bookHasReadEle.style.color = "rgb(145, 57, 57)";
            }

        }
    }
}



// generates a random string for book ID's
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


const myLibrary = new Library();


const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const formTitle = document.getElementById('formTitle');
    const formAuthor = document.getElementById('formAuthor');
    const formPages = document.getElementById('formPages');
    const formRead = document.getElementById('formRead');
    const formISBN = document.getElementById('formISBN');

    const book = new Book(
        formTitle.value,
        formAuthor.value,
        formPages.value,
        formRead.checked,
        generateUniqueId(),
        formISBN.value
    );
    myLibrary.addBook(book);
    myLibrary.displayBooks();
    modal.style.display = "none";
    modalBackdrop.style.display = "none";

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
        form.reset();
    }
}
