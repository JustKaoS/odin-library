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

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}



// Loops through myLibrary and creates a div "card" for each book
// Would like to add cover images accessing openlibrary api
function displayBooks() {
    const container = document.querySelector(".container");
    for (const book of myLibrary) {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        container.appendChild(card);

        const cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        card.appendChild(cardHeader);

        const cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");
        card.appendChild(cardFooter);


        //Loops through each object in myLibrary and displays value of each key
        for (const [key, value] of Object.entries(book)) {

            if (key === "title") {
                const bookTitle = document.createElement("h2");
                bookTitle.setAttribute("class", "title");
                bookTitle.innerText = value;
                cardHeader.appendChild(bookTitle);

            } else if (key === "author") {
                const bookAuthor = document.createElement("h3");
                bookAuthor.setAttribute("class", "author");
                bookAuthor.innerText = value;
                cardHeader.appendChild(bookAuthor);

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


displayBooks();


// const warbreaker = new Book('Warbreaker', 'Sanderson', 592, 'Yes');
// myLibrary.push(warbreaker);

// console.log(myLibrary)