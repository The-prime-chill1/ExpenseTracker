import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Bar, Line } from 'react-chartjs-2'
import { exportToPDF, exportToCSV } from '../utils/exportUtils'
import { FiFileText, FiBarChart2, FiAlertCircle, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'
import { FaLightbulb, FaChartLine, FaPiggyBank, FaBullseye } from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import '../styles/Reports.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Reports() {
  const { transactions, categories, currency } = useApp()
  const [reportType, setReportType] = useState('monthly')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const getReportData = () => {
    const filtered = transactions.filter(t => {
      const date = new Date(t.date)
      if (reportType === 'monthly') {
        return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      }
      return true
    })

    const income = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const savings = income - expense
    const savingsRate = income > 0 ? (savings / income) * 100 : 0

    const categoryData = {}
    filtered.filter(t => t.type === 'expense').forEach(t => {
      const cat = categories.find(c => c.id === t.category)
      if (cat) categoryData[cat.name] = (categoryData[cat.name] || 0) + t.amount
    })

    return { filtered, income, expense, savings, savingsRate, categoryData }
  }

  const { income, expense, savings, savingsRate, categoryData } = getReportData()

  const barData = {
    labels: Object.keys(categoryData),
    datasets: [{
      label: 'Spending by Category',
      data: Object.values(categoryData),
      backgroundColor: '#2563EB',
      borderRadius: 8,
    }]
  }

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Spending',
      data: [45, 32, 78, 23, 56, 120, 89],
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  }

  const handleExportPDF = () => {
    exportToPDF({ 
      income, 
      expense, 
      savings, 
      savingsRate,
      categoryData, 
      reportType, 
      currency 
    })
  }

  const handleExportCSV = () => {
    exportToCSV(transactions)
  }

  return (
    <div className="reports-page">
      <div className="container">
        <h1>Financial Reports</h1>
        
        <div className="report-controls">
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          {reportType === 'monthly' && (
            <>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>
              <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                {[2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}
          <button className="btn btn-outline" onClick={handleExportPDF}>
            <FiFileText /> Export PDF
          </button>
          <button className="btn btn-outline" onClick={handleExportCSV}>
            <FiBarChart2 /> Export CSV
          </button>
        </div>

        <div className="report-summary">
          <div className="summary-card">
            <span>Total Income</span>
            <strong className="income">+{currency === 'USD' ? '$' : '€'}{income.toFixed(2)}</strong>
          </div>
          <div className="summary-card">
            <span>Total Expenses</span>
            <strong className="expense">-{currency === 'USD' ? '$' : '€'}{expense.toFixed(2)}</strong>
          </div>
          <div className="summary-card">
            <span>Net Savings</span>
            <strong className={savings >= 0 ? 'income' : 'expense'}>
              {savings >= 0 ? '+' : '-'}{currency === 'USD' ? '$' : '€'}{Math.abs(savings).toFixed(2)}
            </strong>
          </div>
          <div className="summary-card">
            <span>Savings Rate</span>
            <strong>{savingsRate.toFixed(1)}%</strong>
          </div>
        </div>

        <div className="report-charts">
          <div className="chart-card">
            <h3>Spending by Category</h3>
            {Object.keys(categoryData).length > 0 ? (
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            ) : (
              <div className="empty-state">No expense data for this period</div>
            )}
          </div>
          <div className="chart-card">
            <h3>Weekly Spending Trend</h3>
            <Line data={weeklyData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="insights-card">
          <h3><FaLightbulb /> Financial Insights</h3>
          <ul>
            {savingsRate > 20 ? (
              <li><FiCheckCircle style={{ color: '#22C55E' }} /> Amazing! You're saving over 20% of your income. Keep up the great work!</li>
            ) : savingsRate > 10 ? (
              <li><FiTrendingUp style={{ color: '#F59E0B' }} /> Good progress! Try to reach 20% savings rate for better financial security.</li>
            ) : (
              <li><FaBullseye style={{ color: '#EF4444' }} /> Focus on increasing your savings rate. Even small amounts add up over time!</li>
            )}
            {Object.keys(categoryData).length > 0 && Object.entries(categoryData).sort((a,b) => b[1] - a[1])[0] && (
              <li><FaChartLine style={{ color: '#8B5CF6' }} /> Your largest expense category is <strong>{Object.entries(categoryData).sort((a,b) => b[1] - a[1])[0][0]}</strong>. Consider reviewing this spending.</li>
            )}
            <li><FaPiggyBank style={{ color: '#14B8A6' }} /> Track your progress monthly to build better financial habits.</li>
            {expense > income && (
              <li><FiAlertCircle style={{ color: '#EF4444' }} /> Your expenses exceed your income. Review your budget to avoid debt.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}