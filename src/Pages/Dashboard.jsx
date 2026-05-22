// import { useApp } from '../context/AppContext'
// import { Link } from 'react-router-dom'
// import { Line, Doughnut } from 'react-chartjs-2'
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js'
// import { useEffect, useState } from 'react'
// import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiArrowRight } from 'react-icons/fi'
// import { FaPiggyBank, FaShoppingCart, FaUtensils, FaCar, FaGamepad, FaFilm, FaHeart, FaBriefcase, FaHome, FaGraduationCap, FaPlane, FaGift, FaCoffee, FaShoppingBag, FaTshirt, FaMobile, FaMedkit, FaFutbol, FaBook, FaMusic, FaCamera, FaGem, FaTree, FaPizzaSlice, FaBeer, FaSmile, FaQuestion } from 'react-icons/fa'
// import '../styles/dashboard.css'

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler)

// // Map of common emojis to their corresponding react-icons
// const iconMap = {
//   '💰': <FiDollarSign />,
//   '📈': <FiTrendingUp />,
//   '📉': <FiTrendingDown />,
//   '💸': <FaShoppingCart />,
//   '🍔': <FaUtensils />,
//   '🚗': <FaCar />,
//   '🎮': <FaGamepad />,
//   '🎬': <FaFilm />,
//   '❤️': <FaHeart />,
//   '💼': <FaBriefcase />,
//   '🏠': <FaHome />,
//   '🎓': <FaGraduationCap />,
//   '✈️': <FaPlane />,
//   '🎁': <FaGift />,
//   '☕': <FaCoffee />,
//   '🛍️': <FaShoppingBag />,
//   '👕': <FaTshirt />,
//   '📱': <FaMobile />,
//   '💊': <FaMedkit />,
//   '⚽': <FaFutbol />,
//   '📚': <FaBook />,
//   '🎵': <FaMusic />,
//   '📷': <FaCamera />,
//   '💎': <FaGem />,
//   '🌳': <FaTree />,
//   '🍕': <FaPizzaSlice />,
//   '🍺': <FaBeer />,
//   '😊': <FaSmile />,
//   '🐷': <FaPiggyBank />,
// }

// const getIconComponent = (emoji) => {
//   return iconMap[emoji] || <FiDollarSign />
// }

// export default function Dashboard() {
//   const { transactions, categories, getBalance, currency } = useApp()
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
//   const [animateNumbers, setAnimateNumbers] = useState({ balance: 0, income: 0, expense: 0 })

//   const monthlyTransactions = transactions.filter(t => {
//     const date = new Date(t.date)
//     return date.getMonth() === currentMonth && date.getFullYear() === currentYear
//   })

//   const totalIncome = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
//   const totalExpense = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
//   const balance = getBalance()

//   useEffect(() => {
//     setAnimateNumbers({ balance: 0, income: 0, expense: 0 })
//     const duration = 1000
//     const steps = 60
//     const stepTime = duration / steps
//     let step = 0
//     const interval = setInterval(() => {
//       step++
//       setAnimateNumbers({
//         balance: (balance * step) / steps,
//         income: (totalIncome * step) / steps,
//         expense: (totalExpense * step) / steps,
//       })
//       if (step >= steps) clearInterval(interval)
//     }, stepTime)
//     return () => clearInterval(interval)
//   }, [balance, totalIncome, totalExpense])

//   const expenseByCategory = {}
//   monthlyTransactions.filter(t => t.type === 'expense').forEach(t => {
//     const cat = categories.find(c => c.id === t.category)
//     if (cat) {
//       expenseByCategory[cat.name] = (expenseByCategory[cat.name] || 0) + t.amount
//     }
//   })

//   const doughnutData = {
//     labels: Object.keys(expenseByCategory),
//     datasets: [{
//       data: Object.values(expenseByCategory),
//       backgroundColor: ['#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#06B6D4', '#6366F1'],
//       borderWidth: 0,
//       cutout: '65%',
//     }]
//   }

//   const lineData = {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//     datasets: [
//       {
//         label: 'Income',
//         data: [1200, 1900, 1500, 2100],
//         borderColor: '#22C55E',
//         backgroundColor: 'rgba(34, 197, 94, 0.1)',
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: 'Expenses',
//         data: [800, 1100, 950, 1300],
//         borderColor: '#EF4444',
//         backgroundColor: 'rgba(239, 68, 68, 0.1)',
//         fill: true,
//         tension: 0.4,
//       }
//     ]
//   }

//   const recentTransactions = transactions.slice(0, 5)

//   return (
//     <div className="dashboard-page">
//       <div className="container">
//         <div className="dashboard-header">
//           <h1>Dashboard</h1>
//           <div className="month-selector">
//             <select value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
//               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
//                 <option key={i} value={i}>{m}</option>
//               ))}
//             </select>
//             <select value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))}>
//               {[2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
//             </select>
//           </div>
//         </div>

