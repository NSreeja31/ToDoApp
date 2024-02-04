import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch and show todo items
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    // Add a todo item
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTodo,
        completed: false,
        userId: 1,
      }),
    })
      .then(response => response.json())
      .then(data => setTodos(prevTodos => [...prevTodos, data]))
      .catch(error => console.error('Error adding todo:', error));
  
    // Clear the input field after adding the todo
    setNewTodo('');
  };
  

  const handleUpdateTodo = (id) => {
    // Update the item
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos.find(todo => todo.id === id)),
    })
      .then(response => response.json())
      .then(() => setTodos(updatedTodos));
  };

  const handleDeleteTodo = (id) => {
    // Delete an item
    const updatedTodos = todos.filter(todo => todo.id !== id);

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTodos(updatedTodos));
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <div>
        <input
          className='input-class'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdateTodo(todo.id)}
            />
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
