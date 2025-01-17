const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const btn = document.getElementById("myBtn");
let bookId = 0;

const myLibrary = [
    {
        title: 'Choke',
        author: 'Palahniuk',
        pages: 372,
        hasRead: true
    },

    {
        title: '1Q84',
        author: 'Murakami',
        pages: 319,
        hasRead: false
    }
];

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
    book.id = bookId;

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

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addBookToLibrary();
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.checked = false;
    bookId++;
    console.log(myLibrary);
});

const deleteBtn = document.getElementById("delete");
deleteBtn.onclick = function () {
    myLibrary.splice(this.id);
    // myLibrary.some(title: )
}

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

        const titleDiv = document.createElement("div");
        titleDiv.setAttribute("class", "titleDiv");
        cardHeader.appendChild(titleDiv);

        const bookDelete = document.createElement("span");
        bookDelete.innerHTML = `<span id="delete">&times;</span>`
        cardHeader.appendChild(bookDelete);
 
        const cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");
        card.appendChild(cardFooter);


        //Loops through each object in myLibrary and displays value of each key to create
        // the card layout
        for (const [key, value] of Object.entries(book)) {

            if (key === "title") {
                const bookTitle = document.createElement("h2");
                bookTitle.setAttribute("class", "title");
                bookTitle.innerText = value;
                titleDiv.appendChild(bookTitle);

            } else if (key === "author") {
                const bookAuthor = document.createElement("h3");
                bookAuthor.setAttribute("class", "author");
                bookAuthor.innerText = value;
                titleDiv.appendChild(bookAuthor);

            } else if (key === "pages") {
                const bookPages = document.createElement("p");
                bookPages.setAttribute("class", "pages");
                bookPages.innerText = value + " Pages";
                cardFooter.appendChild(bookPages);

            } else if (book["hasRead"] == true) {
                const bookHasRead = document.createElement("p");
                bookHasRead.setAttribute("class", "hasRead");
                cardFooter.appendChild(bookHasRead);
                bookHasRead.innerText = "✔️"
            }
        }
    }

}




