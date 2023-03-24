const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

// string 한번만 작성하고자 할 때 대문자 변수로 지정
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    // console.dir(loginInput);
    // loginInput의 property 보기 위함

    const username = loginInput.value;
    // if (username === "") {
    //     // 이름 입력이 없을 때
    //     alert("Please write your name");
    // } else if (username.length > 15) {
    //     // 조건 추가
    //     alert("Your name is too long.");
    // }

    // 위 조건문(입력값 유효성 검사)을 대신하는 방법
    // 1. #login-form을 div 대신 form으로 변경한다.
    // 2. input required maxlength 추가

    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);

    //localstorage 에 username 저장
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    // greeting.innerText = "Hello " + username;
    // string과 변수명 합치는 방법
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
console.log(savedUsername);

if(savedUsername === null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    // show the greetings
    paintGreetings(savedUsername);
}