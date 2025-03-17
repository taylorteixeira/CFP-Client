import { useState } from "react"

const Faqs = () => {
  const faqs = [
    {
      question: "Como o CFB protege meus dados financeiros?",
      answer:
        "Utilizamos criptografia de ponta a ponta e seguimos os mais rigorosos padrões de segurança da indústria. Seus dados financeiros nunca são armazenados em nossos servidores sem criptografia, e você tem controle total sobre quais informações compartilha conosco.",
    },
    {
      question: "Posso conectar minhas contas bancárias ao CFB?",
      answer:
        "Sim! O CFB se integra com mais de 17.000 instituições financeiras globalmente. Nosso processo de conexão é seguro e você pode sincronizar suas transações automaticamente para um controle financeiro sem esforço.",
    },
    {
      question: "O CFB é gratuito para usar?",
      answer:
        "Oferecemos um plano básico gratuito que inclui todas as funcionalidades essenciais para gerenciamento financeiro pessoal. Também temos planos premium com recursos avançados para quem deseja um controle financeiro ainda mais detalhado.",
    },
    {
      question: "Como posso entrar em contato com o suporte ao cliente?",
      answer:
        "Nossa equipe de suporte está disponível 24/7 através do chat no aplicativo, e-mail ou telefone. Nosso tempo médio de resposta é de menos de 2 horas para todos os canais de atendimento.",
    },
    {
      question: "Posso exportar meus dados financeiros do CFB?",
      answer:
        "Sim, você pode exportar seus dados em vários formatos, incluindo PDF, CSV e Excel. Isso facilita a criação de relatórios personalizados ou o compartilhamento de informações com seu contador ou consultor financeiro.",
    },
  ]

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Encontre respostas para as dúvidas mais comuns sobre o CFB
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-green-100 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-green-50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium text-green-800">{faq.question}</h3>
                <svg 
                  className={`h-5 w-5 text-green-600 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-green-50 border-t border-green-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-green-700 hover:text-green-600 font-medium"
          >
            Entre em contato com nossa equipe
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Faqs
