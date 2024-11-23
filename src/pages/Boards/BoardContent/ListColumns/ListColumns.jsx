import { useState } from 'react'
import { cloneDeep } from 'lodash'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { createNewColumnAPI } from '~/apis'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { useDispatch, useSelector } from 'react-redux'
import { generatePlaceholderCard } from '~/utils/formatters'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { 
    updateCurrentActiveBoard, 
    selectCurrentActiveBoard 
  } from '~/redux/activeBoard/activeBoardSlice'

function ListColumns({ columns }) {
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const addNewColumn = async () => {
        if (!newColumnTitle) {
            toast.error('Please enter column title!!')
            return
        }
        const newColumnData = { title: newColumnTitle }

        // Call API
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })

        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        // Spread Operator là Shallow Copy/Clone nên bị dính Rules Immutability trong Redux Toolkit 
        // không dùng được hàm Push ( sửa mảng trực tiếp) , phải dùng cloneDeep
        // const newBoard = { ...board }
        const newBoard = cloneDeep(board)
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)

        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }

    return (
        <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
            <Box
                sx={{
                    bgclor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    '::-webkit-scrollbar-track': { m: 2 }
                }}
            >
                {columns.map(column => <Column
                    key={column._id}
                    column={column}
                />)}

                {!openNewColumnForm
                    ? <Box onClick={toggleOpenNewColumnForm} sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}
                    >
                        <Button
                            sx={{
                                color: 'white',
                                width: '100%',
                                justifyContent: 'flex-start',
                                py: 1,
                                pl: 2.5
                            }}
                            startIcon={<NoteAddIcon />}
                        >
                            Add new column
                        </Button>
                    </Box>
                    : <Box
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            p: 1,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffff3d',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}>
                        <TextField
                            label="Enter Column Title..."
                            type="text"
                            size="small"
                            autoFocus
                            variant="outlined"
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white'
                                    }
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button onClick={addNewColumn}
                                variant="contained" color="success" fontSize="small"
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                }}
                            >
                                Add Column
                            </Button>
                            <CloseIcon
                                fontSize="small"
                                sx={{
                                    color: 'white',
                                    cursor: 'pointer',
                                    '&:hover': { color: (theme) => theme.palette.warning.light }
                                }}
                                onClick={toggleOpenNewColumnForm}
                            />
                        </Box>
                    </Box>
                }
            </Box>
        </SortableContext>
    )
}

export default ListColumns