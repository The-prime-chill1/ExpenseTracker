import { useState } from 'react'
import { useApp, getIconComponent } from '../context/AppContext'
import Modal from '../components/Modal'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import '../styles/transactions.css'

export default function Transactions() {
  const { transactions, categories, addTransaction, editTransaction, deleteTransaction, currency } = useApp()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    category: ''
  })

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || t.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  const handleOpenModal = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction)
      setFormData({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        type: transaction.type,
        category: transaction.category
      })
    } else {
      setEditingTransaction(null)
      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        category: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, formData)
    } else {
      addTransaction(formData)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const getCategory = (id) => categories.find(c => c.id === id)

  return (
    <div className="transactions-page">
      <div className="container">
        <div className="transactions-header">
          <h1>Transactions</h1>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <FiPlus /> Add Transaction
          </button>
        </div>

        <div className="filters-bar">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{getIconComponent(c.icon)} {c.name}</option>)}
          </select>
        </div>

        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => {
                const cat = getCategory(t.category)
                return (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td><strong>{t.description}</strong></td>
                    <td><span className="category-badge" style={{ background: cat?.color + '20', color: cat?.color }}>
                      {getIconComponent(cat?.icon)} {cat?.name}
                    </span></td>
                    <td className={t.type === 'income' ? 'income-amount' : 'expense-amount'}>
                      {t.type === 'income' ? '+' : '-'}{currency === 'USD' ? '$' : '€'}{t.amount.toFixed(2)}
                    </td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleOpenModal(t)}>
                        <FiEdit2 />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(t.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && <div className="empty-state">No transactions found</div>}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}>
          <div className="modal-form">
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})} />
            <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, category: ''})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="">Select Category</option>
              {categories.filter(c => c.type === formData.type).map(c => (
                <option key={c.id} value={c.id}>{getIconComponent(c.icon)} {c.name}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </Modal>
      </div>
    </div>
  )
}