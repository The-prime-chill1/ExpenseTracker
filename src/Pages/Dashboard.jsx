// import React, { useState } from 'react'
// import SummaryCards from '../components/SummaryCards'
// import ExpenseChart from '../components/ExpenseChart'
// import TransactionForm from '../components/TransactionForm'
// import TransactionList from '../components/TransactionList'
// import './Dashboard.css'

// const Dashboard = ({ transactions, addTransaction, updateTransaction, deleteTransaction, showNotification }) => {
//   const [showForm, setShowForm] = useState(false)
//   const [editingTransaction, setEditingTransaction] = useState(null)

//   const handleAddTransaction = (transaction) => {
//     addTransaction(transaction)
//     setShowForm(false)
//   }

//   const handleEditTransaction = (transaction) => {
//     setEditingTransaction(transaction)
//     setShowForm(true)
//   }

//   const handleUpdateTransaction = (updatedTransaction) => {
//     updateTransaction(updatedTransaction)
//     setShowForm(false)
//     setEditingTransaction(null)
//   }

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Financial Dashboard</h1>
//         <button className="add-transaction-btn" onClick={() => setShowForm(true)}>
//           + Add Transaction
//         </button>
//       </div>

//       <SummaryCards transactions={transactions} />

//       <div className="dashboard-grid">
//         <ExpenseChart transactions={transactions} />
//         <TransactionList
//           transactions={transactions.slice(0, 10)}
//           onEdit={handleEditTransaction}
//           onDelete={deleteTransaction}
//         />
//       </div>

//       {showForm && (
//         <TransactionForm
//           transaction={editingTransaction}
//           onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
//           onClose={() => {
//             setShowForm(false)
//             setEditingTransaction(null)
//           }}
//         />
//       )}
//     </div>
//   )
// }

// export default Dashboard

import React, { useState } from 'react'
import SummaryCards from '../components/SummaryCards'
import ExpenseChart from '../components/ExpenseChart'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import './Dashboard.css'

const Dashboard = ({ transactions, addTransaction, updateTransaction, deleteTransaction, showNotification }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const handleAddTransaction = (transactionData) => {
    console.log('Dashboard - Adding transaction:', transactionData)
    const success = addTransaction(transactionData)
    if (success) {
      setShowForm(false)
    }
  }

  const handleEditClick = (transaction) => {
    console.log('Editing transaction:', transaction)
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const handleUpdateTransaction = (updatedTransaction) => {
    console.log('Updating transaction:', updatedTransaction)
    const transactionWithId = {
      ...updatedTransaction,
      id: editingTransaction.id,
      amount: updatedTransaction.type === 'expense' 
        ? -Math.abs(updatedTransaction.amount) 
        : Math.abs(updatedTransaction.amount)
    }
    updateTransaction(transactionWithId)
    setShowForm(false)
    setEditingTransaction(null)
  }

  const handleDeleteTransaction = (id) => {
    console.log('Deleting transaction:', id)
    deleteTransaction(id)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTransaction(null)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Financial Dashboard</h1>
          <p className="dashboard-subtitle">Track your income and expenses easily</p>
        </div>
        <button className="add-transaction-btn" onClick={() => setShowForm(true)}>
          + Add Transaction
        </button>
      </div>

      <SummaryCards transactions={transactions} />

      <div className="dashboard-grid">
        <ExpenseChart transactions={transactions} />
        <div className="recent-transactions-section">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <span className="transaction-count">{transactions.length} total</span>
          </div>
          <TransactionList
            transactions={transactions.slice(0, 10)}
            onEdit={handleEditClick}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>

      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}

export default Dashboard