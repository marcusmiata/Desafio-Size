//Bibliotecas externas
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

//Material UI
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'

dayjs.locale('pt-br')

function InputData({ handleOnChange, label, name, value }) {
  return (
    <Box
      component="div"
      sx={{ '& > :not(style)': { margin: '0 auto', width: .8 } }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <DatePicker
          name={name}
          label={label}
          value={value ? dayjs(value, 'DD-MM-YYYY') : null}
          onChange={(newValue) => {
            handleOnChange({
              target: {
                name: name,
                value: newValue ? newValue.format('DD-MM-YYYY') : ''
              }
            })
          }}
          format='DD/MM/YYYY'
          required
        />
      </LocalizationProvider>
    </Box>

  )
}

export default InputData