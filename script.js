const submitBtn = document.querySelector('.submit-btn')
const todoInput = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')
const reset = document.querySelector('.fa-redo-alt')

// events
document.addEventListener('DOMContentLoaded', displayStorage)
submitBtn.addEventListener('click', addingTodo)
todoInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        addingTodo()
    }
})

reset.addEventListener('click', (e) => {
    todoList.innerHTML = ''
})

todoList.addEventListener('click', (e) => {
    let todo = e.target
    if (todo.classList.contains('trash')) {
        todo.parentElement.remove()
    }  
    if (todo.classList.contains('complete')) {
        todo.parentElement.classList.toggle('line')
    }
    deleteStorage(todo.parentElement)
})


// functions
function addingTodo(e) {
    if (todoInput.value === '') return
    const div = document.createElement('div')
    div.classList.add('todo')
    // make li
    const list = document.createElement('li')
    list.classList.add('todo-item')
    list.innerText = todoInput.value
    save(todoInput.value)
    div.appendChild(list)
    // complete button
    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    div.appendChild(completeBtn)
    const trashBtn = document.createElement('button')
    trashBtn.classList.add('trash')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    div.appendChild(trashBtn)
    todoList.appendChild(div)
    todoInput.value = ''
}

function save(text) {
    let items;
    if (localStorage.getItem('storage') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('storage'))
    }
    items.push(text)
    localStorage.setItem('storage', JSON.stringify(items))
}

function displayStorage() {
    let items;
    if (localStorage.getItem('storage') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('storage'))
    }
    items.forEach(todo => {
        const div = document.createElement('div')
        div.classList.add('todo')
        // make li
        const list = document.createElement('li')
        list.classList.add('todo-item')
        list.innerText = todo
        div.appendChild(list)
        // complete button
        const completeBtn = document.createElement('button')
        completeBtn.classList.add('complete')
        completeBtn.innerHTML = '<i class="fas fa-check"></i>'
        div.appendChild(completeBtn)
        const trashBtn = document.createElement('button')
        trashBtn.classList.add('trash')
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
        div.appendChild(trashBtn)
        todoList.appendChild(div)
    })
}

function deleteStorage(el) {
    let items;
    if (localStorage.getItem('storage') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('storage'))
    }
    let index = el.children[0].innerText
    items.splice(items.indexOf(index), 1)
    localStorage.setItem('storage', JSON.stringify(items))
}