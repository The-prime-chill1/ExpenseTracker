// import React, { useState, useEffect } from 'react'
// import { FiX } from 'react-icons/fi'
// import { categories } from '../data/dummyData'
// import './TransactionForm.css'

// const TransactionForm = ({ transaction, onSubmit, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     category: 'Food',
//     date: new Date().toISOString().split('T')[0],
//     type: 'expense'
//   })

//   useEffect(() => {
//     if (transaction) {
//       setFormData({
//         title: transaction.title,
//         amount: Math.abs(transaction.amount).toString(),
//         category: transaction.category,
//         date: transaction.date,
//         type: transaction.amount > 0 ? 'income' : 'expense'
//       })
//     }
//   }, [transaction])

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const amount = parseFloat(formData.amount)
//     if (isNaN(amount) || amount <= 0) {
//       alert('Please enter a valid amount')
//       return
//     }
//     if (!formData.title.trim()) {
//       alert('Please enter a title')
//       return
//     }
//     onSubmit({
//       ...formData,
//       amount: formData.type === 'expense' ? -amount : amount,
//       id: transaction?.id
//     })
//   }

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
//           <button onClick={onClose} className="close-btn">
//             <FiX />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="transaction-form">
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="e.g., Grocery Shopping"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Amount ($)</label>
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="0.00"
//               step="0.01"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Type</label>
//             <div className="type-buttons">
//               <button
//                 type="button"
//                 className={`type-btn ${formData.type === 'expense' ? 'active-expense' : ''}`}
//                 onClick={() => setFormData({ ...formData, type: 'expense' })}
//               >
//                 Expense
//               </button>
//               <button
//                 type="button"
//                 className={`type-btn ${formData.type === 'income' ? 'active-income' : ''}`}
//                 onClick={() => setFormData({ ...formData, type: 'income' })}
//               >
//                 Income
//               </button>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Category</label>
//             <select name="category" value={formData.category} onChange={handleChange}>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-actions">
//             <button type="button" onClick={onClose} className="cancel-btn">
//               Cancel
//             </button>
//             <button type="submit" className="submit-btn">
//               {transaction ? 'Update' : 'Add'} Transaction
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default TransactionForm

import React, { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { categories } from '../data/dummyData'
import './TransactionForm.css'

const TransactionForm = ({ transaction, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: Math.abs(transaction.amount).toString(),
        category: transaction.category,
        date: transaction.date,
        type: transaction.amount > 0 ? 'income' : 'expense'
      })
    }
  }, [transaction])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount'
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    
    if (!validateForm()) {
      console.log('Validation failed:', errors)
      return
    }
    
    const submissionData = {
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type
    }
    
    console.log('Submitting data:', submissionData)
    onSubmit(submissionData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{transaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <button onClick={onClose} className="close-btn">
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery Shopping, Salary, etc."
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Amount ($) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className={errors.amount ? 'error' : ''}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label>Type *</label>
            <div className="type-buttons">
              <button
                type="button"
                className={`type-btn ${formData.type === 'expense' ? 'active-expense' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
              >
                💸 Expense
              </button>
              <button
                type="button"
                className={`type-btn ${formData.type === 'income' ? 'active-income' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              >
                💰 Income
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {transaction ? 'Update Transaction' : '+ Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm