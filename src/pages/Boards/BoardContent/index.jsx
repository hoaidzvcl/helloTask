import React from 'react'
import Box from '@mui/material/Box'
import theme from '~/theme'

function BoardContent() {
    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            width: '100%',
            height: (theme) => `calc(100vh - ${theme.hello.appBarHeight} - ${theme.hello.boardBarHeight})`,
            display: 'flex',
            alignItems: 'center'
        }}>
        </Box>
    )
}

export default BoardContent
