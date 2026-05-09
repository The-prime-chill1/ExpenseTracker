import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { categories } from '../data/dummyData'
import './ExpenseChart.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const ExpenseChart = ({ transactions }) => {
  // Calculate spending by category
  const categorySpending = {}
  categories.forEach(cat => { categorySpending[cat] = 0 })
  
  transactions
    .filter(t => t.amount < 0)
    .forEach(transaction => {
      categorySpending[transaction.category] += Math.abs(transaction.amount)
    })

  const chartData = {
    labels: categories.filter(cat => categorySpending[cat] > 0),
    datasets: [
      {
        data: categories.filter(cat => categorySpending[cat] > 0).map(cat => categorySpending[cat]),
        backgroundColor: [
          '#38bdf8', '#818cf8', '#c084fc', '#f472b6',
          '#fb923c', '#facc15', '#4ade80', '#f87171'
        ],
        borderWidth: 2,
        borderColor: 'transparent',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim(),
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: $${value.toFixed(2)} (${percentage}%)`
          }
        }
      }
    }
  }

  const hasExpenses = transactions.some(t => t.amount < 0)

  return (
    <div className="expense-chart card">
      <h3>Spending by Category</h3>
      <div className="chart-container">
        {hasExpenses ? (
          <Pie data={chartData} options={options} />
        ) : (
          <div className="no-data">No expense data available</div>
        )}
      </div>
    </div>
  )
}

export default ExpenseChart