//Contexto
import { useAuth } from '../AuthContext/AuthContext'
import { usePedido } from '../AuthContext/IdContext'
import { useLocation } from 'react-router-dom'
//Componentes internos
import CardNota from '../NFe/CardNota'
import LinkButton from '../layout/LinkButton'
import Modal from '../layout/Modal'
import Message from '../layout/Message'

//Bibliotecas externas
import { useEffect, useState } from 'react'

//Material UI
import { Box } from '@mui/material'

import styles from './Carrinho.module.css'

function Carrinho() {
  const { user } = useAuth()
  const { idPedido, clearPedidoId } = usePedido()

  const [notas, setNotas] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isBelow, setIsBelow] = useState(true)
  const [text, setText] = useState('')
  const [timer, setTimer] = useState(false)
  const [type, setType] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (location.state?.message) {
      setText(location.state.message)
      setType(location.state.type)
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 5000)
    }
    if (!idPedido) return

    const fetchPedido = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(`http://localhost:5000/pedidos/${idPedido}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('Falha ao carregar pedido')

        const data = await response.json()
        setNotas(data)
        setIsBelow(data.total_bruto < data.limite)
      } catch (err) {
        console.error("Erro ao buscar pedido")
        alert(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPedido()
  }, [])

  const removerPedido = async () => {
    if (!idPedido) return

    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5000/pedidos/${idPedido}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Falha ao remover pedido')
      clearPedidoId()
      setNotas(null)
      setText('Carrinho esvaziado')
      setType('success')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
    } catch (err) {
      console.error("Erro ao remover pedido")
      alert('Erro ao remover pedido')
    } finally {
      setIsLoading(false)
    }
  }

  const removerNota = async (index) => {
    if (!notas || !idPedido) return

    try {
      setIsLoading(true)
      const nota = notas.notas_fiscais[index]
      const novasNotas = notas.notas_fiscais.filter((_, i) => i !== index)

      if (novasNotas.length === 0) {
        await removerPedido()
        return
      }

      const novosDados = {
        notas_fiscais: novasNotas,
        total_bruto: notas.total_bruto - nota.valor_bruto,
        total_liquido: notas.total_liquido - nota.valor_liquido
      }

      const response = await fetch(`http://localhost:5000/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novosDados)
      })

      if (!response.ok) {
        throw new Error('Falha ao atualizar carrinho')
      }

      const data = await response.json()
      setNotas(data)
      setIsBelow(data.total_bruto < data.limite)
      setText('Sucesso ao remover nota')
      setType('success')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
    } catch (err) {
      console.error("Erro ao remover nota")
      alert("Erro ao remover nota")
    } finally {
      setIsLoading(false)
    }
  }

  const formato = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  return (
    <main>
      {timer &&
        <Message
          text={text}
          type={type}
        />
      }
      {!isBelow &&
        <Message
          text="Você ultrapassou seu limite para antecipação, por favor remova alguma nota fiscal"
          type='warning'
        />
      }
      {notas ? (
        <div className={styles.centro} aria-busy={isLoading}>

          <header className={styles.headerCarrinho}>
            <h1>{user.empresa}</h1>
            <p>Seu limite:<span >{formato(notas.limite)}</span></p>
            <p>Total das notas:<span>{formato(notas.total_bruto)}</span></p>
            <p>Total que você receberá:<span className={(!isBelow) ? styles.vermelho : styles.verde}>{formato(notas.total_liquido)}</span></p>
          </header>

          <Box className={styles.containerNotas} component='section' sx={{ bgcolor: 'background.container' }}>
            {notas.notas_fiscais.length > 0 ? (
              notas.notas_fiscais.map((nota, index) => (
                <CardNota
                  key={index}
                  index={index}
                  numero={nota.numero}
                  valor={formato(nota.valor_liquido)}
                  valorBruto={formato(nota.valor_bruto)}
                  data={nota.vencimento}
                  handleRemove={removerNota}
                  disabled={isLoading}
                />
              ))) : (
              <p>Nenhuma Nota fiscal encontrada</p>
            )}
          </Box>

          <Modal
            title="Parabéns"
            value={formato(notas.total_liquido)}
            total={formato(notas.total_bruto)}
            handleAcept={removerPedido}
            textButton="Simular"
            disabled={!isBelow}
          />
        </div>
      ) : (
        <section className={styles.vazio}>
          <h2>Carrinho vazio</h2>
          <p>Adicione notas fiscais para começar</p>
          <LinkButton
            text="Adicionar"
            to="/cadastrarNfe"
          />
        </section>
      )}
    </main>
  )
}

export default Carrinho