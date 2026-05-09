// import React, { useState, useEffect } from 'react'
// import Navbar from './components/Navbar'
// import Dashboard from './pages/Dashboard'
// import Reports from './pages/Reports'
// import { dummyTransactions } from './data/dummyData'
// import './App.css'

// function App() {
//   const [transactions, setTransactions] = useState([])
//   const [activePage, setActivePage] = useState('dashboard')
//   const [notification, setNotification] = useState(null)

//   // Load transactions from localStorage on mount
//   useEffect(() => {
//     const savedTransactions = localStorage.getItem('transactions')
//     if (savedTransactions) {
//       setTransactions(JSON.parse(savedTransactions))
//     } else {
//       setTransactions(dummyTransactions)
//       localStorage.setItem('transactions', JSON.stringify(dummyTransactions))
//     }
//   }, [])

//   // Save transactions to localStorage whenever they change
//   useEffect(() => {
//     if (transactions.length > 0) {
//       localStorage.setItem('transactions', JSON.stringify(transactions))
//     }
//   }, [transactions])

//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type })
//     setTimeout(() => setNotification(null), 3000)
//   }

//   const addTransaction = (transaction) => {
//     const newTransaction = {
//       ...transaction,
//       id: Date.now(),
//       amount: transaction.type === 'expense' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount)
//     }
//     setTransactions([newTransaction, ...transactions])
//     showNotification('Transaction added successfully!', 'success')
//   }

//   const updateTransaction = (updatedTransaction) => {
//     setTransactions(transactions.map(t => 
//       t.id === updatedTransaction.id ? updatedTransaction : t
//     ))
//     showNotification('Transaction updated successfully!', 'success')
//   }

//   const deleteTransaction = (id) => {
//     if (window.confirm('Are you sure you want to delete this transaction?')) {
//       setTransactions(transactions.filter(t => t.id !== id))
//       showNotification('Transaction deleted successfully!', 'success')
//     }
//   }

//   return (
//     <div className="app">
//       <Navbar activePage={activePage} setActivePage={setActivePage} />
//       <main className="main-content">
//         {activePage === 'dashboard' ? (
//           <Dashboard 
//             transactions={transactions}
//             addTransaction={addTransaction}
//             updateTransaction={updateTransaction}
//             deleteTransaction={deleteTransaction}
//             showNotification={showNotification}
//           />
//         ) : (
//           <Reports transactions={transactions} />
//         )}
//       </main>
//       {notification && (
//         <div className={`notification notification-${notification.type}`}>
//           {notification.message}
//           <button onClick={() => setNotification(null)}>&times;</button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import { dummyTransactions } from './data/dummyData'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
  const [activePage, setActivePage] = useState('dashboard')
  const [notification, setNotification] = useState(null)

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions)
      if (parsed && parsed.length > 0) {
        setTransactions(parsed)
      } else {
        setTransactions(dummyTransactions)
        localStorage.setItem('transactions', JSON.stringify(dummyTransactions))
      }
    } else {
      setTransactions(dummyTransactions)
      localStorage.setItem('transactions', JSON.stringify(dummyTransactions))
    }
  }, [])

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    }
  }, [transactions])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const addTransaction = (transactionData) => {
    console.log('Adding transaction:', transactionData)
    
    const newTransaction = {
      id: Date.now(),
      title: transactionData.title,
      amount: transactionData.type === 'expense' 
        ? -Math.abs(parseFloat(transactionData.amount)) 
        : Math.abs(parseFloat(transactionData.amount)),
      category: transactionData.category,
      date: transactionData.date,
      type: transactionData.type
    }
    
    console.log('New transaction object:', newTransaction)
    setTransactions(prev => {
      const updated = [newTransaction, ...prev]
      console.log('Updated transactions:', updated)
      return updated
    })
    showNotification('Transaction added successfully!', 'success')
    return true
  }

  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    )
    showNotification('Transaction updated successfully!', 'success')
  }

  const deleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id))
      showNotification('Transaction deleted successfully!', 'success')
    }
  }

  return (
    <div className="app">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {activePage === 'dashboard' ? (
          <Dashboard 
            transactions={transactions}
            addTransaction={addTransaction}
            updateTransaction={updateTransaction}
            deleteTransaction={deleteTransaction}
            showNotification={showNotification}
          />
        ) : (
          <Reports transactions={transactions} />
        )}
      </main>
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>&times;</button>
        </div>
      )}
    </div>
  )
}

export default App