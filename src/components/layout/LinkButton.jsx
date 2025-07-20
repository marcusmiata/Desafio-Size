//Material UI
import Button from '@mui/material/Button'

function LinkButton({ text, to }) {
  return (
    <Button variant="contained" href={to}>
      {text}
    </Button>
  )
}

export default LinkButton