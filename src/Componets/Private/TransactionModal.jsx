import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { FaPlus } from "react-icons/fa"
import string from "../../String"
import toast from "react-hot-toast"

const TransactionModal = () => {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesTransaction, setCategoriesTransaction] = useState([])
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false)
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false)
  const [editTransactionData, setEditTransactionData] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState([])

  const [filterCategory, setFilterCategory] = useState("")
  const [filterText, setFilterText] = useState("")
  const [amountRange, setAmountRange] = useState([])
  const [min, setMin] = useState(null)
  const [max, setMax] = useState(null)
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    date: new Date().toISOString().split("T")[0], // Today's date
    note: "",
    amount: "",
    currency: "BRL", // Default currency
    recurrence: "never", // Default recurrence
    end: null,
    remind: null,
    photo: null,
    transferTo: "",
    transferFrom: "",
  })

  const formRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategoriesForTransaction()
      await fetchTransactions()
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (formData.type) {
      fetchCategories()
    }
  }, [formData.type])

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`${string}/transaction/getTransaction`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      const adjustedTransactions = data.transactions.map((transaction) => ({
        ...transaction,
        amount:
          transaction.type === "income"
            ? transaction.amount
            : -transaction.amount,
      }))
      setTransactions(adjustedTransactions)
      const amounts = adjustedTransactions.map((t) => t.amount)
      const minAmount = Math.min(...amounts)
      const maxAmount = Math.max(...amounts)
      setMin(minAmount)
      setMax(maxAmount)
      setAmountRange([minAmount, maxAmount])
      setFilteredTransactions(adjustedTransactions) // Initialize filtered transactions
    } catch (error) {
      console.error("Error fetching transactions:", error)
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
      setCategories(
        data.filter((category) => category.categoryType === formData.type)
      )
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchCategoriesForTransaction = async () => {
    try {
      const { data } = await axios.get(`${string}/category/getCategory`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      setCategoriesTransaction(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddTransaction = async () => {
    try {
      const { data } = await axios.post(
        `${string}/transaction/addTransaction`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message)
      fetchTransactions()
      setFormData({})
      setShowAddTransactionForm(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowAddTransactionForm(false)
      setShowEditTransactionForm(false)
      setShowDeleteConfirmation(false)
      setFormData({})
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (editTransactionData) {
    }
  }, [editTransactionData])

  useEffect(() => {}, [formData])

  const handleFilterChange = () => {
    const filtered = transactions.filter((transaction) => {
      const matchesCategory = filterCategory
        ? transaction.category === filterCategory
        : true
      const matchesText = filterText
        ? transaction.note.includes(filterText)
        : true
      const matchesAmount =
        transaction.amount >= amountRange[0] &&
        transaction.amount <= amountRange[1]
      return matchesCategory && matchesText && matchesAmount
    })
    setFilteredTransactions(filtered)
  }

  useEffect(() => {
    if (
      filterCategory === "" &&
      filterText === "" &&
      amountRange[0] === min &&
      amountRange[1] === max
    ) {
      setFilteredTransactions(transactions)
    } else {
      handleFilterChange()
    }
  }, [filterCategory, filterText, amountRange, transactions])

  useEffect(() => {
    if (transactions.length) {
      const amounts = transactions.map((t) => t.amount)
      const minAmount = Math.min(...amounts)
      const maxAmount = Math.max(...amounts)
      setMin(minAmount)
      setMax(maxAmount)
      setAmountRange([minAmount, maxAmount])
      setFilteredTransactions(transactions) // Set filtered transactions initially
    }
  }, [transactions])

  return (
    <div className="">
      <div className="bottom-0 p-4 mt-12">
        <button
          onClick={() => setShowAddTransactionForm(true)} // Open transaction modal on click
          className="w-full flex items-center justify-center text-white bg-green-600 hover:bg-green-500 p-3 rounded-lg transition-all duration-300"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {showAddTransactionForm && (
        <div
          ref={formRef}
          className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Adicionar transação</h3>
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option defaultValue={true}>Selecione</option>
                  <option value="expense">Despesa</option>
                  <option value="income">Ganhos</option>
                  {/* <option value="transfer">Transfer</option> */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Data
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            {formData.type !== "transfer" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Selecione a categoria</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.type === "transfer" && (
              <>
                <div className="flex justify-between">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Transferir para
                    </label>
                    <select
                      name="transferTo"
                      value={formData.transferTo}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Select User</option>
                      {/* {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Transferir de
                    </label>
                    <select
                      name="transferFrom"
                      value={formData.transferFrom}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Selecione o usuário</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nota
              </label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantidade
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Valor
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="BLR">BRL</option>
                  <option value="USD">USD</option>
                  {/* Add more currency options as needed */}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Recorrencia
              </label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              >
                <option value="never">Nunca</option>
                <option value="oneD">Um dia</option>
                <option value="twoD">Dois dias</option>
                <option value="workD">Dias úteis</option>
                <option value="oneW">Uma semana</option>
                <option value="twoW">Duas semanas</option>
                <option value="fourW">Quatro semanas</option>
                <option value="oneM">Um mês</option>
                <option value="twoM">Dois meses</option>
                <option value="threeM">Três meses</option>
                <option value="sixM">Seis meses</option>
                <option value="oneY">Um ano</option>
              </select>
            </div>
            {formData.recurrence !== "never" ? (
              <>
                <div className="flex justify-between">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Data de término
                    </label>
                    <input
                      type="date"
                      name="end"
                      value={formData.end}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Lembrar data
                    </label>
                    <input
                      type="date"
                      name="remind"
                      value={formData.remind}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
              </>
            ) : null}
            <div className="flex justify-end">
              <button
                onClick={handleAddTransaction}
                className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700 mr-2"
              >
                Adicionar
              </button>
              <button
                onClick={() => setShowAddTransactionForm(false)}
                className="bg-red-600 px-5 py-3 rounded-3xl text-white hover:bg-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionModal
