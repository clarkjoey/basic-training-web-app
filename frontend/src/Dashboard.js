import React from 'react';

const Dashboard = ({ dashboardHTML, tableData }) => (
  <div className="max-w-4xl mx-auto p-4">
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div dangerouslySetInnerHTML={{ __html: dashboardHTML }} />
    </section>

    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Table Data</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border-b">ID</th>
            <th className="p-2 text-left border-b">Name</th>
            <th className="p-2 text-left border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{row.id}</td>
              <td className="p-2 border-b">{row.name}</td>
              <td className="p-2 border-b">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </div>
);

export default Dashboard;