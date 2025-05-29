import React, { useEffect, useState } from 'react';
import './index.css';
import Dashboard from './Dashboard';
import AiChatPage from './AiChatPage';
import Login from './Login';

function App() {
  // State for storing app data and UI state
  const [tableData, setTableData] = useState([]); // Dashboard table data
  const [dashboardHTML, setDashboardHTML] = useState(''); // Raw HTML content for dashboard
  const [chatPageHTML, setChatPageHTML] = useState(''); // Raw HTML content for AI Chat page
  const [chatMessages, setChatMessages] = useState([]); // AI chat message list
  const [token, setToken] = useState(null); // Auth token
  const [currentPage, setCurrentPage] = useState(null); // Tracks which page is visible
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  ); // Determines if user is logged in

  // Fetch page-specific data whenever the route changes
  useEffect(() => {
    if (currentPage === 'dashboard') {
      fetch('/api/dashboard')
        .then(res => res.text())
        .then(setDashboardHTML); // Set raw HTML content for dashboard

      fetch('/api/table-data')
        .then(res => res.json())
        .then(setTableData); // Set table data array
    }

    if (currentPage === 'chat') {
      fetch('/api/other-page')
        .then(res => res.text())
        .then(setChatPageHTML); // Set raw HTML content for chat page

      fetch('/api/chat-messages')
        .then(res => res.json())
        .then(setChatMessages); // Set list of chat messages
    }
  }, [currentPage]);

  // Initial auth and token request when the app loads
  useEffect(() => {
    // Restore session if already authenticated
    if (localStorage.getItem('authenticated') === 'true') {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }

    // Authenticate and get a token (simulated auth request)
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    })
      .then(res => res.json())
      .then(data => setToken(data.token)) // Store token in state
      .catch(err => console.error('Auth error:', err));
  }, []);

  // Navigation button handlers
  const handleDashboardClick = () => setCurrentPage('dashboard');
  const handleChatClick = () => setCurrentPage('chat');

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <Login
        onLogin={() => {
          setIsAuthenticated(true);
          setCurrentPage('dashboard');
        }}
      />
    );
  }

  // Main UI layout with navigation and conditional page rendering
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Top navigation header */}
      <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold">Replicate Training App</h1>
        <div className="space-x-4">
          {/* Page toggle buttons */}
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
          {/* Logout button */}
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

      {/* Token info */}
      {token && (
        <p className="text-center text-sm text-gray-600 mt-2">
          <strong>Logged in with token:</strong> {token}
        </p>
      )}

      {/* Page rendering */}
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