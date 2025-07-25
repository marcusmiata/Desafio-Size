//Contexto
import { useAuth } from '../AuthContext/AuthContext'
import { usePedido } from '../AuthContext/IdContext'

//Componentes internos
import Logo from './Logo'

//Bibliotecas externas
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//Material UI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

//Estilos
import styles from './Navbar.module.css'



const drawerWidth = 240
const navItemsLogado = [
  {
    text: 'Cadastrar Nota',
    to: 'cadastrarNfe'
  },
  {
    text: 'Carrinho',
    to: 'carrinho'
  }]
const navItemsDeslogado = [
  {
    text: 'Cadastrar Empresa',
    to: 'cadastrarEmpresa'
  }
]

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const { idPedido, clearPedidoId } = usePedido()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [navItems, setNavItems] = useState(navItemsLogado)

  useEffect(() => {
    isAuthenticated ? setNavItems(navItemsLogado) : setNavItems(navItemsDeslogado)
  })

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const removerPedido = async () => {
    if (!idPedido) return

    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5000/pedidos/${idPedido}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Falha ao remover pedido')
      clearPedidoId()
      setNotas(null)
      setIsBelow(true)
      setText('Carrinho esvaziado')
      setType('success')
      setTimer(true)
      setTimeout(() => {
        setTimer(false)
      }, 3000)
    } catch (err) {
      console.error("Erro ao remover pedido")
      alert('Erro ao remover pedido')
    } finally {
      setIsLoading(false)
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Logo />
      </Typography>
      <Divider />
      <List sx={{textAlign:'center'}}>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link className={styles.itemList} to={item.to}>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
        {isAuthenticated() &&
          <ListItem key={-1} >
            <Button onClick={() => {
            logout()
            clearPedidoId()
            removerPedido()
            }} 
            variant='contained' color='error' size='small'
            className={styles.itemList}
            >
              Sair
            </Button>
          </ListItem>
        }
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: 'primary.dark' }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={'/'}>
              <Logo />
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Link to={item.to} className={styles.item} key={index} sx={{ color: '#fff' }}>
                {item.text}
              </Link>
            ))}
            {isAuthenticated() &&
              <Button onClick={() => {
                logout()
                clearPedidoId()
                removerPedido()
              }} variant='contained' color='error' size='small'>Sair</Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}


export default Navbar