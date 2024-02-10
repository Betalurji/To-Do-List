
import './index.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Düzenleme indeksi

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
      <div className="w-1/2 h-auto bg-gray-200 rounded shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">To-Do List</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <input
            type="text"
            {...register('taskName', { required: true })}
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            placeholder="Add new task..."
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-4"
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
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="border border-gray-300 px-4 py-2 flex justify-between items-center">
              <span>{task}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => editTask(task, index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
