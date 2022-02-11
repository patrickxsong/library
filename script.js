const library = (function() {
    const myLibrary = [];

    const popupForm = document.querySelector(".popup");
    const closeBtn = document.querySelector(".close");
    const addBookBtn = document.querySelector(".addBook");
    const submitBtn = document.querySelector(".submit");
    const errorElement = document.querySelector("#error-message");
    const container = document.querySelector(".container");

    const Book = (title, author, pages, read) => {
        return {
            title,
            author,
            pages,
            read
        };
    };

    const displayBook = book => {
        myLibrary.push(book)

        let content = document.createElement("div");
        let remove = document.createElement("button");
        let toggle = document.createElement("button");
        let random_color = Math.floor(Math.random()*16777215).toString(16);
    
        content.classList.add("card");
        content.style.backgroundColor = "#" + random_color;
        content.textContent = book.title;
        content.id = myLibrary.indexOf(book);
    
        remove.classList.add("remove-button");
        remove.textContent = "Remove"          
    
        toggle.classList.add("toggle-button");
        toggle.textContent = book.read ? "Read" : "Unread";
        
        remove.onclick = function () {
            let idx = remove.parentElement.id;
            container.removeChild(document.getElementById(idx));
            myLibrary.splice(idx,1);
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

        content.appendChild(remove);
        content.appendChild(toggle);
        
        container.appendChild(content);
    };

    const theHobbit = Book("The Hobbit", "J.R.R. Tolkien", 295, false);
    displayBook(theHobbit);

    const getBookInfo = () => myLibrary.forEach(book => console.log(book));    

    const openForm = () => popupForm.style.display="flex";
    
    const closeForm = () => popupForm.style.display="none";

    const submitForm = e => {
        let messages = [];
        let newTitle = document.querySelector("#title").value;
        let newAuthor = document.querySelector("#author").value;
        let newPages = document.querySelector("#pages").value;
        let checkRead = document.querySelector("#read").checked;
        let newBook = Book(newTitle,newAuthor,newPages,checkRead);
    
        if (newTitle && newAuthor && newPages > 0) {
            displayBook(newBook);
            closeForm();
            document.querySelector(".form").reset();
    
        } else { 
            messages.push("*All entries must be submitted");
            e.preventDefault();
            errorElement.innerText = messages.join(" ");
        }
    }

    closeBtn.addEventListener('click', closeForm);
    addBookBtn.addEventListener('click', openForm);
    submitBtn.addEventListener('click', submitForm);

    return {
        getBookInfo: getBookInfo
    };
})();