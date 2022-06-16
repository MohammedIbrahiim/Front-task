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
let users ;
let useer = []

if (localStorage.getItem("users") == null){
    useer = [];

}else{
    useer = JSON.parse(localStorage.getItem("users"));
}
signupBtn.addEventListener("click", signUP);


//make validation for firstname
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
//make validation for lastname
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
//make validation for email
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

// make firstname and lastname rite like (Lina)
function validateName(userName) {
    var regex = /^[A-Z][a-z]{3,20}$/;
    return regex.test(userName);
}

// make email rite like (lina@yahoo.com or .in)
function validateEmail(userEmail) {
    var regex = /^[a-z|.]{3,}([1-9]?|[1-9][0-9]{0,2})@[a-z]{5,10}.(com|in)$/;
    return regex.test(userEmail);
}

//check if inputs is emapty or not 
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

//cheack if email repted or not in User APi
function notRepeatEmail() {
    var check = false;
    for (var i = 0; i < users.length; i++) {
        if (emailInput.value == users[i].email) {
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

//signup  function 
function signUP() {
    if (checkValidate()) {
        if (notRepeatEmail()) {
            var user = {
                first_name:firstname.value,
                last_name:lastname.value,
                email: emailInput.value,
                Password: passwordInput.value
            };
            users.push(user);
            useer.push(users)
            localStorage.setItem("users", JSON.stringify(users));
            clear();
            emailExistsLabel.classList.replace("d-block", "d-none");
            successLabel.classList.replace("d-none", "d-block");
        }else{
            console.log('repeted');
        }
    }
}
//clear input after 
function clear() {
    firstname.value = "",
    lastname.value = ""
    emailInput.value = "";
    passwordInput.value = "";
}

// fetch api for take dataUser to display it
async function getUser()
{
    let apiResponse = await fetch(`https://reqres.in/api/users`);
    let finalResponse = await apiResponse.json();
        users = finalResponse.data;
}

getUser()