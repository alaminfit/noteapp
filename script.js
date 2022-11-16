const addingBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
titlePopup = popupBox.querySelector("header p"),
iconClose = popupBox.querySelector("header i"),
tagTitle = popupBox.querySelector("input"),
txtArea = popupBox.querySelector("textarea"),
button = popupBox.querySelector("button");

const monthArr = ["January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December"];

           //getting notes
const notes  = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;



addingBox.addEventListener('click', ()=>{
  // tagTitle.focus();
    popupBox.classList.add("show");
})

iconClose.addEventListener('click', ()=>{
  isUpdate = false;
  tagTitle.value = "";
  txtArea.value = "";
  button.innerText = "Add a Note";
  titlePopup.innerText= "Add a Note";
    popupBox.classList.remove("show");
})


function showingnote(){
  document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note,index) => {
        let liTag = ` <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="menushow(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick="noteUpdate(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
              <li onclick="noteDelete(${index})"><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`

addingBox.insertAdjacentHTML("afterend", liTag)


    });

}
showingnote();

function menushow(elem){
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e =>{
    //removing show class from the menu
    if(e.target.tagName != "I" || e.target != elem){
      elem.parentElement.classList.remove("show");
    }
  })
}

function noteDelete(noteId){
  let deleteConfirm = confirm("Are you sure you want to delete this note?");
  if(!deleteConfirm) return;
notes.splice(noteId,1) //removing selected note from array
localStorage.setItem("notes", JSON.stringify(notes));
showingnote();
}

function noteUpdate(noteId, title, desc){
  isUpdate = true;
  updateId = noteId;
  addingBox.click();
  tagTitle.value = title;
  txtArea.value = desc;
  button.innerText = "Update Note";
  titlePopup.innerText= "Update Note";
  console.log(noteId,title,desc);
}





button.addEventListener('click', (e)=>{
    e.preventDefault();
    // date 
    let title_ = tagTitle.value,
    description_ = txtArea.value;
    if(title_ || description_){
        let date_ = new Date(),
        month = monthArr[date_.getMonth()],
        day = date_.getDate(),
        year = date_.getFullYear();

        let info = {
            title: title_ ,
            description: description_ ,
            date: `${month}- ${day}- ${year}`
        
        }
        if(!isUpdate){
          notes.push(info);
        }else{
  isUpdate = false;
          notes[updateId] = info
        }

    

       //localstorage
       localStorage.setItem("notes", JSON.stringify(notes));
       iconClose.click();
       showingnote();
    }
})
