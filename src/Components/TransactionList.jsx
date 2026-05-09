// import React, { useState } from 'react'
// import TransactionItem from './TransactionItem'
// import { FiSearch } from 'react-icons/fi'
// import { categories } from '../data/dummyData'
// import './TransactionList.css'

// const TransactionList = ({ transactions, onEdit, onDelete }) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterCategory, setFilterCategory] = useState('all')
//   const [filterType, setFilterType] = useState('all')

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory
//     const matchesType = filterType === 'all' || 
//       (filterType === 'income' && transaction.amount > 0) ||
//       (filterType === 'expense' && transaction.amount < 0)
//     return matchesSearch && matchesCategory && matchesType
//   })

//   const sortedTransactions = [...filteredTransactions].sort((a, b) => 
//     new Date(b.date) - new Date(a.date)
//   )

//   return (
//     <div className="transaction-list-container card">
//       <div className="filters">
//         <div className="search-box">
//           <FiSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search transactions..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
//           <option value="all">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//           <option value="all">All Types</option>
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>
//       </div>
      
//       <div className="transaction-list">
//         {sortedTransactions.length === 0 ? (
//           <div className="empty-state">
//             <p>No transactions found</p>
//           </div>
//         ) : (
//           sortedTransactions.map(transaction => (
//             <TransactionItem
//               key={transaction.id}
//               transaction={transaction}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default TransactionList

import React, { useState } from 'react'
import TransactionItem from './TransactionItem'
import { FiSearch } from 'react-icons/fi'
import { categories } from '../data/dummyData'
import './TransactionList.css'

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory
    const matchesType = filterType === 'all' || 
      (filterType === 'income' && transaction.amount > 0) ||
      (filterType === 'expense' && transaction.amount < 0)
    return matchesSearch && matchesCategory && matchesType
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )

  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-list-container card">
        <div className="empty-state">
          <p>No transactions yet. Click "Add Transaction" to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transaction-list-container card">
      <div className="filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>
      </div>
      
      <div className="transaction-list">
        {sortedTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions match your filters</p>
          </div>
        ) : (
          sortedTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TransactionList