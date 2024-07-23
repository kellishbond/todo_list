// Importing React and useState hook from 'react' library
import React, { useState } from 'react';
// Importing the CSS file for styling
import './TodoList.css';

// Defining the TodoList functional component
const TodoList = () => {
    // State to store the list of todos
    const [todos, setTodos] = useState([]);
    // State to store the input value for the heading
    const [headingInput, setHeadingInput] = useState('');
    // State to store the input values for the lists, indexed by todo item
    const [listInputs, setListInputs] = useState({});

    // Function to handle adding a new todo heading
    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
            // Adding a new todo with the current heading input and an empty list of tasks
            setTodos([...todos, { heading: headingInput, lists: [] }]);
            // Clearing the heading input field
            setHeadingInput('');
        }
    };

    // Function to handle deleting a todo item by its index
    const handleDeleteTodo = (index) => {
        // Creating a copy of the current todos array
        const newTodos = [...todos];
        // Removing the todo item at the specified index
        newTodos.splice(index, 1);
        // Updating the state with the new todos array
        setTodos(newTodos);
    };

    // Function to handle adding a new list item to a specific todo
    const handleAddList = (index) => {
        // Checking if the list input for the specified index is not empty
        if (listInputs[index] && listInputs[index].trim() !== '') {
            // Creating a copy of the current todos array
            const newTodos = [...todos];
            // Adding the new list item to the specified todo's lists
            newTodos[index].lists.push(listInputs[index]);
            // Updating the state with the new todos array
            setTodos(newTodos);
            // Clearing the list input field for the specified index
            setListInputs({ ...listInputs, [index]: '' });
        }
    };

    // Function to handle changes in the list input fields
    const handleListInputChange = (index, value) => {
        // Updating the listInputs state with the new value for the specified index
        setListInputs({ ...listInputs, [index]: value });
    };

    return (
        <>
            <div className="todo-container">
                <h1 className="title">My Todo List</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="heading-input"
                        placeholder="Enter heading"
                        value={headingInput}
                        onChange={(e) => setHeadingInput(e.target.value)}
                    />
                    <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
                </div>
            </div>
            <div className="todo_main">
                {todos.map((todo, index) => (
                    <div key={index} className="todo-card">
                        <div className="heading_todo">
                            <h3>{todo.heading}</h3>
                            <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
                        </div>
                        <ul>
                            {todo.lists.map((list, listIndex) => (
                                <li key={listIndex} className='todo_inside_list'>
                                    <p>{list}</p>
                                </li>
                            ))}
                        </ul>
                        <div className='add_list'>
                            <input
                                type="text"
                                className="list-input"
                                placeholder="Add List"
                                value={listInputs[index] || ''}
                                onChange={(e) => handleListInputChange(index, e.target.value)}
                            />
                            <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

// Exporting the TodoList component as the default export
export default TodoList;
