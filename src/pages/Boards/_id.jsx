import { useEffect } from 'react'
import { cloneDeep } from 'lodash'
import BoardBar from './BoardBar/BoardBar'
import { useParams } from 'react-router-dom'
import AppBar from '~/componets/AppBar/AppBar'
import Container from '@mui/material/Container'
import BoardContent from './BoardContent/BoardContent'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Typography } from '@mui/material'
import { 
  fetchBoardDetailAPI, 
  updateCurrentActiveBoard, 
  selectCurrentActiveBoard 
} from '~/redux/activeBoard/activeBoardSlice'
import {
  updateBoardDetailAPI,
  updateColumnDetailAPI,
  moveCardToDiffirentColumnsAPI
} from '~/apis'

function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '673794d4270b33d675b1c729'

    dispatch(fetchBoardDetailAPI(boardId))
  }, [dispatch, boardId])

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    
    // Ở đây không cần dùng cloneDeep vì không sửa trực tiếp mảng mà là gán mảng mới
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    // Call API
    updateBoardDetailAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })

    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardsIds, columnId) => {
    // Update cho chuẩn dữ liệu state Board
    // const newBoard = { ...board }
    
    // Cannot assign to read only property 'cards' of object
    // TH Immutability ở đây đâ đụng tới giá trị cards đang được coi là chỉ đọc read only - (nested object - can thiệp sâu dữ liệu)
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Call API
    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardsIds })
  }

  const moveCardToDifferentColumns = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // Update cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API xử lý phía BE
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    // Xử lý vấn đề khi kéo Card cuối cùng ra khỏi Column, Column rỗng sẽ có placeholder card, cần xóa nó đi trước khi gửi dữ liệu lên cho phía BE.
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDiffirentColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board ....</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent 
        board={board}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumns={moveCardToDifferentColumns}
      />
    </Container>
  )
}

export default Board
