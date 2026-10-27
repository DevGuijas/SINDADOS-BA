import { useEffect, useState } from 'react'
import './App.css'

const news = [
  { title: 'Direitos dos trabalhadores', category: 'Direitos' },
  { title: 'Negociação coletiva', category: 'Negociação' },
  { title: 'Formação profissional', category: 'Formação' },
  { title: 'Participação sindical', category: 'Direitos' },
]

const faqs = [
  {
    question: 'O que é o SINDADOS-BA?',
    answer: 'É o sindicato dos trabalhadores em processamento de dados da Bahia.',
  },
  {
    question: 'Como acompanhar as pautas da categoria?',
    answer: 'Acompanhe as informações e participe das atividades do sindicato.',
  },
]

export default App
