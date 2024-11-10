import React from 'react'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'

function ModeSelect() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event) => {
        const selectedMode = event.target.value
        setMode(selectedMode)
    }

    return (
        <FormControl size="small">
            <InputLabel
                sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' }
                }}
                id="label-select-dark-light-mode">
                Mode
            </InputLabel>
            <Select
                labelId="label-select-dark-light-mode"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                    '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                    '.MuiSvgIcon-root': {color: 'white'}
                }}
            >
                <MenuItem value="light">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LightModeIcon fontSize="small" />
                        Light
                    </Box>
                </MenuItem>
                <MenuItem value="dark">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DarkModeRoundedIcon />
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

export default ModeSelect
