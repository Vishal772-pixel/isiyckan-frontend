// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [transactions] = useState([
    {
      id: 1,
      date: '2023-12-20',
      items: ['Modern Wooden Chair', 'Glass Coffee Table'],
      total: 499.98,
      status: 'Delivered'
    },
    {
      id: 2,
      date: '2023-12-15',
      items: ['Executive Office Chair'],
      total: 299.99,
      status: 'In Transit'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">{transactions.length}</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Spent</h3>
              <p className="text-3xl font-bold">
                ${transactions.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
              <p className="text-3xl font-bold">
                {transactions.filter(t => t.status === 'In Transit').length}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.items.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${transaction.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}