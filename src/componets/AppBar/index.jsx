import React from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '../../componets/ModeSelect/index'
import theme from '../../theme'


function AppBar() {
    return (
        <Box sx={{
            backgroundColor: 'primary.light',
            width: '100%',
            height: (theme) => theme.hello.appBarHeight,
            display: 'flex',
            alignItems: 'center'
        }}>
            <ModeSelect />
        </Box>
    )
}

export default AppBar
