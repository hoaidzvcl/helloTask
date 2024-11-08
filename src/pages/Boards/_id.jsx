import React from 'react'
import AppBar from '../../componets/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import Container from '@mui/material/Container'

function Board() {
    return (
        <Container disableGutters maxWidth={false} sx={{height:'100vh'}}>
          <AppBar />
          <BoardBar />
          <BoardContent />
        </Container>
      )
}

export default Board
