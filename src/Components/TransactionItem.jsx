// import React from 'react'
// import { FiEdit2, FiTrash2 } from 'react-icons/fi'
// import { format } from 'date-fns'
// import './TransactionItem.css'

// const TransactionItem = ({ transaction, onEdit, onDelete }) => {
//   const isExpense = transaction.amount < 0
//   const amount = Math.abs(transaction.amount).toFixed(2)

//   return (
//     <div className="transaction-item">
//       <div className="transaction-info">
//         <h4>{transaction.title}</h4>
//         <div className="transaction-meta">
//           <span className="category-badge">{transaction.category}</span>
//           <span className="transaction-date">
//             {format(new Date(transaction.date), 'MMM dd, yyyy')}
//           </span>
//         </div>
//       </div>
      
//       <div className="transaction-actions">
//         <span className={`transaction-amount ${isExpense ? 'expense' : 'income'}`}>
//           {isExpense ? '-$' : '+$'}{amount}
//         </span>
//         <button onClick={() => onEdit(transaction)} className="action-btn edit-btn">
//           <FiEdit2 />
//         </button>
//         <button onClick={() => onDelete(transaction.id)} className="action-btn delete-btn">
//           <FiTrash2 />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default TransactionItem

import React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { format } from 'date-fns'
import './TransactionItem.css'

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  if (!transaction) return null
  
  const isExpense = transaction.amount < 0
  const amount = Math.abs(transaction.amount).toFixed(2)

  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h4>{transaction.title}</h4>
        <div className="transaction-meta">
          <span className="category-badge">{transaction.category}</span>
          <span className="transaction-date">
            {format(new Date(transaction.date), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
      
      <div className="transaction-actions">
        <span className={`transaction-amount ${isExpense ? 'expense' : 'income'}`}>
          {isExpense ? '-$' : '+$'}{amount}
        </span>
        <button onClick={() => onEdit(transaction)} className="action-btn edit-btn" title="Edit">
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(transaction.id)} className="action-btn delete-btn" title="Delete">
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default TransactionItem