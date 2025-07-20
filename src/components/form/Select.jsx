//Material UI
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SelectCustomizado({ label, name, options, handleOnChange, valor, disabled }) {
  return (
    <FormControl variant="standard" sx={{ m: 1, width: 0.8 }}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        name={name}
        value={valor || ""}
        onChange={handleOnChange}
        label={label}
        disabled={disabled}
        sx={{ width: 1, m: 1, textAlign: 'start' }}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectCustomizado