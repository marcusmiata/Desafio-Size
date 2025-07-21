//Componentes Internos
import Input from '../form/Input'
import Message from '../layout/Message'

//Bibliotecas externas
import { useState } from 'react'
import { Link } from 'react-router-dom'

//Função auxiliar
import { formatarCNPJVisual } from '../../utils/formatadores'

//Material UI
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function EmpresaLogin({ handleSubmit }) {
  const [cnpj, setCnpj] = useState()
  const [timer, setTimer] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!cnpj || cnpj.length < 14) {
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000);
      return
    }
    handleSubmit(cnpj)
    setCnpj('')
  }

  function handleChange(e) {
    const digitos = e.target.value.replace(/\D/g, '')
    if (digitos.length <= 14) {
      setCnpj(digitos)
      e.target.value = formatarCNPJVisual(digitos)
    } else {
      e.target.value = formatarCNPJVisual(cnpj)
    }
  }

  return (
    <form onSubmit={submit}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Input
          type="text"
          label="CNPJ"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          handleOnChange={handleChange}
        />
        <Button variant="contained" type='submit' sx={{ m: 2 }}>Entrar</Button>
      </Stack>
      {timer &&
        <Message
          type='error'
          text='Formato CNPJ inválido'
        />
      }

      <p>Empresa não cadastrada?</p>
      <Link to='/cadastrarEmpresa'>Cadastre-se</Link>
    </form>
  )
}

export default EmpresaLogin