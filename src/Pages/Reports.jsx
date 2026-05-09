import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { format, eachMonthOfInterval } from 'date-fns'
import './Reports.css'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const Reports = ({ transactions }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  
  const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))].sort()
  
  const months = eachMonthOfInterval({
    start: new Date(selectedYear, 0, 1),
    end: new Date(selectedYear, 11, 31)
  })

  const monthlyData = months.map((month, index) => {
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate.getFullYear() === selectedYear && transactionDate.getMonth() === index
    })
    
    const income = monthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    return { income, expenses }
  })

  const chartData = {
    labels: months.map(date => format(date, 'MMM')),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(d => d.income),
        backgroundColor: '#22c55e',
        borderRadius: 8,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(d => d.expenses),
        backgroundColor: '#ef4444',
        borderRadius: 8,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim(),
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() }
      },
      x: {
        grid: { display: false },
        ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() }
      }
    }
  }

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const savings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0

  const exportReport = () => {
    const csvData = transactions.map(t => ({
      Date: t.date,
      Title: t.title,
      Category: t.category,
      Type: t.amount > 0 ? 'Income' : 'Expense',
      Amount: `$${Math.abs(t.amount).toFixed(2)}`
    }))
    
    const headers = Object.keys(csvData[0])
    const csvRows = [
      headers.join(','),
      ...csvData.map(row => headers.map(h => `"${row[h]}"`).join(','))
    ]
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expense-report-${selectedYear}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="reports">
      <div className="reports-header">
        <h1>Monthly Reports</h1>
        <div className="report-actions">
          <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button onClick={exportReport} className="export-btn">
            Export Report
          </button>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Total Income</span>
          <span className="stat-value income">${totalIncome.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Expenses</span>
          <span className="stat-value expense">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Net Savings</span>
          <span className={`stat-value ${savings >= 0 ? 'income' : 'expense'}`}>
            ${savings.toFixed(2)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Savings Rate</span>
          <span className="stat-value">{savingsRate}%</span>
        </div>
      </div>

      <div className="chart-container card">
        <h3>Monthly Income vs Expenses - {selectedYear}</h3>
        <div className="bar-chart-wrapper">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      <div className="recent-transactions card">
        <h3>Recent Transactions</h3>
        <div className="recent-list">
          {transactions.slice(0, 10).map(t => (
            <div key={t.id} className="recent-item">
              <div>
                <div className="recent-title">{t.title}</div>
                <div className="recent-date">{format(new Date(t.date), 'MMM dd, yyyy')}</div>
              </div>
              <div className={`recent-amount ${t.amount > 0 ? 'income' : 'expense'}`}>
                {t.amount > 0 ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports