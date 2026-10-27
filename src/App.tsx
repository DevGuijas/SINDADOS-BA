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

function Accordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section>
      <h2>Acordeão</h2>
      {faqs.map((item, index) => (
        <div className="accordion-item" key={item.question}>
          <button
            aria-expanded={open === index}
            onClick={() => setOpen(open === index ? null : index)}
            type="button"
          >
            {item.question}
          </button>
          {open === index && <p>{item.answer}</p>}
        </div>
      ))}
    </section>
  )
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
}) {
  return (
    <section>
      <h2>Paginação</h2>
      <button disabled={page === 1} onClick={() => onChange(page - 1)} type="button">
        Anterior
      </button>{' '}
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
        <button
          aria-current={page === number ? 'page' : undefined}
          key={number}
          onClick={() => onChange(number)}
          type="button"
        >
          {number}
        </button>
      ))}{' '}
      <button
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        type="button"
      >
        Próxima
      </button>
    </section>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <section>
      <h2>Barra de progresso</h2>
      <progress aria-label="Progresso da atividade" max={100} value={value} />{' '}
      {value}%
    </section>
  )
}

function Tabs() {
  const [active, setActive] = useState(0)
  const contents = [
    'Representação dos trabalhadores da categoria.',
    'Acompanhamento das negociações coletivas.',
    'Informação e orientação sindical.',
  ]
  const labels = ['Representação', 'Negociação', 'Orientação']

  return (
    <section>
      <h2>Abas</h2>
      <div role="tablist" aria-label="Atuação sindical">
        {labels.map((label, index) => (
          <button
            aria-selected={active === index}
            id={`tab-${index}`}
            key={label}
            onClick={() => setActive(index)}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <p aria-labelledby={`tab-${active}`} role="tabpanel">
        {contents[active]}
      </p>
    </section>
  )
}

function Dropdown({
  category,
  onChange,
}: {
  category: string
  onChange: (category: string) => void
}) {
  return (
    <section>
      <h2>Menu suspenso</h2>
      <label htmlFor="category">Filtrar pautas: </label>
      <select
        id="category"
        onChange={(event) => onChange(event.target.value)}
        value={category}
      >
        <option value="Todas">Todas</option>
        <option value="Direitos">Direitos</option>
        <option value="Negociação">Negociação</option>
        <option value="Formação">Formação</option>
      </select>
    </section>
  )
}

function Toast({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 3000)
    return () => window.clearTimeout(timeout)
  }, [onClose])

  return (
    <div aria-live="polite" className="toast" role="status">
      Mensagem de exemplo: ação realizada.
      <button aria-label="Fechar notificação" onClick={onClose} type="button">
        Fechar
      </button>
    </div>
  )
}

function App() {
  const [category, setCategory] = useState('Todas')
  const [page, setPage] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const pageSize = 2
  const filteredNews =
    category === 'Todas' ? news : news.filter((item) => item.category === category)
  const pageCount = Math.max(1, Math.ceil(filteredNews.length / pageSize))
  const visibleNews = filteredNews.slice((page - 1) * pageSize, page * pageSize)

  function changeCategory(value: string) {
    setCategory(value)
    setPage(1)
  }

  return (
    <main>
      <h1>SINDADOS-BA</h1>
      <p>Trabalhadores em processamento de dados da Bahia.</p>
      <hr />

      <Accordion />

      <section>
        <h2>Pautas</h2>
        <Dropdown category={category} onChange={changeCategory} />
        <ul>
          {visibleNews.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ul>
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </section>

      <ProgressBar value={60} />
      <Tabs />

      <section>
        <h2>Notificação toast</h2>
        <button onClick={() => setShowToast(true)} type="button">
          Mostrar notificação
        </button>
      </section>

      {showToast && <Toast onClose={() => setShowToast(false)} />}
    </main>
  )
}

export default App
