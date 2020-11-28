const todos = getSavedTodos();

const filters = {
    searchText: '',
    completed: false,
};

renderTodos(todos, filters);

document.querySelector('#searchTodos').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#addTodoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.elements.text.value !== '') {
        todos.push({
            id: uuidv4(),
            title: e.target.elements.text.value,
            completed: false,
        });
        saveTodos(todos)
        renderTodos(todos, filters);    
    } else {
        alert('Enter something to do');
    }
    
    e.target.elements.text.value = '';
});

document.querySelector('#checkbox').addEventListener('change', (e) => {
    filters.completed = e.target.checked;
    renderTodos(todos, filters);
});