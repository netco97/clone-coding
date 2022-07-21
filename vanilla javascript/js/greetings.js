const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function OnLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    paintGreetings(username);
}

function paintGreetings(username){
    greeting.innerText = "Hello " + username; //`Hello ${username}`;과 같음
    greeting.classList.remove(HIDDEN_CLASSNAME);
}
const savedusername = localStorage.getItem(USERNAME_KEY);

if(savedusername===null)
{
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", OnLoginSubmit);
    //show the form
}
else{
    paintGreetings(savedusername);
    //show the greetings
}