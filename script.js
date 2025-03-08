// Initialize task data structure
let tasks = {
    todo: [],
    inprogress: [],
    done: [],
    holding: []
};

// Column names mapping for display
const columnNames = {
    todo: "Not started",
    inprogress: "In progress",
    done: "Done",
    holding: "Holding Area"
};

// DOM Elements
const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
const saveTaskBtn = document.getElementById('saveTask');
const taskForm = document.getElementById('taskForm');
const columns = ['todo', 'inprogress', 'done', 'holding'];

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('kanbanTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    updateTaskCounts();
}

// Generate a unique ID for tasks
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Render all tasks
function renderTasks() {
    // Clear all columns
    columns.forEach(column => {
        document.getElementById(column).innerHTML = '';
    });
    
    // Render tasks for each column
    columns.forEach(column => {
        const columnEl = document.getElementById(column);
        
        tasks[column].forEach(task => {
            const taskCard = createTaskCard(task, column);
            columnEl.appendChild(taskCard);
        });
    });
    
    updateTaskCounts();
}

// Create a task card element
function createTaskCard(task, column) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true;
    taskCard.dataset.id = task.id;
    taskCard.dataset.column = column;
    
    taskCard.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title">${task.title}</h5>
            <button class="delete-task" data-id="${task.id}" data-column="${column}">×</button>
        </div>
        <p class="card-text">${task.description || ''}</p>
    `;
    
    // Add drag event listeners
    taskCard.addEventListener('dragstart', handleDragStart);
    taskCard.addEventListener('dragend', handleDragEnd);
    
    // Add delete button event listener
    taskCard.querySelector('.delete-task').addEventListener('click', handleDeleteTask);
    
    return taskCard;
}

// Update task counts for each column
function updateTaskCounts() {
    columns.forEach(column => {
        const columnHeader = document.querySelector(`.col-md-3:nth-child(${columns.indexOf(column) + 1}) .task-count`);
        columnHeader.textContent = tasks[column].length;
    });
}

// Add a new task
function addTask(title, description, column) {
    const newTask = {
        id: generateId(),
        title: title,
        description: description,
        createdAt: new Date().toISOString()
    };
    
    tasks[column].push(newTask);
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(id, column) {
    tasks[column] = tasks[column].filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Move a task from one column to another
function moveTask(id, fromColumn, toColumn) {
    // Find the task in the source column
    const taskIndex = tasks[fromColumn].findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
        // Remove the task from the source column
        const [task] = tasks[fromColumn].splice(taskIndex, 1);
        
        // Add the task to the destination column
        tasks[toColumn].push(task);
        
        // Save changes
        saveTasks();
        renderTasks();
    }
}

// Event Handlers
function handleSaveTask() {
    const titleInput = document.getElementById('taskTitle');
    const descriptionInput = document.getElementById('taskDescription');
    const columnSelect = document.getElementById('taskColumn');
    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const column = columnSelect.value;
    
    if (title) {
        addTask(title, description, column);
        taskModal.hide();
        taskForm.reset();
    }
}

function handleDeleteTask(event) {
    event.stopPropagation();
    const id = event.target.dataset.id;
    const column = event.target.dataset.column;
    
    // Add confirmation dialog
    if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(id, column);
    }
}

// Drag and Drop Handlers
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', JSON.stringify({
        id: event.target.dataset.id,
        column: event.target.dataset.column
    }));
    
    event.target.classList.add('dragging');
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
    // Remove drop-target class from all columns
    document.querySelectorAll('.kanban-column').forEach(column => {
        column.classList.remove('drop-target');
    });
}

function allowDrop(event) {
    event.preventDefault();
    // Add drop-target class to the column
    event.currentTarget.classList.add('drop-target');
}

function drop(event) {
    event.preventDefault();
    
    // Remove drop-target class from all columns
    document.querySelectorAll('.kanban-column').forEach(column => {
        column.classList.remove('drop-target');
    });
    
    // Get the data from the drag operation
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    const toColumn = event.currentTarget.id;
    
    // Move the task
    moveTask(data.id, data.column, toColumn);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    saveTaskBtn.addEventListener('click', handleSaveTask);
    
    // Add drag and drop event listeners to columns
    columns.forEach(column => {
        const columnEl = document.getElementById(column);
        columnEl.addEventListener('dragover', allowDrop);
        columnEl.addEventListener('drop', drop);
        columnEl.addEventListener('dragleave', (event) => {
            event.currentTarget.classList.remove('drop-target');
        });
    });
});
