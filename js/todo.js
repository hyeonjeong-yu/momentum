const toDoform = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // object나 array나 어떤 코드건 string으로 만들어줌
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    // event.target: 클릭된 html element
    
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    // 반드시 true return, 만약 false return시 그 item은 새 aray에 포함하지 않는다
    // filter function은 새 array를 준다
    // (toDo)는 변수로 toDos DB에 있는 요소 중 하나
    // 클릭한 id 값과 toDo의 id 값 비교해서 다른 것만 새 array에 남김
    saveToDos(); // 새로 array를 저장해야하는 것 기억하기
}

// ToDo 그리는 역할
function paintToDo(newTodo) {
    // element 생성
    const list = document.createElement("li");
    list.id = newTodo.id;
    const span = document.createElement("span");
    // span.innerText = newTodo;
    span.innerText = newTodo.text;
    // object로 변했으므로 text값으로 출력

    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteToDo);

    // 자식 추가
    list.appendChild(span);
    list.appendChild(button);

    toDoList.appendChild(list);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    // 현재의 value를 newTodo에 복사

    toDoInput.value = "";
    // 입력값 지워주기

    const newTodoObj = {
        text: newTodo,
        id: Date.now(), // 랜덤 id 생성, id로 각각의 li item 구별 위함
    }
    //ToDo 그리기 전에, toDos array에 newTodo를 push
    // toDos.push(newTodo);
    toDos.push(newTodoObj);
    // 이제 text인 newTodo 말고 object인 newTodObj push

    // paintToDo(newTodo);
    // newTodo: input의 value를 비우기 전의 값을 나타내는 string,
    // 그 입력값을 paintTodo에 넣어서 호출
    paintToDo(newTodoObj);
    // 이제 text인 newTodo 말고 object인 newTodObj와 함께 call됨

    saveToDos();
}
toDoform.addEventListener("submit", handleToDoSubmit);

// 첫번째 방법) 함수 생성&호출
// function sayHello(item) {
//     console.log("this is the turn off", item)
// }
const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    //string을 array object로 변환

    toDos = parsedToDos;
    // 새로운 data를 입력하면,
    //todos array는 더이상 빈값이 아니니까 이전의 모든 element들을 갖고 있는 array 저장

    // parsedToDos.forEach(element => {
    // foreach : array에 있는 각각의 item에 대해 function 실행
    // })
    
    // parsedToDos.forEach(sayHello);

    // parsedToDos.forEach((item) => console.log("this is the turn off", item));
    // 두번째 방법) arrow function으로 상단 sayHello function 만들지 않고 사용
    parsedToDos.forEach(paintToDo);
}
