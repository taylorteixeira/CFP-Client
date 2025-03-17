import axios from "axios"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import string from "../../String"

// Fetch account summary data (balance, income, expenses)
const fetchAccountSummary = async () => {
  try {
    const { data } = await axios.get(`${string}/transaction/getTransaction`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })

    let balance = 0
    let income = 0
    let expense = 0

    data.transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += transaction.amount
        income += transaction.amount
      } else {
        balance -= transaction.amount
        expense += transaction.amount
      }
    })

    return { balance, income, expense }
  } catch (error) {
    console.error("Error fetching account summary:", error)
    return { balance: 0, income: 0, expense: 0 }
  }
}

const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${string}/category/getCategory`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Fetch recent transactions
const fetchRecentTransactions = async () => {
  try {
    const { data } = await axios.get(
      `${string}/transaction/getRecentTransactions`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    return data.transactions
  } catch (error) {
    console.error("Error fetching recent transactions:", error)
    return []
  }
}

// Fetch spending trend data
const fetchSpendingTrendsData = async () => {
  try {
    const { data } = await axios.get(`${string}/transaction/getTransaction`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })

    const trendsData = data.transactions.map((transaction) => ({
      date: new Date(transaction.date).toLocaleDateString("en-US", {
        month: "short",
      }),
      income: transaction.type === "income" ? transaction.amount : 0,
      expenses: transaction.type === "expense" ? transaction.amount : 0,
    }))

    return trendsData
  } catch (error) {
    console.error("Error fetching spending trends data:", error)
    return []
  }
}

const Dashboard = () => {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [spendingTrends, setSpendingTrends] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const summary = await fetchAccountSummary()
      setBalance(summary.balance)
      setIncome(summary.income)
      setExpense(summary.expense)

      const transactions = await fetchRecentTransactions()
      setRecentTransactions(transactions)

      const trendsData = await fetchSpendingTrendsData()
      setSpendingTrends(trendsData)

      const categoriesData = await fetchCategories() // Fetch categories
      setCategories(categoriesData)

      // Create category data for pie chart
      const categorySummary = categoriesData.map((category) => {
        const total = transactions
          .filter((transaction) => transaction.category === category._id)
          .reduce((acc, transaction) => acc + transaction.amount, 0)
        return { name: category.categoryName, value: total }
      })
      setCategoryData(categorySummary)
    }

    fetchData()
  }, [])

  // Create a lookup object for category names
  const categoryLookup = categories.reduce((acc, category) => {
    acc[category._id] = category.categoryName
    return acc
  }, {})

  return (
    <div className="p-6 m-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-green-800">Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
            Atualizado: {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
      
      {/* Resumo Financeiro em Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-green-200 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Saldo total</p>
            <p className="text-xl font-medium">R$ {balance}</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-green-200 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Renda total</p>
            <p className="text-xl font-medium text-green-600">R$ {income}</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-red-100 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Despesas totais</p>
            <p className="text-xl font-medium text-red-500">R$ {expense}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="p-6 rounded-lg shadow-sm bg-white border border-gray-100">
          <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-gray-100 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Transações recentes
          </h3>
          {recentTransactions.length > 0 ? (
            <ul className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <div>
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </span>
                    <p className="text-gray-700 font-medium">{transaction.description}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {categoryLookup[transaction.category] || "Dado Importado"}
                    </span>
                  </div>
                  <span
                    className={`font-medium ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}R$ {transaction.amount}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-4">Nenhuma transação recente</p>
          )}
        </div>

        {/* Spending Trends */}
        <div className="p-6 rounded-lg shadow-sm bg-white border border-gray-100">
          <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-gray-100 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Tendências de gastos
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={spendingTrends}>
              <defs>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Despesas"
                fillOpacity={1}
                fill="url(#colorExpense)"
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Receitas"
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
                formatter={(value) => [`R$ ${value}`, '']}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Legend verticalAlign="top" height={36}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Income and Expense Comparison */}
        <div className="p-6 rounded-lg shadow-sm bg-white border border-gray-100">
          <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-gray-100 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Receita vs Despesas
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={spendingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
                formatter={(value) => [`R$ ${value}`, '']}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="income" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Categories Pie Chart */}
        <div className="p-6 rounded-lg shadow-sm bg-white border border-gray-100 col-span-1 md:col-span-2">
          <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-gray-100 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Categorias de despesas
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  fill="#82ca9d"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value > 0 ? `hsl(${index * 45}, 70%, 60%)` : "#e5e7eb"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Valor']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500 mb-2">Nenhuma categoria de despesa encontrada</p>
              <p className="text-sm text-gray-400">Adicione categorias para visualizar seus gastos</p>
            </div>
          )}
        </div>
        
        {/* Resumo Financeiro */}
        <div className="p-6 rounded-lg shadow-sm bg-white border border-gray-100">
          <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-gray-100 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Resumo Financeiro
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxa de economia:</span>
              <span className="font-medium">
                {income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${income > 0 ? Math.min(((income - expense) / income * 100), 100) : 0}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600">Proporção de gastos:</span>
              <span className="font-medium">
                {income > 0 ? ((expense / income) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${expense/income > 0.7 ? 'bg-red-500' : 'bg-yellow-500'}`}
                style={{ width: `${income > 0 ? Math.min((expense / income * 100), 100) : 0}%` }}
              ></div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {expense/income > 0.7 
                  ? "Atenção: Seus gastos estão altos em relação à sua renda."
                  : expense/income > 0.5 
                    ? "Bom trabalho: Mantenha seus gastos controlados."
                    : "Excelente: Você está economizando bem!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
