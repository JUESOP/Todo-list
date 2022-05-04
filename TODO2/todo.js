const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const completeAllBtnEle = document.querySelector('.complete-all-btn');
const leftItemsElem = document.querySelector('.left-items');

let todos = [];
let id = 0;

const addTodos = (text) => {
    let newId = id++;
    //새롭게 추가된 할 일을 concat()을 통해 추가된 배열을 newTodos에 저장한다
    let newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text})
    setTodos(newTodos);
    checkIsAllCompleted();
    setLeftItems();
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

      //"todo-item"에 해당하는 HTML을 그려서 "todo-list"에 추가하기
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
    setLeftItems(); // 남은 할 일 개수 표시
    paintTodos();      
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo);
    setTodos(newTodos);
    setLeftItems();
    paintTodos();
    checkIsAllCompleted();
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

     //todoItemEle 요소를 제외한 영역을 클릭 시, 수정모드 종료
     const onClickBody = (e) => {
        if(e.target !== inputEle) {
            todoItemEle.removeChild(inputEle);
            document.body.removeEventListener('click', onClickBody);
        }
    }

    //body에 클릭에 대한 이벤트 리스너 등록
    document.body.addEventListener('click', onClickBody);

    todoItemEle.appendChild(inputEle);
}

const updateTodo = (text, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
    setTodos(newTodos);
    paintTodos();
}

let isAllCompleted = false;
const setIsAllCompleted = (bool) => {isAllCompleted = bool};

const completeAll = () => {
    completeAllBtnEle.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true}))
    setTodos(newTodos)
}

const incompleteAll = () => {
    completeAllBtnEle.classList.remove('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: false}));
    setTodos(newTodos)
}

//전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
    if(getAllTodos().length === getCompletedTodos().length) {
        setIsAllCompleted(true);
        completeAllBtnEle.classList.add('checked');
    } else {
        setIsAllCompleted(false);
        completeAllBtnEle.classList.remove('checked');
    }
}

const onClickCompleteAll = () => {
    if(!getAllTodos().length) { //todos배열의 길이가 0이면 return;
        return;
    }

    if(isAllCompleted) {
        incompleteAll(); //isAllCompleted가 true이면 todos를 전체 미완료 처리
    } else {
        completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리 
    }
    setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글 현재는 true
    paintTodos(); // 새로운 todos를 렌더링
    setLeftItems();
} 

const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true);
}

//현재 완료되지 않은 할 일 리스트를 반환한다.
const getActiveTodos = () => {
    return todos.filter(todo => todo.isCompleted === false);
}

const setLeftItems = () => {
    const leftTodos = getActiveTodos();
    leftItemsElem.innerHTML = `${leftTodos.length} items left`
}

const init = () => {
    todoInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            addTodos(e.target.value); //addTodos함수에 e.target.value(input의 value)를 넘겨줌
            todoInput.value = '';
        }
    })

    completeAllBtnEle.addEventListener('click', onClickCompleteAll);
    setLeftItems();
}

init();

