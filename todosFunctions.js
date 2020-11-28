// Getting the existing todos from localStorage
function getSavedTodos() {
    let existingTodos = localStorage.getItem('todos');
    
    if (existingTodos !== null) {
        return JSON.parse(existingTodos);
    } else {
        return [];
    };
};

// Saving the todos to localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Summary of incomplete todos
const generateSummary = function (incompleteTodos) {
    const summary = document.createElement('h3');
    summary.textContent = `You have ${incompleteTodos.length} todos left`;

    return summary;
}

// Genrating the DOM structure for todos 
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('p');
    const wrapDiv = document.createElement('div');
    const removeBtn = document.createElement('i');
    
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed;
    wrapDiv.appendChild(checkbox);

    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    }); 

    todoText.style.paddingLeft = '0.65rem'
    todoText.textContent = todo.title;
    wrapDiv.appendChild(todoText);
    todoEl.appendChild(wrapDiv);

    // removeBtn.textContent = 'X';
    removeBtn.className = "fas fa-trash-alt";
    todoEl.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove? This action cannot be undone.')) {
            removeTodo(todo.id);
        }
        saveTodos(todos);
        renderTodos(todos, filters);
    });
    return todoEl;
};

const toggleTodo = function (id) {
    const todo = todos.find((todo) => {
        return todo.id === id;
    });

    if (todo !== undefined) {
        todo.completed = !todo.completed;
    } 
};

const removeTodo = function (id) {
    const findIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });

    if (findIndex > -1) {
        todos.splice(findIndex, 1);
    };
};

// Rendering application todos
const renderTodos = (todos, filters) => {
    let filterTodos = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    filterTodos = filterTodos.filter((todo) => {
        if (filters.completed) {
            return !todo.completed;
        } else {
            return true;
        };
    });

    const incompleteTodos = todos.filter((todo) => {
        return !todo.completed;
    });

    document.querySelector('#todos').innerHTML = '';

    document.querySelector('#todos').appendChild(generateSummary(incompleteTodos));


    filterTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
};