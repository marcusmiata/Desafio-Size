//Material UI
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import { useMediaQuery } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'

//Estilos
import styles from './CardNota.module.css'

function CardNota({ index, numero, valorBruto, valor, data, handleRemove }) {
  const isMobile = useMediaQuery('(max-width:800px)')
  const remove = (e) => {
    e.preventDefault()
    handleRemove(index)
  }

  return (
    <Card sx={{ width: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant={isMobile ? 'h6' : 'h5'} component="div" className={styles.headerCard}>
            {isMobile ? (<span>Nº: {numero}</span>) : (
              <>
                <span>Numero da nota:{numero}</span>
                <span>Vencimento: {data}</span>
              </>

            )}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            {isMobile &&
              <div>Vencimento: {data}</div>
            }
            Valor bruto: {valorBruto}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Valor liquido: <span className={styles.total}>{valor}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Button sx={{ mx: 'auto' }} variant='contained' color="error" onClick={remove}>
          <Stack direction='row' spacing={.3} sx={{ p: .5 }}> <p>Remover</p> <DeleteIcon /> </Stack>
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardNota