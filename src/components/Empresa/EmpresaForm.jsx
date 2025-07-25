//Componentes internos
import Input from '../form/Input'
import SelectCustomizado from '../form/Select'
import Message from '../layout/Message'

//Bibliotecas externas
import { useState } from 'react'

//Auxiliares
import { formatarCNPJVisual } from '../../utils/formatadores'

//Material UI
import Button from '@mui/material/Button'

function EmpresaForm({handleSubmit, loading}){
  const [empresa, setEmpresa] = useState({faturamento: 1000})
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState(false)


  const ramos = ["Produtos", "Servicos"]

  const submit = (e) => {
    e.preventDefault()
    if(empresa.faturamento < 1000){
      setMessage('O faturamento minímo para se cadastrar é R$1000,00')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
      return
    }
    if(!empresa.empresa || !empresa.cnpj || !empresa.faturamento || !empresa.ramo ){
      setMessage('O ramo também precisa ser escolhido')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
      return
    }
    if(empresa.cnpj.length < 14){
      alert("Formato de CNPJ inválido")
      return
    }
    handleSubmit(empresa)
  }

  function handleChange(e){
    const { name, value } = e.target

    if(name === 'cnpj'){
      const digitos = value.replace(/\D/g, '').slice(0, 14)

      e.target.value = formatarCNPJVisual(digitos)
      setEmpresa({...empresa, [name]: digitos})
      return
    }
    setEmpresa({...empresa, [name]: value})
  }

  return (
    <form onSubmit={submit}>
    <h2>Cadastre sua empresa</h2>
    <Input 
      type="text"
      label="Nome da Empresa"
      name="empresa"
      placeholder="Insira o nome da empresa"
      handleOnChange={handleChange}
      disabled={loading}
    />
    <Input 
      type="text"
      label="CNPJ"
      name="cnpj"
      placeholder="00.000.000/0000-00"
      handleOnChange={handleChange}
      disabled={loading}
    />
    <Input 
      type="number"
      label="Faturamento Mensal"
      name="faturamento"
      placeholder="Insira o faturamento da Empresa"
      handleOnChange={handleChange}
      valor = {empresa.faturamento}
      disabled={loading}
    />
    <SelectCustomizado
      name="ramo"
      label="Selecione o ramo"
      options={ramos}
      handleOnChange={handleChange}
      valor={empresa.ramo || ''}
      disabled={loading}
    />
    {timer &&
      <Message
        text={message}
        type='error'
      />
    }

    <Button variant="contained" type='submit' sx={{display:'block', margin: '1em auto'}}>Cadastrar</Button>
    </form>
  )
}

export default EmpresaForm