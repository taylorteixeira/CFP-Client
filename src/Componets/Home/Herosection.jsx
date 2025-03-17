import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-green-50 py-24">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-green-200 opacity-30"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-green-300 opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-green-400 opacity-10"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
              Controle financeiro <span className="text-green-600">simplificado</span>
            </h1>
            <p className="text-xl text-green-700 mb-8 leading-relaxed">
              Gerencie suas finanças sem esforço e mantenha-se no controle de suas
              despesas com nossa plataforma intuitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200">
                  Comece Agora
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-white text-green-700 border border-green-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-colors">
                  Fazer Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
