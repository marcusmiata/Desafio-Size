//Bibliotecas externas
import { createContext, useContext, useState } from 'react'

const PedidoContext = createContext()

export function PedidoProvider({ children }) {
  const [idPedido, setIdPedido] = useState(() => {
    return localStorage.getItem('id') || null
  })

  const setPedidoId = (id) => {
    setIdPedido(id);
    localStorage.setItem('id', id)
  }

  const clearPedidoId = () => {
    if(!idPedido) return
    setIdPedido(null)
    localStorage.removeItem('id')
  }

  return (
    <PedidoContext.Provider value={{ idPedido, setPedidoId, clearPedidoId }}>
      {children}
    </PedidoContext.Provider>
  )
}

export function usePedido() {
  return useContext(PedidoContext)
}