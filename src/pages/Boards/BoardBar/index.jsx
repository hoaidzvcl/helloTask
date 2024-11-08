import React from 'react'
import theme from '../../../theme'
import Box from '@mui/material/Box'

function BoardBar() {
    return (
        <Box sx={{
            backgroundColor: 'primary.dark',
            width: '100%',
            height: (theme) => theme.hello.boardBarHeight,
            display: 'flex',
            alignItems: 'center'
        }}>
            BoardBar
        </Box>
    )
}

export default BoardBar
