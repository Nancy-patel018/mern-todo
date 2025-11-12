import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await axios.post(`${API}/todos`, { text });
    setTodos(prev => [res.data, ...prev]);
    setText('');
  }

  async function toggle(id) {
    const res = await axios.patch(`${API}/todos/${id}`);
    setTodos(prev => prev.map(t => t._id === id ? res.data : t));
  }

  async function remove(id) {
    await axios.delete(`${API}/todos/${id}`);
    setTodos(prev => prev.filter(t => t._id !== id));
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Todo</h1>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" style={{ flex: 1, padding: 8 }} />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {todos.map(t => (
          <li key={t._id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t._id)} />
              <span style={{ marginLeft: 8, textDecoration: t.completed ? 'line-through' : 'none' }}>{t.text}</span>
            </div>
            <button onClick={() => remove(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
