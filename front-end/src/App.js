import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Récupérer les tâches depuis le back-end
  useEffect(() => {
    axios.get('http://backend:3030/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Ajouter une tâche
  const addTask = () => {
    axios.post('http://backend:3030/tasks', { title: input })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setInput('');
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    axios.delete(`http://backend:3030/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>To-do List de alan</h1>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Nouvelle tâche" />
      <button onClick={addTask}>Ajouter</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} <button onClick={() => deleteTask(task._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;