let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let incorrectLabel = document.getElementById("incorrectLabel");
let requiredLabel = document.getElementById("requiredLabel");
let loginBtn = document.getElementById("loginBtn");
let y ;
let x = []

if (localStorage.getItem("users") == null){
    x = [];
}else{
    x = JSON.parse(localStorage.getItem("users"));
}
loginBtn.addEventListener("click", logIn);
function checkValidate() {
    if (emailInput.value.trim() == "" || passwordInput.value.trim() == "") {
        requiredLabel.classList.replace("d-none", "d-block");
        return false;
    }
    else
    {
        requiredLabel.classList.replace( "d-block","d-none");
        return true;
    }
}
function logIn() {
    var check = false;
    var userName = "";
    if (checkValidate()) {
        for(i=0; i < x.length ; i++){
            if (x[i].email == emailInput.value){
                        check = true;
                        userName = x[i].first_name + ' '+ x[i].last_name;
                        break;
                    }                
        }
        if (check) {
            sessionStorage.setItem("userName", userName);
            window.open("./html/home.html", "_self");
        }
        else
            incorrectLabel.classList.replace("d-none", "d-block");
    }
}

async function getUser()
{
    let apiResponse = await fetch(`https://reqres.in/api/users`);
    let finalResponse = await apiResponse.json();
        y = finalResponse.data;

}

getUser()

