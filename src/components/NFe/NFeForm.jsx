//Componentes Internos
import Input from '../form/Input'
import InputData from '../form/InputData'
import Message from '../layout/Message'

//Bibliotecas externas
import { useState } from 'react'

//Material UI
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br');

function NfeForm({ handleSubmit }) {
  const [nfe, setNfe] = useState({})
  const [timer, setTimer] = useState(false)
  const [text, setText] = useState('')


  function validarData(data) {
    const dataAtual = new Date();
    const dataVencimento = dayjs(data, 'DD-MM-YYYY').toDate()

    dataAtual.setHours(0, 0, 0, 0)
    dataVencimento.setHours(0, 0, 0, 0)

    return dataVencimento > dataAtual;
  }

  const submit = (e) => {
    e.preventDefault()

    if (!nfe.numero || !nfe.valor || !nfe.vencimento) {
      setText('Preencha todos os campos')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
      return;
    }

    if (!validarData(nfe.vencimento)) {
      console.log(nfe.vencimento)
      setText('A data não pode ser no passado')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
      return
    }

    handleSubmit(nfe)
  }

  function handleChange(e) {
    setNfe(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={submit}>
      <Input
        type="number"
        label="Numero"
        name="numero"
        placeholder="Insira o numero da nota fiscal"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        label="Valor"
        name="valor"
        placeholder="Insira o valor da nota fiscal"
        handleOnChange={handleChange}
      />
      <InputData
        label="Data de Vencimento"
        name="vencimento"
        value={nfe.vencimento}
        handleOnChange={handleChange}
      />
      {timer &&
        <Message
          type='error'
          text={text}
        />
      }

      <Button variant="contained" type='submit' sx={{ m: 2 }}>Cadastrar</Button>
    </form>
  )
}

export default NfeForm