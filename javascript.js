const myLibrary = [];
const shelves = document.querySelector(".my-shelves");



function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    //**this.libNum = undefined;
    this.info = function(){
        return `${title} by ${author} is ${pages} pages long and I ${this.read === true? "have read": "have not read"} it.`
    };
}

function addBookToLibrary(item){
   //** */ item.libNum = myLibrary.length === 0? 0: myLibrary[myLibrary.length-1].libNum + 1;
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


/* function shelveTheBooks() {
    myLibrary.forEach((item)=>shelveABook(item));
} 

shelveTheBooks();*/


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
    shelveABook(newBook);
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
    //*aBook.setAttribute("lib-num",`${item.libNum}`)
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
        //for loop that changes the lib num of all greater libnums by -1 in the Library
        /* for (let i=item.libNum+1; i<myLibrary.length; i++){
            myLibrary[i].libNum -= 1;
            myBooks[i].setAttribute("lib-num",`${i-1}`);
        } */

        
        /*new Library Method
            With attribute lib-num, in the myBooks variable, 
            if myBooks[i].lib-num is > delted items fetched lib-num, decrease lib-num by 1.
            This allows me to remove libNum 
        */
        
        //for loop that changes the lib-num of all lib-num attributes for div class.book
        shelves.removeChild(aBook);
         myLibrary.splice(item.libNum,1);
    });
    
    
    isRead.addEventListener("click",()=>{
        if (isRead.classList.contains("book-is-read")){
            isRead.classList.remove("book-is-read");
            isRead.textContent="Not Read";
            isRead.classList.add("book-not-read");
            item.read = false;
        }else{
            isRead.classList.remove("book-not-read");
            isRead.textContent="Read";
            isRead.classList.add("book-is-read");
            item.read = true;
        }
    })
    shelves.appendChild(aBook);
}
