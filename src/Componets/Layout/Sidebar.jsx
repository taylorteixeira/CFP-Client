import { useState } from "react"
import { Link } from "react-router-dom"
import { BiSolidCategory } from "react-icons/bi"
import { MdDashboard, MdMenu, MdClose } from "react-icons/md"
import { FaExchangeAlt, FaCamera } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai" // Ícone de "i" para o FAQ
import { MdOutlineAddTask } from "react-icons/md" // Ícone para adicionar metas e limites
import TransactionModal from "../Private/TransactionModal" // Import the TransactionModal

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(true)

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <aside
      className={`bg-green-800 h-full shadow-lg fixed top-0 left-0 z-50 transition-all duration-300 ${
        isMinimized ? "w-20" : "w-52"
      }`}
    >
      <div className="p-6 pb-4 flex justify-between items-center">
        <h2
          className={`text-2xl font-bold text-white transition-all duration-300 ${
            isMinimized ? "hidden" : "block"
          }`}
        >
          Menu
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300 text-2xl"
        >
          {isMinimized ? <MdMenu /> : <MdClose />}
        </button>
      </div>

      {/* Linha horizontal abaixo do menu */}
      <hr className="border-t border-green-600 mx-4" />

      <nav className="mt-6 flex-grow">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-white hover:bg-green-600 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <MdDashboard className="text-2xl" />
              <span className={`${isMinimized ? "hidden" : "block"}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className="flex items-center space-x-2 text-white hover:bg-green-600 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <BiSolidCategory className="text-2xl" />
              <span className={`${isMinimized ? "hidden" : "block"}`}>
                Categorias
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/transaction"
              className="flex items-center space-x-2 text-white hover:bg-green-600 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <FaExchangeAlt className="text-2xl" />
              <span className="relative">
                {/* Bolinha amarela responsiva */}
                <span className="absolute top-0 right-0 h-2 w-2 sm:h-3 sm:w-3 bg-yellow-500 rounded-full"></span>
              </span>
              <span className={`${isMinimized ? "hidden" : "block"}`}>
                Transações
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/goals-limits"
              className="flex items-center space-x-2 text-white hover:bg-green-600 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <MdOutlineAddTask className="text-2xl" />
              <span className={`${isMinimized ? "hidden" : "block"}`}>
                Metas e Limites
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="https://facecut-suggestion.vercel.app/"
              className="flex items-center space-x-2 text-white hover:bg-green-600 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <FaCamera className="text-2xl" />
              <span className={`${isMinimized ? "hidden" : "block"}`}>
                Facecut
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Transaction Modal */}
      <TransactionModal />

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <Link to="/faqs" className="text-white hover:text-gray-300">
          <AiOutlineInfoCircle className="text-xl" />
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
