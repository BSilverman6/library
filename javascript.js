const myLibrary = [];
const shelves = document.querySelector(".my-shelves");



class Book{

    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
   
    info (){
        return `${this.title} by ${this.author} is ${this.pages} pages long and I ${this.read === true? "have read": "have not read"} it.`
    };

    changeRead(){
        this.read = this.read === true? false: true;
    }
}

function addBookToLibrary(item){
    myLibrary.push(item);
    shelveABook(item);
}

const hp1 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 223, true);
const hp2 = new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", 251, true);
const hp3 = new Book("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 317, true);
const avatar3 = new Book('Avatar: The Dawn of Yangchen', "F.C. Yee", 324, false);

addBookToLibrary(hp1);
addBookToLibrary(hp2);
addBookToLibrary(hp3);
addBookToLibrary(avatar3);



const newBookModal = document.querySelector(".new-book-modal");
const dialog = document.querySelector("#new-book-dialog");
const confirm = document.querySelector("#confirm");
const modalTitle= document.querySelector("#modal-title");
const modalAuthor= document.querySelector("#modal-author");
const modalPages= document.querySelector("#modal-pages");
const modalRead = document.querySelector("#modal-read");
newBookModal.addEventListener("click", ()=> dialog.showModal());

confirm.addEventListener("click", (event)=>{
    event.preventDefault();
    const newBook = new Book(modalTitle.value, modalAuthor.value, modalPages.value, modalRead.checked)
    addBookToLibrary(newBook);
    resetNewBookForm();
    dialog.close();
})

function resetNewBookForm(){
    modalTitle.value = "";
    modalAuthor.value = "";
    modalPages.value="";
    modalRead.checked=false;
}

function shelveABook(item) {
    const aBook = document.createElement("div");
    aBook.className="book";
    aBook.setAttribute("lib-num", `${myLibrary.length-1}` )
    let aTitle = document.createElement ("div");
    let anAuthor = document.createElement ("div");
    let somePages = document.createElement ("div");
    let isReadContainer= document.createElement("div");
    let isRead = document.createElement ("div");
    let deleteMeContainer=document.createElement("div");
    let deleteMe = document.createElement("div")
    deleteMe.className="book-delete";
    aTitle.className="book-title";
    anAuthor.className="book-author";
    somePages.className="book-pages";
    isRead.className="book-read";
    isReadContainer.className="book-read-container";
    deleteMeContainer.className="book-delete-container"
    deleteMe.textContent="Delete";
    aTitle.textContent=item.title;
    anAuthor.textContent = item.author;
    somePages.textContent = item.pages
    
    //if True, add book-read class and set Text to "Read"
    if (item.read){
        isRead.textContent="Read";
        isRead.classList.add("book-is-read");
    }else{
        isRead.textContent="Not Read";
        isRead.classList.add("book-not-read");
    };
    
    aBook.appendChild(aTitle);
    aBook.appendChild(anAuthor);
    aBook.appendChild(somePages);
    aBook.appendChild(isReadContainer);
    isReadContainer.appendChild(isRead);
    aBook.appendChild(deleteMeContainer);
    deleteMeContainer.appendChild(deleteMe);


    deleteMe.addEventListener("click",()=>{
        const myBooks = document.querySelectorAll(".book");

        for (let i=0; i<myBooks.length; i++){
            if (myBooks[i].getAttribute("lib-num")>aBook.getAttribute("lib-num")){
                myBooks[i].setAttribute("lib-num",`${i-1}`)
            }
        }
    
        shelves.removeChild(aBook);
         myLibrary.splice(aBook.getAttribute("lib-num"),1);
    });
    
    
    isRead.addEventListener("click",()=>{
        if (isRead.classList.contains("book-is-read")){
            isRead.classList.remove("book-is-read");
            isRead.textContent="Not Read";
            isRead.classList.add("book-not-read");
        }else{
            isRead.classList.remove("book-not-read");
            isRead.textContent="Read";
            isRead.classList.add("book-is-read");
        }
        
        item.changeRead();
    })
    shelves.appendChild(aBook);
}