//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon"><FiDollarSign /></div>
//             <div className="stat-info">
//               <span>Total Balance</span>
//               <strong>{currency === 'USD' ? '$' : '€'}{animateNumbers.balance.toFixed(2)}</strong>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon"><FiTrendingUp /></div>
//             <div className="stat-info">
//               <span>Income</span>
//               <strong className="income">+{currency === 'USD' ? '$' : '€'}{animateNumbers.income.toFixed(2)}</strong>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon"><FiTrendingDown /></div>
//             <div className="stat-info">
//               <span>Expenses</span>
//               <strong className="expense">-{currency === 'USD' ? '$' : '€'}{animateNumbers.expense.toFixed(2)}</strong>
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-grid">
//           <div className="card chart-card">
//             <h3>Spending Trends</h3>
//             <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//           <div className="card chart-card">
//             <h3>Expense Breakdown</h3>
//             <div className="doughnut-container">
//               {Object.keys(expenseByCategory).length > 0 ? (
//                 <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
//               ) : (
//                 <div className="empty-state">No expense data for this month</div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="card recent-card">
//           <div className="card-header">
//             <h3>Recent Transactions</h3>
//             <Link to="/transactions" className="view-all">View All <FiArrowRight /></Link>
//           </div>
//           <div className="transactions-list">
//             {recentTransactions.map(t => {
//               const cat = categories.find(c => c.id === t.category)
//               return (
//                 <div key={t.id} className="transaction-item">
//                   <div className="transaction-icon" style={{ background: cat?.color || '#ccc' }}>
//                     {cat?.icon ? getIconComponent(cat.icon) : <FiDollarSign />}
//                   </div>
//                   <div className="transaction-details">
//                     <strong>{t.description}</strong>
//                     <span>{t.date}</span>
//                   </div>
//                   <div className={`transaction-amount ${t.type}`}>
//                     {t.type === 'income' ? '+' : '-'}{currency === 'USD' ? '$' : '€'}{t.amount.toFixed(2)}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useApp, getIconComponent } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js'
import { useEffect, useState } from 'react'
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiArrowRight } from 'react-icons/fi'
import '../styles/dashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler)

export default function Dashboard() {
  const { transactions, categories, getBalance, currency } = useApp()
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [animateNumbers, setAnimateNumbers] = useState({ balance: 0, income: 0, expense: 0 })

  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const totalIncome = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = getBalance()

  useEffect(() => {
    setAnimateNumbers({ balance: 0, income: 0, expense: 0 })
    const duration = 1000
    const steps = 60
    const stepTime = duration / steps
    let step = 0
    const interval = setInterval(() => {
      step++
      setAnimateNumbers({
        balance: (balance * step) / steps,
        income: (totalIncome * step) / steps,
        expense: (totalExpense * step) / steps,
      })
      if (step >= steps) clearInterval(interval)
    }, stepTime)
    return () => clearInterval(interval)
  }, [balance, totalIncome, totalExpense])

  const expenseByCategory = {}
  monthlyTransactions.filter(t => t.type === 'expense').forEach(t => {
    const cat = categories.find(c => c.id === t.category)
    if (cat) {
      expenseByCategory[cat.name] = (expenseByCategory[cat.name] || 0) + t.amount
    }
  })

  const doughnutData = {
    labels: Object.keys(expenseByCategory),
    datasets: [{
      data: Object.values(expenseByCategory),
      backgroundColor: ['#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#06B6D4', '#6366F1'],
      borderWidth: 0,
      cutout: '65%',
    }]
  }

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1900, 1500, 2100],
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [800, 1100, 950, 1300],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="month-selector">
            <select value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
            <select value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))}>
              {[2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><FiDollarSign /></div>
            <div className="stat-info">
              <span>Total Balance</span>
              <strong>{currency === 'USD' ? '$' : '€'}{animateNumbers.balance.toFixed(2)}</strong>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FiTrendingUp /></div>
            <div className="stat-info">
              <span>Income</span>
              <strong className="income">+{currency === 'USD' ? '$' : '€'}{animateNumbers.income.toFixed(2)}</strong>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FiTrendingDown /></div>
            <div className="stat-info">
              <span>Expenses</span>
              <strong className="expense">-{currency === 'USD' ? '$' : '€'}{animateNumbers.expense.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card chart-card">
            <h3>Spending Trends</h3>
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="card chart-card">
            <h3>Expense Breakdown</h3>
            <div className="doughnut-container">
              {Object.keys(expenseByCategory).length > 0 ? (
                <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
              ) : (
                <div className="empty-state">No expense data for this month</div>
              )}
            </div>
          </div>
        </div>

        <div className="card recent-card">
          <div className="card-header">
            <h3>Recent Transactions</h3>
            <Link to="/transactions" className="view-all">View All <FiArrowRight /></Link>
          </div>
          <div className="transactions-list">
            {recentTransactions.map(t => {
              const cat = categories.find(c => c.id === t.category)
              return (
                <div key={t.id} className="transaction-item">
                  <div className="transaction-icon" style={{ background: cat?.color || '#ccc' }}>
                    {getIconComponent(cat?.icon)}
                  </div>
                  <div className="transaction-details">
                    <strong>{t.description}</strong>
                    <span>{t.date}</span>
                  </div>
                  <div className={`transaction-amount ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}{currency === 'USD' ? '$' : '€'}{t.amount.toFixed(2)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}