import React from 'react'
import theme from '~/theme'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { toast } from 'react-toastify'
import { CSS } from '@dnd-kit/utilities'
import Button from '@mui/material/Button'
import { cloneDeep } from 'lodash'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Cloud from '@mui/icons-material/Cloud'
import MenuItem from '@mui/material/MenuItem'
import ListCards from './ListCards/ListCards'
import TextField from '@mui/material/TextField'
import { useSortable } from '@dnd-kit/sortable'
import { useConfirm } from 'material-ui-confirm'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCardIcon from '@mui/icons-material/AddCard'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useDispatch, useSelector } from 'react-redux'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { createNewCardAPI, deleteColumnDetailAPI } from '~/apis'
import {
    updateCurrentActiveBoard,
    selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

function Column({ column }) {
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column }
    })

    const dndKitColumnStyle = {
        // touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        //Height 100% để không bị lỗi kéo column ngắn qua column dài lại phải kéo ở thân column
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
    }

    const orderedCards = column.cards

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

    const [newCardTitle, setNewCardTitle] = useState('')

    const addNewCard = async () => {
        if (!newCardTitle) {
            toast.error('Please enter card title!!', { position: 'bottom-right' })
            return
        }

        const newCardData = {
            title: newCardTitle,
            columnId: column._id
        }

        // Call API và cập nhật lại state Board
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        })

        // const newBoard = { ...board }
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if (columnToUpdate) {
            if (columnToUpdate.cards.some(card => card.FE_PlacehoderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = [createdCard._id]
            } else {
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)
            }
        }
        // setBoard(newBoard)
        dispatch(updateCurrentActiveBoard(newBoard))

        toggleOpenNewCardForm()
        setNewCardTitle('')
    }

    const confirmDeleteColumn = useConfirm()
    const hanleDeleteColumn = () => {
        confirmDeleteColumn({
            title: 'Delete Column?',
            description: 'This action will permanetly delete your Column and its Cards! Are you sure?',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel',

        }).then(() => {
            // Cập nhật state Board
            const newBoard = { ...board }
            newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
            newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
            // setBoard(newBoard)
            dispatch(updateCurrentActiveBoard(newBoard))

            //Call API
            deleteColumnDetailAPI(column._id).then(res => {
                toast.success(res?.DeleteResult)
            })
        }).catch()
    }


    return (
        <div ref={setNodeRef}
            style={dndKitColumnStyle}
            {...attributes}>
            <Box
                //Listener nằm ở box để tránh kéo vào vùng xanh trống mà vẫn kéo được
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    ml: 2,
                    borderRadius: '6px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.hello.boardContentHeight} - ${theme.spacing(3)})`
                }}
            >
                {/* Box Column Header*/}
                <Box
                    sx={{
                        height: (theme) => theme.hello.columnHeaderHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title="More Options">
                            <span>
                                <ExpandMoreIcon
                                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                                    id="basic-column-dropdown"
                                    aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                />
                            </span>
                        </Tooltip>
                        <Menu
                            id="basic-menu-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown',
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={toggleOpenNewCardForm}
                                sx={{
                                    '&:hover': {
                                        color: 'success.light',
                                        '& .add-card-icon': { color: 'success.light' }
                                    }
                                }}>
                                <ListItemIcon><AddCardIcon className="add-card-icon" fontSize="small" /></ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={hanleDeleteColumn}
                                sx={{
                                    '&:hover': {
                                        color: 'warning.dark',
                                        '& .delete-icon': { color: 'warning.dark' }
                                    }
                                }}>
                                <ListItemIcon><DeleteIcon className="delete-icon" fontSize="small" /></ListItemIcon>
                                <ListItemText>Delete This Column</ListItemText>
                            </MenuItem>
                            {/* <MenuItem>
                                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive This Column</ListItemText>
                            </MenuItem> */}
                        </Menu>
                    </Box>
                </Box>

                {/* List Card*/}
                <ListCards cards={orderedCards} />

                {/* Box Column Footer*/}
                <Box
                    sx={{
                        height: (theme) => theme.hello.columnFooterHeight,
                        p: 2,
                    }}
                >
                    {!openNewCardForm
                        ? <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        >
                            <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
                            <Tooltip title="Drag to move">
                                <DragHandleIcon sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                        : <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <TextField
                                label="Enter Card Title..."
                                type="text"
                                size="small"
                                autoFocus
                                variant="outlined"
                                data-no-dnd="true"
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                sx={{
                                    '& label': { color: 'text.primary' },
                                    '& input': {
                                        color: (theme) => theme.palette.primary.main,
                                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                                    },
                                    '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: 1
                                    }
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    className="interceptor-loading" 
                                    onClick={addNewCard}
                                    variant="contained" color="success" fontSize="small" data-no-dnd="true"
                                    sx={{
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                    }}
                                >
                                    Add
                                </Button>
                                <CloseIcon
                                    fontSize="small"
                                    sx={{
                                        color: (theme) => theme.palette.warning.light,
                                        cursor: 'pointer',
                                    }}
                                    onClick={toggleOpenNewCardForm}
                                />
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default Column
