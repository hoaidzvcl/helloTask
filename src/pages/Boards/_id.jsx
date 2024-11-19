import { useState, useEffect } from 'react'
import AppBar from '~/componets/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Container from '@mui/material/Container'
import { fetchBoardDetailAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '673794d4270b33d675b1c729'

    fetchBoardDetailAPI(boardId)
      .then(board => {
        // Xử lí kéo thả vào một column rỗng
        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
        })

        setBoard(board)
      })
      .catch(error => console.error('API call error:', error))
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // console.log(createdColumn)
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    // console.log(createdCard)

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    // Call API
    await updateBoardDetailAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })

    setBoard(newBoard)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns} />
    </Container>
  )
}

export default Board
