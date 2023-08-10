var addbtn = document.getElementById('add')
const btntext = addbtn.innerText
const userinputValue = document.getElementById('input-list')
const displayList = document.getElementById('show-list')

let todoItemArray = []
let editid = null

// console.log(addbtns)
// get item list localstorage
let objstr = localStorage.getItem('userkey')
// console.log(objstr);
if (objstr != null) {
  todoItemArray = JSON.parse(objstr)
}
// console.log(todoItemArray);
display()
// addbtn  addeventLister event
addbtn.addEventListener('click', () => {
  const userinput = userinputValue.value
  // console.log(userinput)
  if (editid != null) {
    //  edit
    todoItemArray.splice(editid, 1, { userinput: userinput })
    editid = null
  } else {
    // add
    todoItemArray.push({ userinput: userinput })
    //   console.log(todoItemArray);
  }

  saveItem(todoItemArray)
  userinputValue.value = ''
  addbtn.innerText = btntext
})

// save item in local storage
function saveItem(todoItemArray) {
  let setstr = JSON.stringify(todoItemArray)
  localStorage.setItem('userkey', setstr)
  // console.log(setstr);
  display()
}

// display function
function display() {
  let statement = ''
  todoItemArray.map((users, id) => {
    statement += `<ul>
   <li>
     ${users.userinput}
     <span><i class="fa-solid fa-trash" id="delete" onclick="deleteListItem(${id})"></i></span>
     <span><i class="fa-solid fa-pen-to-square" id="edit" onclick="editListItem(${id})"></i></span>
   </li>
 </ul>`
  })
  let list = (displayList.innerHTML = statement)
  //   console.log(list);
}

// deleteitem function
function deleteListItem(userid) {
  // alert(userid)
  todoItemArray.splice(userid, 1)
  saveItem(todoItemArray)
}

// edititem function
function editListItem(userid) {
  // alert(userid);
  editid = userid
  // console.log(editid);
  userinputValue.value = todoItemArray[userid].userinput
  saveItem(editid)
}
