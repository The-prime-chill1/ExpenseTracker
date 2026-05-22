import { createContext, useContext, useState, useEffect } from 'react'
import { FaUtensils, FaCar, FaShoppingBag, FaLightbulb, FaFilm, FaHospital, FaBook, FaMoneyBillWave, FaLaptopCode, FaChartLine } from 'react-icons/fa'

const AppContext = createContext()

// Icon mapping for rendering
export const iconComponents = {
  'FaUtensils': FaUtensils,
  'FaCar': FaCar,
  'FaShoppingBag': FaShoppingBag,
  'FaLightbulb': FaLightbulb,
  'FaFilm': FaFilm,
  'FaHospital': FaHospital,
  'FaBook': FaBook,
  'FaMoneyBillWave': FaMoneyBillWave,
  'FaLaptopCode': FaLaptopCode,
  'FaChartLine': FaChartLine,
}

// Helper function to get icon component
export const getIconComponent = (iconName) => {
  if (!iconName) return <FaMoneyBillWave />
  const IconComponent = iconComponents[iconName]
  return IconComponent ? <IconComponent /> : <FaMoneyBillWave />
}

const defaultCategories = [
  { id: 'cat1', name: 'Food & Dining', type: 'expense', color: '#EF4444', icon: 'FaUtensils' },
  { id: 'cat2', name: 'Transportation', type: 'expense', color: '#F59E0B', icon: 'FaCar' },
  { id: 'cat3', name: 'Shopping', type: 'expense', color: '#8B5CF6', icon: 'FaShoppingBag' },
  { id: 'cat4', name: 'Bills & Utilities', type: 'expense', color: '#EC4899', icon: 'FaLightbulb' },
  { id: 'cat5', name: 'Entertainment', type: 'expense', color: '#14B8A6', icon: 'FaFilm' },
  { id: 'cat6', name: 'Healthcare', type: 'expense', color: '#06B6D4', icon: 'FaHospital' },
  { id: 'cat7', name: 'Education', type: 'expense', color: '#6366F1', icon: 'FaBook' },
  { id: 'cat8', name: 'Salary', type: 'income', color: '#22C55E', icon: 'FaMoneyBillWave' },
  { id: 'cat9', name: 'Freelance', type: 'income', color: '#10B981', icon: 'FaLaptopCode' },
  { id: 'cat10', name: 'Investment', type: 'income', color: '#3B82F6', icon: 'FaChartLine' },
]

export function AppProvider({ children, showToast }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('mrchills_transactions')
    if (saved) return JSON.parse(saved)
    const demo = [
      { id: 't1', amount: 4500, type: 'income', category: 'cat8', date: '2024-11-01', description: 'Monthly Salary' },
      { id: 't2', amount: 45.50, type: 'expense', category: 'cat1', date: '2024-11-02', description: 'Dinner at Sushi Place' },
      { id: 't3', amount: 32.00, type: 'expense', category: 'cat2', date: '2024-11-03', description: 'Uber Ride' },
      { id: 't4', amount: 1200, type: 'expense', category: 'cat4', date: '2024-11-05', description: 'Rent' },
      { id: 't5', amount: 89.99, type: 'expense', category: 'cat3', date: '2024-11-07', description: 'New Headphones' },
      { id: 't6', amount: 500, type: 'income', category: 'cat9', date: '2024-11-10', description: 'Freelance Project' },
    ]
    return demo
  })

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('mrchills_categories')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Check if we need to migrate old data
      if (parsed.length > 0 && parsed[0].icon && typeof parsed[0].icon === 'string' && !parsed[0].icon.startsWith('Fa')) {
        const migrationMap = {
          '🍔': 'FaUtensils',
          '🚗': 'FaCar',
          '🛍️': 'FaShoppingBag',
          '💡': 'FaLightbulb',
          '🎬': 'FaFilm',
          '🏥': 'FaHospital',
          '📚': 'FaBook',
          '💰': 'FaMoneyBillWave',
          '💻': 'FaLaptopCode',
          '📈': 'FaChartLine',
        }
        const migrated = parsed.map(cat => ({
          ...cat,
          icon: migrationMap[cat.icon] || cat.icon
        }))
        return migrated
      }
      return parsed
    }
    return defaultCategories
  })

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('mrchills_currency') || 'USD'
  })

  useEffect(() => {
    localStorage.setItem('mrchills_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('mrchills_categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem('mrchills_currency', currency)
  }, [currency])

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: Date.now().toString() }
    setTransactions(prev => [newTransaction, ...prev])
    showToast('Transaction added successfully', 'success')
  }

  const editTransaction = (id, updated) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...updated, id } : t))
    showToast('Transaction updated', 'success')
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
    showToast('Transaction deleted', 'success')
  }

  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now().toString() }
    setCategories(prev => [...prev, newCategory])
    showToast('Category created', 'success')
  }

  const editCategory = (id, updated) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...updated, id } : c))
    showToast('Category updated', 'success')
  }

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    showToast('Category deleted', 'success')
  }

  const getBalance = () => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    return totalIncome - totalExpense
  }

  const getMonthlyData = (month, year) => {
    return transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === month && date.getFullYear() === year
    })
  }

  return (
    <AppContext.Provider value={{
      transactions, setTransactions,
      categories, setCategories,
      currency, setCurrency,
      addTransaction, editTransaction, deleteTransaction,
      addCategory, editCategory, deleteCategory,
      getBalance, getMonthlyData
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)