var header=document.querySelector("p");
var userName = sessionStorage.getItem('userName');
var id = sessionStorage.getItem('id')

let inputtxt     = document.querySelector('.input');
let plusAdd      = document.getElementById('button');
let unorderList  = document.getElementById('test');
let listArray    = [];
let editId;
let isEditTask = false;
let response ;
let tasks = []


header.appendChild(document.createTextNode (" "+userName));

if(userName==null)
    window.open("../index.html","_self");



// for refresh if any one do refresh any thing in local storage will be display
if(localStorage.getItem('lists')==null){
    listArray = tasks;

}else{
    listArray = tasks ;
    listArray = JSON.parse(localStorage.getItem('lists'))
    displaylist(listArray);
}

// addlist when add or edit
function addList(){
    let list ={
        id:Math.floor(Math.random() * 100),
        title : inputtxt.value,
        completed:false
    }
    if(list.title!=""){
        if(!isEditTask) {
            listArray = !listArray ? [] : listArray;
            listArray.push(list);
            localStorage.setItem('lists', JSON.stringify(listArray));
            displaylist(listArray)  
            clearInput();      
        }else{
            isEditTask = false;
            let newlist ={
                id:Math.floor(Math.random() * 100),
                title : inputtxt.value,
                completed:false
            }
            listArray.splice(editId,1,newlist)
            localStorage.setItem('lists', JSON.stringify(listArray));
            displaylist(listArray)   
            clearInput();  
        }
    }
}


// add tasks when click at icon plus
plusAdd.addEventListener('click',function(){
    addList();
})

// add tasks when keyup at entar
inputtxt.addEventListener("keyup", e => {
    let userTask = inputtxt.value.trim();
    if(e.key == "Enter" && userTask) {
        addList();
    }
});

//display tasks in browser
function displaylist(displaytasks){
    let cartoona =``;
    for(let i=0 ; i<displaytasks.length ; i++){ 
        let isCompleted = displaytasks[i].completed == true?"line-decoration":""
        cartoona += `
        <div id="exx${i}" class="row align-items-center w-75 mx-auto gx-0 m-2 ">
        <div class="col-sm-2 pe-sm-1 " onclick="toggleStatusTaskWith(${displaytasks[i].id})">
            <div class="icon  d-flex align-items-center justify-content-center" >
                <i class="far fa-check-circle check"></i>               
            </div>
        </div>
        <div id="cheack${displaytasks[i].id}"  class="item col-sm-6 ${isCompleted}">
            <div class="mt-3 ms-3 ">
                <h1 class="fs-6">${displaytasks[i].title}</h1>
        </div>
        </div>

        <div class="col-sm-2 ps-md-1" id="" >
        <div class="icon3  d-flex align-items-center justify-content-center"  onclick="editTask(${i})">
            <i class="fa-solid fa-pencil"></i>             
        </div>
        </div>

        <div class="col-sm-2 ps-md-1" id="deletebtn" onclick="deleteList(${i})">
            <div class="icon2  d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-trash-can"  ></i>               
            </div>
        </div>
    </div>`
}   
    unorderList.innerHTML = cartoona;
}

// delete task from an array and localStorage
function deleteList(linkIndexed){
    listArray.splice(linkIndexed,1)
    localStorage.setItem('lists', JSON.stringify(listArray));
    displaylist(listArray);
}

// make afunction is completed or not
function toggleStatusTaskWith(taskId){
    for (let i = 0; i < listArray.length; i++) {
        if (listArray[i].id == taskId) {
            if(listArray[i].completed == false){
                (listArray[i].completed = true)
                $(`#cheack${taskId}`).addClass('line-decoration')
            }else{
                (listArray[i].completed = false);
                $(`#cheack${taskId}`).removeClass('line-decoration')
                
            }
        }
    }
    localStorage.setItem('lists', JSON.stringify(listArray));
}

// clear input when finish add task
function clearInput(){
    inputtxt.value='' 
}


// editTask functtion when edit 
function editTask(taskId) {
    var localv = taskId
    editId = localv;
    isEditTask = true;
    inputtxt.value = listArray[taskId].title;
    inputtxt.focus();
}


// fetch api for take data to display it
async function gettodoUser(id){
    let apiResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
    let finalResponse = await apiResponse.json();
        response = finalResponse
        for (let res of response) {
            tasks.push(res)

    }
}

// to handle a promise 
(async function(){
    await gettodoUser(id);
    displaylist(tasks)
})();


//log out function and it remove all thing like local storage and an username
function logout(){
    sessionStorage.removeItem("userName");
    localStorage.removeItem('lists')
    window.open("../index.html","_self");
}

