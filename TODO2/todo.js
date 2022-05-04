const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = [];
let id = 0;

const addTodos = (text) => {
    let newId = id++;
    // 새롭게 추가된 할 일을 concat()을 통해 추가된 배열을 newTodos에 저장한다
    let newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text})
    setTodos(newTodos);
    paintTodos();
}

const setTodos = (newTodos) => { //새로 추가해줌 (기존 todos배열을 변경)
    todos = newTodos;
}

const getAllTodos = () => {
    return todos; //이전 todos 배열을 가져옴
}

const paintTodos = () => {
    todoList.innerHTML = null; //todoInput 요소 안의 html 초기화
    const allTodos = getAllTodos(); // todos 배열 가져오기

      // "todo-item"에 해당하는 HTML을 그려서 "todo-list"에 추가하기
      allTodos.forEach(todo => {
          const todoItem = document.createElement('li');
          todoItem.classList.add('todo-item');

          const checkedBox = document.createElement('div');
          checkedBox.classList.add('checkbox');
          checkedBox.addEventListener('click', () => completeTodo(todo.id));

          const todoEle = document.createElement('div');
          todoEle.classList.add('todo');
          todoEle.addEventListener('dblclick', (event) => onDblcickTodo(event, todo.id))
          todoEle.innerText = todo.content;

          const delButton = document.createElement('button');
          delButton.classList.add('delBtn');
          delButton.addEventListener('click', () => {
              deleteTodo(todo.id)
          })
          delButton.innerHTML = 'X';

          if(todo.isCompleted) {
              todoItem.classList.add('checked');
              checkedBox.innerText = '✔';
          }

          todoItem.appendChild(checkedBox);
          todoItem.appendChild(todoEle);
          todoItem.appendChild(delButton);

          todoList.appendChild(todoItem);
      })
}

const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId); //주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    setTodos(newTodos);
    paintTodos();      
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo);
    setTodos(newTodos);
    paintTodos();
}

const onDblcickTodo = (e, todoId) => {
    const todoEle = e.target;
    const inputText = e.target.innerText;
    const todoItemEle = todoEle.parentNode;
    const inputEle = document.createElement('input');
    inputEle.value = inputText;
    inputEle.classList.add('edit-input');

    inputEle.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
          updateTodo(e.target.value, todoId);
          document.body.removeEventListener('click', onClickBody);
      }  
    })

     // todoItemEle 요소를 제외한 영역을 클릭 시, 수정모드 종료
     const onClickBody = (e) => {
        if(e.target !== inputEle) {
            todoItemEle.removeChild(inputEle);
            document.body.removeEventListener('click', onClickBody);
        }
    }

    // body에 클릭에 대한 이벤트 리스너 등록
    document.body.addEventListener('click', onClickBody);

    todoItemEle.appendChild(inputEle);
}

const updateTodo = (text, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
    setTodos(newTodos);
    paintTodos();
}

const init = () => {
    todoInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            addTodos(e.target.value); //addTodos함수에 e.target.value(input의 value)를 넘겨줌
            todoInput.value = '';
        }
    })
}

init();

