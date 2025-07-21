//Componentes internos
import EmpresaForm from '../Empresa/EmpresaForm'

//Contexto
import { useAuth } from '../AuthContext/AuthContext'

//Bibliotecas externas
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//Material UI
import Container from '@mui/material/Box';

//Estilos
import styles from './CadastroEmpresa.module.css'

function CadastroEmpresa() {
  const { isAuthenticated } = useAuth()

  const [loading, setLoading] = useState()

  const navigate = useNavigate()

  function calcularLimite(empresa) {
    const { faturamento, ramo } = empresa;
    if (faturamento < 50000)
      return 0.5 * faturamento
    if (faturamento < 100000)
      return ramo === 'Servicos' ? 0.55 * faturamento : 0.6 * faturamento
    return ramo === 'Servicos' ? 0.6 * faturamento : 0.65 * faturamento
  }

  async function criarEmpresa(empresa) {
    if (!empresa.empresa || !empresa.cnpj) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)
    try {
      const limite = calcularLimite(empresa)
      const response = await fetch('http://localhost:5000/empresas', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...empresa,
          limite
        })
      })
      if (!response.ok) throw new Error('Erro ao cadastrar empresa')

      const data = await response.json()
      navigate('/', {
        state: {
          message: `${empresa.empresa} cadastrada com sucesso`,
          type: 'success'
        }
      })
    } catch (err) {
      console.error("Erro:", err)
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated()) {
    navigate('/')
    return null
  }

  return (
    <Container className={styles.containerCadastro} sx={{ p: 5 }}>
      <EmpresaForm handleSubmit={criarEmpresa} loading={loading} />
    </Container>
  )
}

export default CadastroEmpresa