import { useState, useEffect } from 'react'
import AppBar from '~/componets/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Container from '@mui/material/Container'
import { fetchBoardDetailAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '673794d4270b33d675b1c729'

    fetchBoardDetailAPI(boardId).then(board => {
      setBoard(board)
    })
    .catch(error => console.error('API call error:', error))
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
