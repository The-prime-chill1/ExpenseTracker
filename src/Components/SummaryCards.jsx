import React from 'react'
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi'
import './SummaryCards.css'

const SummaryCards = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  const balance = totalIncome - totalExpenses

  const cards = [
    {
      title: 'Total Income',
      value: `$${totalIncome.toFixed(2)}`,
      icon: FiTrendingUp,
      color: '#22c55e'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      icon: FiTrendingDown,
      color: '#ef4444'
    },
    {
      title: 'Balance',
      value: `$${balance.toFixed(2)}`,
      icon: FiDollarSign,
      color: balance >= 0 ? '#38bdf8' : '#ef4444'
    }
  ]

  return (
    <div className="summary-cards">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="summary-card" style={{ borderBottomColor: card.color }}>
            <div className="card-icon" style={{ background: `${card.color}20`, color: card.color }}>
              <Icon />
            </div>
            <div className="card-info">
              <span className="card-title">{card.title}</span>
              <span className="card-value">{card.value}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SummaryCards