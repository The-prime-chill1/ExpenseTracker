export const exportToPDF = (data) => {
  const reportHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mr. Chills Financial Report</title>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          color: #0F172A;
          background: white;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #2563EB;
        }
        .logo {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #2563EB, #38BDF8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 10px;
        }
        h1 {
          font-size: 24px;
          margin: 10px 0;
          color: #0F172A;
        }
        .report-date {
          color: #64748B;
          font-size: 12px;
          margin-top: 5px;
        }
        .summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin: 30px 0;
        }
        .summary-card {
          background: #F8FAFC;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #E2E8F0;
        }
        .summary-card span {
          display: block;
          font-size: 12px;
          color: #64748B;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .summary-card strong {
          font-size: 24px;
          font-weight: 700;
        }
        .income { color: #22C55E; }
        .expense { color: #EF4444; }
        .section {
          margin: 30px 0;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #0F172A;
          border-left: 4px solid #2563EB;
          padding-left: 12px;
        }
        .category-item {
          margin: 12px 0;
        }
        .category-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .progress-bar {
          background: #E2E8F0;
          border-radius: 8px;
          overflow: hidden;
          height: 8px;
        }
        .progress-fill {
          background: #2563EB;
          height: 100%;
          border-radius: 8px;
          transition: width 0.3s ease;
        }
        .insights {
          background: #F1F5F9;
          padding: 20px;
          border-radius: 12px;
          margin: 30px 0;
        }
        .insights h3 {
          margin-bottom: 15px;
          font-size: 16px;
        }
        .insights ul {
          list-style: none;
          padding-left: 0;
        }
        .insights li {
          padding: 8px 0;
          color: #334155;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
          font-size: 11px;
          color: #94A3B8;
        }
        @media print {
          body {
            padding: 20px;
          }
          .summary-card {
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">❄️ Mr. Chills</div>
        <h1>${data.reportType.toUpperCase()} Financial Report</h1>
        <div class="report-date">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      
      <div class="summary">
        <div class="summary-card">
          <span>Total Income</span>
          <strong class="income">${data.currency === 'USD' ? '$' : '€'}${data.income.toFixed(2)}</strong>
        </div>
        <div class="summary-card">
          <span>Total Expenses</span>
          <strong class="expense">${data.currency === 'USD' ? '$' : '€'}${data.expense.toFixed(2)}</strong>
        </div>
        <div class="summary-card">
          <span>Net Savings</span>
          <strong class="${data.savings >= 0 ? 'income' : 'expense'}">${data.savings >= 0 ? '+' : '-'}${data.currency === 'USD' ? '$' : '€'}${Math.abs(data.savings).toFixed(2)}</strong>
        </div>
        <div class="summary-card">
          <span>Savings Rate</span>
          <strong>${data.savingsRate?.toFixed(1) || '0'}%</strong>
        </div>
      </div>
      
      ${Object.keys(data.categoryData || {}).length > 0 ? `
      <div class="section">
        <div class="section-title">📊 Spending by Category</div>
        ${Object.entries(data.categoryData).map(([cat, amt]) => {
          const percentage = data.expense > 0 ? (amt / data.expense) * 100 : 0
          return `
            <div class="category-item">
              <div class="category-header">
                <strong>${cat}</strong>
                <span>${data.currency === 'USD' ? '$' : '€'}${amt.toFixed(2)} (${percentage.toFixed(1)}%)</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%;"></div>
              </div>
            </div>
          `
        }).join('')}
      </div>
      ` : ''}
      
      <div class="insights">
        <h3>💡 Financial Insights</h3>
        <ul>
          ${(data.savingsRate || 0) > 20 ? 
            '<li>✅ Excellent work! You\'re saving over 20% of your income. This puts you on a strong path to financial freedom.</li>' : 
            (data.savingsRate || 0) > 10 ?
            '<li>📈 Good progress! You\'re saving over 10% of your income. Try to reach 20% for even better financial security.</li>' :
            '<li>🎯 Focus on building your savings. Even saving 5-10% of your income can make a big difference over time.</li>'
          }
          ${Object.keys(data.categoryData || {}).length > 0 ? 
            `<li>🎯 Your largest expense is <strong>${Object.entries(data.categoryData).sort((a,b) => b[1] - a[1])[0][0]}</strong>. Reviewing this category could help optimize your spending.</li>` : 
            ''
          }
          <li>📊 Track your progress monthly to build better financial habits and reach your goals faster.</li>
          ${data.expense > data.income ? 
            '<li>⚠️ Your expenses exceed your income. Consider reviewing your budget to avoid accumulating debt.</li>' : 
            ''
          }
        </ul>
      </div>
      
      <div class="footer">
        <p>© 2024 Mr. Chills - Smart Expense Tracking</p>
        <p>This report was generated automatically. Keep tracking to achieve your financial goals!</p>
      </div>
    </body>
    </html>
  `
  
  // Create a blob and open in new window for printing/saving as PDF
  const blob = new Blob([reportHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const printWindow = window.open(url, '_blank', 'width=800,height=600')
  
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print()
      // Optional: Close the window after printing (user may want to keep it)
      // printWindow.onafterprint = () => printWindow.close()
    }
  } else {
    alert('Please allow pop-ups to export PDF')
  }
  
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Amount', 'Type', 'Category ID']
  const rows = transactions.map(t => [
    t.date,
    t.description,
    t.amount,
    t.type,
    t.category
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => {
      // Handle commas and quotes in cells
      const cellStr = String(cell)
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`
      }
      return cellStr
    }).join(','))
    .join('\n')
  
  // Add BOM for UTF-8 encoding to handle special characters
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `mrchills_transactions_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}