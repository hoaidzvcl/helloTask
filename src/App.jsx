import * as React from 'react'
import { useColorScheme } from '@mui/material/styles'
import theme from './theme'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { DarkModeRounded } from '@mui/icons-material'
import Container from '@mui/material/Container'


function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeRounded />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{height:'100vh'}}>
      <Box sx={{
        backgroundColor:'primary.light',
        width: '100%',
        height: (theme) => theme.hello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor:'primary.dark',
        width: '100%',
        height: (theme) => theme.hello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
      BoardBar
      </Box>
      <Box sx={{
        backgroundColor:'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.hello.appBarHeight} - ${theme.hello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
      BoardContent
      </Box>
    </Container>
  )
}

export default App
