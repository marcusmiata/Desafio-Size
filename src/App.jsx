//Contexto
import AuthProvider from './components/AuthContext/AuthContext'
import { PedidoProvider } from './components/AuthContext/IdContext'

//Componentes internos
import Navbar from './components/layout/Navbar'
import LoggedRoute from './components/AuthContext/LoggedRoute'

//Paginas
import CadastroEmpresa from './components/pages/CadastroEmpresa'
import Home from './components/pages/Home'
import CadastroNFe from './components/pages/CadastroNfe'
import Carrinho from './components/pages/Carrinho'

//Bibliotecas externas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Material UI
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

function App() {
  return (
    <Router>
      <AuthProvider>
        <PedidoProvider  >
          <Stack sx={{
            width: '100%',
            minHeight: '100vh',
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Navbar />
            <Box sx={{ bgcolor: 'background.default' }}>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/cadastrarEmpresa' element={<CadastroEmpresa />} />
                <Route path='/cadastrarNFe' element={
                  <LoggedRoute>
                    <CadastroNFe />
                  </LoggedRoute>
                } />
                <Route path='/carrinho' element={
                  <LoggedRoute>
                    <Carrinho />
                  </LoggedRoute>
                } />
              </Routes>
            </Box>
            <div>Footer</div>
          </Stack>
        </PedidoProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
