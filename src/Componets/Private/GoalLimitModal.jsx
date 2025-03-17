import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import string from "../../String"
import { MdEdit } from "react-icons/md"
import moment from "moment"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts"

const GoalLimit = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [goalsLimits, setGoalsLimits] = useState([])
  const [formData, setFormData] = useState({})
  const [transactions, setTransactions] = useState([])
  const [showAddGoalLimitForm, setShowAddGoalLimitForm] = useState(false)
  const [showEditGoalLimitForm, setShowEditGoalLimitForm] = useState(false)
  const [editGoalLimitData, setEditGoalLimitData] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    fetchGoalsLimits()
    fetchTransactions()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const fetchGoalsLimits = async () => {
    try {
      const { data } = await axios.get(`${string}/meta/goals-limits`, {
        withCredentials: true,
      })
      setGoalsLimits(data.goalLimits)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleAddGoalLimit = async () => {
    try {
      const { data } = await axios.post(
        `${string}/meta/goals-limits`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message)
      fetchGoalsLimits()
      setFormData({})
      setShowAddGoalLimitForm(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleEditGoalLimit = async () => {
    try {
      const { data } = await axios.put(
        `${string}/meta/goals-limits/${editGoalLimitData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message)
      fetchGoalsLimits()
      setFormData({})
      setEditGoalLimitData(null)
      setShowEditGoalLimitForm(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowAddGoalLimitForm(false)
      setShowEditGoalLimitForm(false)
      setFormData({})
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleEditButtonClick = (goalLimit) => {
    setFormData({ goal: goalLimit.goal, limit: goalLimit.limit })
    setEditGoalLimitData(goalLimit)
    setShowEditGoalLimitForm(true)
  }

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`${string}/transaction/getTransaction`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      setTransactions(data.transactions)
    } catch (error) {
      toast.error("Erro ao buscar transações.")
    }
  }

  const chartData = goalsLimits.map((goalLimit) => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0)
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0)

    return {
      name: `Meta ${goalLimit.goal} / Limite ${goalLimit.limit}`,
      ganho: totalIncome,
      despesa: totalExpenses,
      meta: goalLimit.goal,
      limite: goalLimit.limit,
    }
  })

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-800">
            Metas e Limites
          </h2>
          {goalsLimits.length === 0 && (
            <button
              onClick={() => setShowAddGoalLimitForm(true)}
              className="bg-green-700 px-4 py-2 rounded-md text-white hover:bg-green-600 transition-colors flex items-center gap-2 text-sm"
            >
              <span>+</span> Adicionar Meta e Limite
            </button>
          )}
        </div>

        {showAddGoalLimitForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              ref={formRef}
              className="bg-white p-6 rounded-lg shadow-lg mx-auto w-96 max-w-md"
            >
              <h3 className="mb-4 text-xl font-medium text-green-800 border-b border-green-100 pb-2">
                Adicionar Meta e Limite
              </h3>
              <div className="flex flex-col space-y-4 mb-4">
                <div>
                  <label
                    htmlFor="goal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Meta (Ganhos)
                  </label>
                  <input
                    type="number"
                    id="goal"
                    placeholder="Meta"
                    value={formData.goal || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="limit"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Limite (Gastos)
                  </label>
                  <input
                    type="number"
                    id="limit"
                    placeholder="Limite"
                    value={formData.limit || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowAddGoalLimitForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddGoalLimit}
                    className="bg-green-700 px-4 py-2 rounded-md text-white hover:bg-green-600"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {goalsLimits.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-green-100 pb-2">
                  Metas (Ganhos)
                </h3>
                <div className="flex flex-col space-y-3">
                  {goalsLimits.map((goalLimit) => (
                    <div
                      key={goalLimit._id}
                      className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div>
                        <span className="text-green-800 text-lg font-medium">
                          R$ {goalLimit.goal}
                        </span>
                        <p className="text-gray-500 text-xs">
                          Atualizado:{" "}
                          {moment(goalLimit.updatedAt).format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditButtonClick(goalLimit)}
                        className="text-green-700 hover:text-green-600 p-2 rounded-full hover:bg-green-200 transition-colors"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-green-100 pb-2">
                  Limites (Gastos)
                </h3>
                <div className="flex flex-col space-y-3">
                  {goalsLimits.map((goalLimit) => (
                    <div
                      key={goalLimit._id}
                      className="flex justify-between items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <div>
                        <span className="text-red-800 text-lg font-medium">
                          R$ {goalLimit.limit}
                        </span>
                        <p className="text-gray-500 text-xs">
                          Atualizado:{" "}
                          {moment(goalLimit.updatedAt).format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditButtonClick(goalLimit)}
                        className="text-red-700 hover:text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-green-100 pb-2">
                  Comparação de Metas e Transações
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="ganho"
                      name="Ganhos"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="despesa"
                      name="Despesas"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      dataKey="meta"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      name="Meta"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="limite"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                      name="Limite"
                      activeDot={{ r: 8 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-4 border-b border-green-100 pb-2">
                  Progresso em Relação às Metas
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ganho"
                      name="Ganhos Atuais"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="meta"
                      name="Meta"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#3b82f6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="despesa"
                      name="Despesas Atuais"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ fill: "#ef4444", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="limite"
                      name="Limite"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#f59e0b", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white p-10 rounded-lg shadow-sm border border-green-100 text-center">
            <p className="text-gray-600 mb-4">
              Nenhuma meta ou limite encontrado. Defina suas metas financeiras
              para acompanhar seu progresso.
            </p>
            <button
              onClick={() => setShowAddGoalLimitForm(true)}
              className="bg-green-700 px-4 py-2 rounded-md text-white hover:bg-green-600 transition-colors"
            >
              Adicionar Meta e Limite
            </button>
          </div>
        )}

        {/* Formulário para editar Meta e Limite */}
        {showEditGoalLimitForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              ref={formRef}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h3 className="mb-4 text-xl font-medium text-green-800 border-b border-green-100 pb-2">
                Editar Meta e Limite
              </h3>
              <div className="flex flex-col space-y-4 mb-4">
                <div>
                  <label
                    htmlFor="goal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Meta (Ganhos)
                  </label>
                  <input
                    type="number"
                    id="goal"
                    placeholder="Meta"
                    value={formData.goal || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="limit"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Limite (Gastos)
                  </label>
                  <input
                    type="number"
                    id="limit"
                    placeholder="Limite"
                    value={formData.limit || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowEditGoalLimitForm(false)
                      setEditGoalLimitData(null)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleEditGoalLimit}
                    className="bg-green-700 px-4 py-2 rounded-md text-white hover:bg-green-600"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GoalLimit
