let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let incorrectLabel = document.getElementById("incorrectLabel");
let requiredLabel = document.getElementById("requiredLabel");
let loginBtn = document.getElementById("loginBtn");
let response ;
let user = []

if (localStorage.getItem("users") == null){
    user = [];
}else{
    user = JSON.parse(localStorage.getItem("users"));
}

//fire login function when click
loginBtn.addEventListener("click", logIn);

// check if input is empty or not and show error 
function checkValidate() {
    if (emailInput.value.trim() == "" || passwordInput.value.trim() == "") {
        requiredLabel.classList.replace("d-none", "d-block");
        return false;
    }
    else{
        requiredLabel.classList.replace( "d-block","d-none");
        return true;
    }
}

// login function
function logIn() {
    var check = false;
    var userName = "";
    var id ;
    if (checkValidate()) {
        for(i=0; i < user.length ; i++){
            if (user[i].email == emailInput.value){
                        check = true;
                        userName = user[i].first_name + ' '+ user[i].last_name;
                        id = user[i].id
                        break;
                    }                
        }
        if (check) {
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("id",id)
            window.open("./html/home.html", "_self");
        }
        else
            incorrectLabel.classList.replace("d-none", "d-block");
    }
}
// fetch api for take dataUser to display it

async function getUser()
{
    let apiResponse = await fetch(`https://reqres.in/api/users`);
    let finalResponse = await apiResponse.json();
        response = finalResponse.data;

}

getUser()

