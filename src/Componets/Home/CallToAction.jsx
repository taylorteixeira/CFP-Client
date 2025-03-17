import { Link } from "react-router-dom"

const CallToAction = () => {
  return (
    <div className="bg-green-700 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Comece a transformar suas finanças hoje
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Junte-se a milhares de usuários que estão gerenciando melhor suas
                finanças e alcançando seus objetivos financeiros com o CFB.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cadastro gratuito em menos de 2 minutos</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Acesso a todas as ferramentas de controle financeiro</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Suporte dedicado para ajudar em sua jornada</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <button className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition-colors shadow-md">
                    Criar conta grátis
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-white text-green-700 border border-green-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-colors">
                    Fazer Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
