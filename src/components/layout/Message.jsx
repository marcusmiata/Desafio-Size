//Material UI
import Alert from '@mui/material/Alert'

function Message({ text, type }) {
  return (
    <Alert sx={{ p: 2, m: 2 }} severity={type}>
      {text}
    </Alert>
  )
}

export default Message