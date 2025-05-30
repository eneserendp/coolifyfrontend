import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      setMessage('Kullanıcılar yüklenirken hata oluştu');
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      setFormData({ name: '', email: '' });
      fetchUsers();
      setMessage('Kullanıcı başarıyla eklendi!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Hata: ' + error.response?.data?.error || 'Bir hata oluştu');
      console.error('Error adding user:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Kullanıcı Kayıt Sistemi</h1>
      
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: message.includes('Hata') ? '#ffebee' : '#e8f5e9',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="İsim"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Kaydet
        </button>
      </form>

      <h2 style={{ color: '#333', marginBottom: '15px' }}>Kayıtlı Kullanıcılar</h2>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0,
        margin: 0 
      }}>
        {users.map(user => (
          <li 
            key={user.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{user.name}</span>
            <span style={{ color: '#666' }}>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
