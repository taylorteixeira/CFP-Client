const Features = () => {
  const featuresList = [
    {
      title: "Controle financeiro centralizado",
      description: "Conecte suas contas de mais de 17.000 instituições financeiras e visualize suas transações em um só lugar.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      image: "/OIG5.jpeg"
    },
    {
      title: "Orçamentos e metas personalizados",
      description: "Defina orçamentos mensais e acompanhe seus gastos para garantir que você se mantenha no caminho certo com suas metas financeiras.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      image: "/OIG4.jpeg"
    },
    {
      title: "Análise detalhada de gastos",
      description: "Obtenha insights sobre seus padrões de gastos com relatórios detalhados e gráficos visuais para tomar decisões financeiras informadas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      image: "/OIG6.jpeg"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            Recursos que transformam suas finanças
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma oferece ferramentas poderosas para ajudar você a gerenciar seu dinheiro de forma eficiente.
          </p>
        </div>
        
        <div className="space-y-24">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
            >
              <div className="w-full md:w-1/2">
                <div className="bg-green-50 p-6 rounded-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-xl w-full h-auto object-cover shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/e6f7ec/166534?text=Recurso+${index+1}`;
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
