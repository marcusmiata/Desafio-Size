//Componentes internos
import EmpresaLogin from "../Empresa/EmpresaLogin"
import Message from '../layout/Message'

//Bibliotecas Externas
import { useAuth } from '../AuthContext/AuthContext'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

//Estilos
import styles from './Home.module.css'


function Home() {

  const { login, user } = useAuth()
  const [timer, setTimer] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message)
      setType(location.state.type)
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 5000)
    }
  }, [])

  const entrar = async (cnpj) => {
    try{
      const response = await fetch(`http://localhost:5000/empresas?cnpj=${cnpj}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.length > 0) {
        const empresa = data[0]
        const userData = {
          empresa: empresa.empresa,
          cnpj: empresa.cnpj,
          limite: empresa.limite
        }
        login(userData)
        navigate('/cadastrarNfe')
      } else {
        setMessage('Empresa deste CNPJ não está cadastrada')
        setType('error')
        setTimer(true)
        setTimeout(() => {
          setTimer(false)
        }, 3000)
      }
    } catch(err)  {
      throw new Error(err)
    }
  }

  return (
    <>{!user ? (
      <div className={styles.containerCadastro}>
        <h1>Entrar</h1>
        <EmpresaLogin handleSubmit={entrar} />
        {timer &&
          <Message
            text={message}
            type={type}
          />}
      </div>
    ) : (
      <div className={styles.containerCadastro}>
        <h1>Dados da empresa</h1>
        <p>Empresa:<span>{user.empresa}</span></p>
        <p>CNPJ:</p><span>{user.cnpj}</span>
        <p>Limite: <span>{user.limite}</span> </p>
      </div>

    )}

    </>

  )
}

export default Home