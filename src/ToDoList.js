
import './index.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    if (editIndex !== -1) {
      
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = data.taskName;
      setTasks(updatedTasks);
      setEditIndex(-1); 
    } else {
      
      setTasks([...tasks, data.taskName]);
    }
    reset();
  };

  const removeTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (task, index) => {
    setTaskName(task); 
    setEditIndex(index); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="w-1/2 h-auto p-8 bg-gray-200 rounded shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">To-Do List</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <input
            type="text"
            {...register('taskName', { required: true })}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            placeholder="Add new task..."
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
          />
          <div className="flex">
            <button
              type="submit"
              className="px-6 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {editIndex !== -1 ? 'Edit Task' : 'Add Task'}
            </button>
            {editIndex !== -1 && (
              <button
                type="button"
                onClick={() => {
                  setTaskName(''); 
                  setEditIndex(-1); 
                }}
                className="px-6 py-2 text-white bg-gray-400 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-2 border border-gray-300">
              <span>{task}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => editTask(task, index)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
