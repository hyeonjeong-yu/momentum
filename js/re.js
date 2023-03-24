// *
// **
// *** 2023.03.22
// 1. input에 이름 입력 후 Log In 버튼 클릭
// 1-1. 페이지 새로고침 막기
// 1-2. form hide
// 1-3. 이름 입력값 저장 localStorage setItem
// 2. 입력한 이름 출력 
// 2-1. h1 show
// 2-2. 이름 입력값 가져오기 localStorage getItem
// 3. local storage 유저정보 유무 확인
// 3-1. local storage에 usernm이 있다면 바로 h1 출력, 없다면 form view
// ***

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
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
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}
function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME);
    // greeting.innerText = "Hello " + username;
    // string과 변수명 합치는 방법
    greeting.innerText = `Hello ${username}`;
}


const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
    
} else {
    paintGreetings(savedUsername);
}

//*
//**
//*** 2023.03.24
// 1. new Date object 이용해 오늘 날짜의 시간 추출
// 2. h2에 출력
// 2-1. 데이터 포맷