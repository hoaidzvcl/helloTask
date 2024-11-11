import { useState, useEffect } from 'react'
import theme from '~/theme'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
    DndContext,
    // PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10} })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10} })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500} })
    
    //Sử dụng 2 loại sensor là mouse và touch
    const sensors = useSensors(mouseSensor,touchSensor)

    const [orderedColumns, setOrderedColumns] = useState([])

    useEffect(() => {
        //Set lại Columns mới với hàm mapOrder (columns cũ, columns mới)
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const handleDragEnd = (event) => {
        console.log('handleDragEnd', event)
        const { active, over } = event

        //Kiểm tra nếu không tồn tại over(kéo ra ngoài linh tinh thì return luôn tranh lỗi)
        if (!over) return

        if (active.id !== over.id) {
            //Lấy vị trí cũ từ active
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            //Lấy vị trí mới từ over
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)

            //Dùng arrayMove của DndKit để sắp xếp lại mảng Columns ban đầu
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
            // console.log('dndOrderedColumns: ', dndOrderedColumns)
            // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)
            setOrderedColumns(dndOrderedColumns)
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: (theme) => theme.hello.boardContentHeight,
                p: '10px 0'
            }}>
                <ListColumns columns={orderedColumns} />
            </Box>
        </DndContext>
    )
}

export default BoardContent
