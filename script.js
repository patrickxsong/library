let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const popupBtn = document.querySelector(".addBook");
const popupForm = document.querySelector(".popup");
const closeBtn = document.querySelector(".close");
const addBookBtn = document.querySelector(".addBook");
const submitBtn = document.querySelector(".submit");
const errorElement = document.querySelector("#error-message");

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

addBooktoLibrary = book => myLibrary.push(book);

const container = document.querySelector(".container");

displayBooks = () => {
    myLibrary.forEach(book => display(book));
};

display = book => {
    let content = document.createElement("div");
    let remove = document.createElement("button");
    let toggle = document.createElement("button");

    content.classList.add("card");
    content.textContent = book.title;
    content.id = myLibrary.indexOf(book);

    remove.classList.add("remove-button");
    remove.textContent = "Remove"

    remove.onclick = function () {
        let index = remove.parentElement.id;
        container.removeChild(document.getElementById(index));
        myLibrary.splice(index,1);
    }

    content.appendChild(remove);

    toggle.classList.add("toggle-button");

    if (book.read) {
        toggle.textContent = "Read"
    } else {
        toggle.textContent = "Unread"
    }

    toggle.onclick = function () {
        if (book.read) {
            book.read = false;
            toggle.textContent = "Unread"
        } else {
            book.read = true;
            toggle.textContent = "Read"
        }
    }

    content.appendChild(toggle);
    
    let random_color = Math.floor(Math.random()*16777215).toString(16);
    content.style.backgroundColor = "#" + random_color;
    container.appendChild(content);
};

addBooktoLibrary(theHobbit);
displayBooks();

openForm = () => {
    popupForm.style.display="flex";
}

closeForm = () => popupForm.style.display="none";

closeBtn.addEventListener('click', closeForm);
addBookBtn.addEventListener('click', openForm);

submitBtn.addEventListener('click', e => {
    let messages = [];
    let newTitle = document.querySelector("#title").value;
    let newAuthor = document.querySelector("#author").value;
    let newPages = document.querySelector("#pages").value;
    let checkRead = document.querySelector("#read").checked;
    let newBook = new Book(newTitle,newAuthor,newPages,checkRead);

    if (newTitle && newAuthor && newPages > 0) {
        addBooktoLibrary(newBook);
        display(newBook);
        closeForm();
        document.querySelector(".form").reset();

    } else { 
        messages.push("*All entries must be submitted");
        e.preventDefault();
        errorElement.innerText = messages.join(" ");
    }
});
