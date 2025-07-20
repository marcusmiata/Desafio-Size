//Material UI
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function Input({ type, label, name, placeholder, handleOnChange, valor, disabled }) {
  return (
    <Box
      component="div"
      sx={{ '& > :not(style)': { m: 1, width: .8 } }}
    >
      <TextField
        label={label}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={valor}
        disabled={disabled}
        required
        variant="outlined"
      />
    </Box>
  )
}

export default Input