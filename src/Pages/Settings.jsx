import { useApp, getIconComponent, iconComponents } from '../context/AppContext'
import { useState } from 'react'
import Modal from '../components/Modal'
import { FiEdit2, FiTrash2, FiPlus, FiMoon, FiSun } from 'react-icons/fi'
import '../styles/settings.css'

export default function Settings({ darkMode, setDarkMode }) {
  const { categories, addCategory, editCategory, deleteCategory, currency, setCurrency } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCat, setEditingCat] = useState(null)
  const [catForm, setCatForm] = useState({ name: '', type: 'expense', color: '#2563EB', icon: 'FaMoneyBillWave' })

  const iconOptions = Object.keys(iconComponents)

  const handleSaveCategory = () => {
    if (editingCat) {
      editCategory(editingCat.id, catForm)
    } else {
      addCategory(catForm)
    }
    setIsModalOpen(false)
    setEditingCat(null)
    setCatForm({ name: '', type: 'expense', color: '#2563EB', icon: 'FaMoneyBillWave' })
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm('Delete this category?')) deleteCategory(id)
  }

  return (
    <div className="settings-page">
      <div className="container">
        <h1>Settings</h1>
        
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="setting-item">
            <span>Dark Mode</span>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="setting-item">
            <span>Currency</span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2>Categories</h2>
            <button className="btn btn-primary" onClick={() => { setEditingCat(null); setCatForm({ name: '', type: 'expense', color: '#2563EB', icon: 'FaMoneyBillWave' }); setIsModalOpen(true) }}>
              <FiPlus /> Add Category
            </button>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat.id} className="category-item" style={{ borderLeftColor: cat.color }}>
                <div className="category-info">
                  <span className="category-icon">{getIconComponent(cat.icon)}</span>
                  <div>
                    <strong>{cat.name}</strong>
                    <span className="category-type">{cat.type}</span>
                  </div>
                </div>
                <div className="category-actions">
                  <button onClick={() => { setEditingCat(cat); setCatForm({ ...cat }); setIsModalOpen(true) }}>
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCat ? 'Edit Category' : 'New Category'}>
          <div className="modal-form">
            <input 
              type="text" 
              placeholder="Category Name" 
              value={catForm.name} 
              onChange={(e) => setCatForm({...catForm, name: e.target.value})} 
            />
            <select value={catForm.type} onChange={(e) => setCatForm({...catForm, type: e.target.value})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select value={catForm.icon} onChange={(e) => setCatForm({...catForm, icon: e.target.value})}>
              {iconOptions.map(iconName => (
                <option key={iconName} value={iconName}>
                  {getIconComponent(iconName)} {iconName.replace('Fa', '')}
                </option>
              ))}
            </select>
            <input 
              type="color" 
              value={catForm.color} 
              onChange={(e) => setCatForm({...catForm, color: e.target.value})} 
            />
            <button className="btn btn-primary" onClick={handleSaveCategory}>Save</button>
          </div>
        </Modal>
      </div>
    </div>
  )
}