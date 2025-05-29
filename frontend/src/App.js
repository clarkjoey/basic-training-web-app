import React, { useEffect, useState } from 'react';
import './index.css';
import Dashboard from './Dashboard';
import AiChatPage from './AiChatPage';
import Login from './Login';

function App() {
  const [tableData, setTableData] = useState([]);
  const [dashboardHTML, setDashboardHTML] = useState('');
  const [chatPageHTML, setChatPageHTML] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  useEffect(() => {
    if (currentPage === 'dashboard') {
      fetch('/api/dashboard')
        .then(res => res.text())
        .then(setDashboardHTML);
    }

    if (currentPage === 'chat') {
      fetch('/api/other-page')
        .then(res => res.text())
        .then(setChatPageHTML);
      fetch('/api/chat-messages')
        .then(res => res.json())
        .then(setChatMessages);
    }
  }, [currentPage]);

  useEffect(() => {
    if (localStorage.getItem('authenticated') === 'true') {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }

    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    })
      .then(res => res.json())
      .then(data => setToken(data.token))
      .catch(err => console.error('Auth error:', err));

    fetch('/api/table-data')
      .then(res => res.json())
      .then(setTableData);
  }, []);

  const handleDashboardClick = () => setCurrentPage('dashboard');
  const handleChatClick = () => setCurrentPage('chat');

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }} />
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold">Replicate Training App</h1>
        <div className="space-x-4">
          <button
            className={`py-2 px-4 rounded ${currentPage === 'dashboard' ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={handleDashboardClick}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 rounded ${currentPage === 'chat' ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={handleChatClick}
          >
            AI Chat Page
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {token && (
        <p className="text-center text-sm text-gray-600 mt-2">
          <strong>Logged in with token:</strong> {token}
        </p>
      )}

      {currentPage === 'dashboard' && (
        <Dashboard dashboardHTML={dashboardHTML} tableData={tableData} />
      )}

      {currentPage === 'chat' && (
        <AiChatPage chatPageHTML={chatPageHTML} chatMessages={chatMessages} />
      )}
    </div>
  );
}

export default App;