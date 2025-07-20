//Bibliotecas externas
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function LoggedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Carregando</div>
  }

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default LoggedRoute