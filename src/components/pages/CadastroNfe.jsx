//Contextos
import { useAuth } from '../AuthContext/AuthContext'
import { usePedido } from '../AuthContext/IdContext'

//Componentes locais
import NFeForm from '../NFe/NFeForm'

// Bibliotecas externas
import { differenceInDays } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

//Estilos
import styles from './CadastroNfe.module.css'


dayjs.locale('pt-br');

function CalculaPrazo(vencimento) {
  if (!vencimento) throw new Error('A data é obrigatória')

  const prazo = dayjs(vencimento, 'DD-MM-YYYY').toDate()

  if (isNaN(prazo.getTime())) throw new Error('Data inválida')

  return differenceInDays(prazo, new Date())
}

const calculaValorLiquido = (valor, prazo) => {
  return parseFloat(valor / (1 + 0.0465) ** (prazo / 30))
}

function CadastroNFe() {
  const navigate = useNavigate()

  const { user } = useAuth()
  const { idPedido, setPedidoId } = usePedido()

  const [isLoading, setIsLoading] = useState(false)

  const criarNfe = async (nfe) => {
    setIsLoading(true)

    try {
      const prazo = CalculaPrazo(nfe.vencimento)
      const valorLiquido = calculaValorLiquido(nfe.valor, prazo)

      const pedido = {
        empresa: user.empresa,
        cnpj: user.cnpj,
        limite: user.limite,
        notas_fiscais: [{
          numero: nfe.numero,
          valor_bruto: parseFloat(nfe.valor),
          valor_liquido: valorLiquido,
          vencimento: nfe.vencimento
        }],
        total_bruto: parseFloat(nfe.valor),
        total_liquido: valorLiquido
      }

      const response = await fetch('http://localhost:5000/pedidos', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
      })

      if (!response.ok) throw new Error("Falha ao criar o pedido")

      const data = await response.json()
      setPedidoId(data.id)
      navigate('/carrinho', {
        state: {
          message: 'Nota fiscal adicionada com sucesso',
          type: 'success'
        }
      })
    } catch (err) {
      console.error("Erro ao criar NFe: ", err)
      alert('Erro ao criar o pedido')
    } finally {
      setIsLoading(false)
    }
  }

  const buscaNotasCadastradas = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pedidos/${idPedido}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar notas deste pedido")
      }
      return await response.json()
    } catch (err) {
      console.error('Falha na busca', err)
      alert('Falha ao buscar notas do pedido')
      throw err
    }
  }

  const adicionaNfe = async (nfe) => {
    if (!idPedido) {
      alert("ID do pedido nao encontrado")
      return
    }

    setIsLoading(true)

    try {
      const prazo = CalculaPrazo(nfe.vencimento)
      const valorLiquido = calculaValorLiquido(nfe.valor, prazo)
      const notasAtuais = await buscaNotasCadastradas()

      const novasNotas = {
        notas_fiscais: [...notasAtuais.notas_fiscais, {
          numero: nfe.numero,
          valor_bruto: parseFloat(nfe.valor),
          valor_liquido: valorLiquido,
          vencimento: nfe.vencimento
        }],
        total_bruto: notasAtuais.total_bruto + parseFloat(nfe.valor),
        total_liquido: notasAtuais.total_liquido + valorLiquido
      }

      const response = await fetch(`http://localhost:5000/pedidos/${idPedido}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novasNotas)
      })

      if (!response.ok) throw new Error('Falha ao adicionar nova nota ao pedido')
      navigate('/carrinho', {
        state: {
          message: 'Nota fiscal adicionada com sucesso',
          type: 'success'
        }
      })
    } catch (err) {
      console.error('Erro na requisicao', err)
      navigate('/carrinho', {
        state: {
          message: 'Erro ao adicionar nota fiscal',
          type: 'error'
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tituloFormulario = !idPedido ? "Cadastre uma nota fiscal" : "Adicionar uma nota fiscal"
  const handleSubmit = !idPedido ? criarNfe : adicionaNfe
  return (
    <div className={styles.containerCadastro} aria-busy={isLoading}>
      <h1>{tituloFormulario}</h1>
      <NFeForm className={styles.containerFormulario} handleSubmit={handleSubmit} />
      {isLoading && <p>Processando...</p>}
    </div>
  )
}

export default CadastroNFe