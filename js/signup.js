let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let inValidatefirstName = document.getElementById("inValidatefirstName");
let inValidatelastName = document.getElementById("inValidatelastName");
let inValidateEmail = document.getElementById("inValidateEmail");
let successLabel = document.getElementById("successLabel");
let emailExistsLabel = document.getElementById("emailExistsLabel");
let requiredLabel = document.getElementById("requiredLabel");
let signupBtn = document.getElementById("signupBtn");
let checkValidateName = false, checkValidateEmail = false;;
let y ;
let x = []

if (localStorage.getItem("users") == null){
    x = [];

}else{
    x = JSON.parse(localStorage.getItem("users"));
}
signupBtn.addEventListener("click", signUP);

firstname.addEventListener("blur", function () {
    if (validateName(this.value)) {
        checkValidateName = true;
        inValidatefirstName.classList.replace("d-block", "d-none");
    }
    else {
        checkValidateName = false;
        inValidatefirstName.classList.replace("d-none", "d-block");
    }
})

lastname.addEventListener("blur", function () {
    if (validateName(this.value)) {
        checkValidateName = true;
        inValidatelastName.classList.replace("d-block", "d-none");
    }
    else {
        checkValidateName = false;
        inValidatelastName.classList.replace("d-none", "d-block");
    }
})

emailInput.addEventListener("blur", function () {
    if (validateEmail(this.value)) {
        checkValidateEmail = true;
        inValidateEmail.classList.replace("d-block", "d-none");
    }
    else {
        checkValidateEmail = false;
        inValidateEmail.classList.replace("d-none", "d-block");
    }
})

function validateName(userName) {
    var regex = /^[A-Z][a-z]{3,20}$/;
    return regex.test(userName);
}

function validateEmail(userEmail) {
    var regex = /^[a-z|.]{3,}([1-9]?|[1-9][0-9]{0,2})@[a-z]{5,10}.(com|in)$/;
    return regex.test(userEmail);
}

function checkValidate() {
    if (firstname.value.trim() == "" ||lastname.value.trim()==""|| emailInput.value.trim() == "" || passwordInput.value.trim() == "") {
        requiredLabel.classList.replace("d-none", "d-block");
        return false;
    }
    else if (checkValidateName == false || checkValidateEmail == false) {
        return false;
    }
    else {
        requiredLabel.classList.replace("d-block", "d-none");
        return true;
    }
}
function notRepeatEmail() {
    var check = false;
    for (var i = 0; i < y.length; i++) {
        if (emailInput.value == y[i].email) {
            check = true;
            break;
        }
    }
    if (check) {
        emailExistsLabel.classList.replace("d-none", "d-block");
        return false;
    }
    else {
        emailExistsLabel.classList.replace("d-block", "d-none");
        return true;
    }
}
function signUP() {
    if (checkValidate()) {
        if (notRepeatEmail()) {
            var user = {
                first_name:firstname.value,
                last_name:lastname.value,
                email: emailInput.value,
                Password: passwordInput.value
            };
            y.push(user);
            x.push(y)
            localStorage.setItem("users", JSON.stringify(y));
            clear();
            emailExistsLabel.classList.replace("d-block", "d-none");
            successLabel.classList.replace("d-none", "d-block");
        }else{
            console.log('repeted');
        }
    }
    console.log("hellowwwww");
}
function clear() {
    firstname.value = "",
    lastname.value = ""
    emailInput.value = "";
    passwordInput.value = "";
}

async function getUser()
{
    let apiResponse = await fetch(`https://reqres.in/api/users`);
    let finalResponse = await apiResponse.json();
        y = finalResponse.data;
}

getUser()