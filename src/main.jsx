//Componentes internos
import App from './App.jsx'

//Bibliotecas externas
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//Fonte
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

//Estilos
import './index.css'

//Material UI
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'


const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
      dark: grey[900],
      light: grey[200],
      contrastText: 'white',
    },
    background: {
      default: 'white',
      paper: grey[50],
      container: grey[300]
    }
  }
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
)
