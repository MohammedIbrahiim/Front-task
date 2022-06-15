var header=document.querySelector("p");
var userName = sessionStorage.getItem('userName');
header.appendChild(document.createTextNode (" "+userName));

if(userName==null)
    window.open("../index.html","_self");

function logout()
{
    sessionStorage.removeItem("userName");
    window.open("../index.html","_self");
}