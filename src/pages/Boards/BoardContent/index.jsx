import React from 'react'
import Box from '@mui/material/Box'
import theme from '~/theme'

function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            width: '100%',
            height: (theme) => `calc(100vh - ${theme.hello.appBarHeight} - ${theme.hello.boardBarHeight})`,
            display: 'flex',
            alignItems: 'center'
        }}>
        </Box>
    )
}

export default BoardContent
