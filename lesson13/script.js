'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document. querySelector('.header-input');
const todoList = document. querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = JSON.parse(localStorage.getItem('newTodo'));
if (todoData === null) {
    todoData = [];
} else {
    todoData = JSON.parse(localStorage.getItem('newTodo'));
};

const render = function(){               

    todoList.textContent = '';
    todoCompleted.textContent = '';    
    headerInput.value = '';
    localStorage.setItem('newTodo', JSON.stringify(todoData));

    todoData.forEach(function(item){

        console.log(item)
        const li = document.createElement('li');     
        li.classList.add('todo-item');              

        li.innerHTML = '<span class="text-todo">' + item.value +'</span>' + 
         '<div class="todo-buttons">' + 
          '<button class="todo-remove"></button>' + 
           '<button class="todo-complete"></button>' +
             '</div>';
         
            if(item.completed){
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }; 
    
    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoRemove.addEventListener('click', function(){
        todoData.splice(item, 1);
        render();
    });
    
    const btnTodoComplete = li.querySelector('.todo-complete');

    btnTodoComplete.addEventListener('click', function(){

        item.completed = !item.completed;                     
        render();
    });

    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {     

        value: headerInput.value,
        completed: false
    };

if(headerInput.value === ''){return;}

    todoData.push(newTodo);              
    localStorage.setItem('newTodo', JSON.stringify(todoData));
    render();                         
});

render();