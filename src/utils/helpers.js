export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export const getCurrentMonthYear = () => {
  const date = new Date()
  return { month: date.getMonth(), year: date.getFullYear() }
}