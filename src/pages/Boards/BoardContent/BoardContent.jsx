import { useState, useEffect, useCallback, useRef } from 'react'
import theme from '~/theme'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { generatePlaceholderCard } from '~/utils/formatters'
import {
    // PointerSensor,
    DndContext,
    useSensor,
    useSensors,
    // MouseSensor,
    // TouchSensor,
    DragOverlay,
    closestCorners,
    defaultDropAnimationSideEffects,
    pointerWithin,
    // rectIntersection,
    getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor, } from '~/CustomLib/DndKitSensors'
import { cloneDeep, isEmpty } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

// Định nghĩa loại phần tử đang kéo (Drag item type)
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board,
    createNewColumn,
    createNewCard,
    moveColumns,
    moveCardInTheSameColumn,
    moveCardToDiffirentColumns
}) {

    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10} })
    //Sử dụng 2 loại sensor(cảm ứng) là Mouse và Touch
    const sensors = useSensors(mouseSensor, touchSensor)

    // Khởi tạo state orderedColumns với giá trị mặc định là mảng rỗng
    // orderedColumns: chứa danh sách các cột đã được sắp xếp (theo thứ tự hiển thị, chẳng hạn)
    // setOrderedColumns: hàm để cập nhật giá trị của orderedColumns
    const [orderedColumns, setOrderedColumns] = useState([])

    // Khởi tạo các state để theo dõi thông tin của phần tử đang được kéo (drag)
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    const lastOverId = useRef(null)

    useEffect(() => {
        // Khi `board` thay đổi, hàm này sẽ chạy lại
        setOrderedColumns(board.columns)
    }, [board])

    // Hàm tìm cột chứa thẻ dựa trên cardId
    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }

    const moveCardBetweenDiffirentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        triggerFrom
    ) => {
        setOrderedColumns(prevColums => {
            //Tìm vị trí index của overCard trong column đích
            const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

            //Logic tính toán newCardIndex, trên hoặc dưới OverCard
            let newCardIndex
            // Kiểm tra xem thẻ đang kéo có nằm bên dưới thẻ đang được di chuyển qua hay không
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height
            // Nếu thẻ đang kéo nằm dưới thẻ đang di chuyển qua, cần điều chỉnh chỉ số thẻ
            const modifier = isBelowOverItem ? 1 : 0

            newCardIndex =
                // Nếu thẻ đang kéo không tìm thấy trong cột đích (overCardIndex < 0), tức là thẻ kéo sẽ được
                // đưa vào cuối danh sách thẻ của cột đích.
                overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

            // Tạo bản sao sâu của prevColums để đảm bảo không thay đổi dữ liệu gốc
            const nextColumns = cloneDeep(prevColums)
            // Tìm Column mà card đang được kéo ra khỏi (activeColumn) trong nextColumns
            const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
            // Tìm Column mà card đang được thả vào (overColumn) trong nextColumns
            const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

            // Nếu tìm thấy activeColumn trong nextColumns
            if (nextActiveColumn) {
                // Bỏ card đang kéo khỏi mảng cards của activeColumn
                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

                // Thêm Placeholder Card nếu Column rỗng: bị kéo hết Card đi
                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
                }

                // Cập nhật lại danh sách cardOrderIds
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
            }

            if (nextOverColumn) {
                // Lọc bỏ card đang kéo khỏi mảng cards của overColumn
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

                // Phải cập nhật lại chuẩn dữ liệu columnId trong Card khi kéo cảrd giữa 2 column khác nhau
                const rebuild_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id
                }

                // Thêm card đang kéo vào vị trí mới trong mảng cards của overColumn tại chỉ số newCardIndex
                // toSpliced() sẽ chèn card vào đúng vị trí mà không làm thay đổi các card khác
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

                nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
            }

            if (triggerFrom === 'handleDragEnd') {
                moveCardToDiffirentColumns(
                    activeDraggingCardId, 
                    oldColumnWhenDraggingCard._id,
                    nextOverColumn._id,
                    nextColumns
                )
            }

            return nextColumns
        })
    }

    // Xử lý khi bắt đầu kéo phần tử
    const handleDragStart = (event) => {
        // console.log('handleDragStart', event)
        // Khi bắt kéo sẽ set thông tin cho phần tử
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    // Xử lý khi phần tử đang được kéo qua một phần tử khác
    const handleDragOver = (event) => {
        // Không làm gì nếu phần tử đang kéo là Column
        // Chỉ xử lý nếu phần tử đang kéo là Card (có thể di chuyển giữa các Column)
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        // Nếu phần tử là Card, xử lý kéo qua lại giữa các Column
        const { active, over } = event
        // Kiểm tra nếu không tồn tại phần tử `active` hoặc `over`, dừng hàm
        if (!active || !over) return

        // Lấy ID và dữ liệu của Card đang được kéo
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        // Lấy ID của phần tử (Card hoặc Column) mà Card đang kéo qua
        const { id: overCardId } = over

        // Tìm Column chứa Card đang được kéo (`activeDraggingCardId`)
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        // Tìm Column chứa phần tử `overCardId` mà Card đang kéo qua
        const overColumn = findColumnByCardId(overCardId)

        // Nếu không tìm thấy `activeColumn` hoặc `overColumn`, dừng hàm
        if (!activeColumn || !overColumn) return
        if (activeColumn._id != overColumn._id) {
            moveCardBetweenDiffirentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData,
                'handleDragOver'
            )
        }
    }

    // Xử lý khi phần tử kéo thả kết thúc
    const handleDragEnd = (event) => {
        // console.log('handleDragEnd', event)
        const { active, over } = event
        if (!active || !over) return

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // Lấy ID và dữ liệu của Card đang được kéo
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            // Lấy ID của phần tử (Card hoặc Column) mà Card đang kéo qua
            const { id: overCardId } = over

            // Tìm Column chứa Card đang được kéo (`activeDraggingCardId`)
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            // Tìm Column chứa phần tử `overCardId` mà Card đang kéo qua
            const overColumn = findColumnByCardId(overCardId)
            // Nếu không tìm thấy `activeColumn` hoặc `overColumn`, dừng hàm
            if (!activeColumn || !overColumn) return
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDiffirentColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData,
                    'handleDragEnd'
                )
            } else {
                //Lấy vị trí cũ từ active
                const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(c => c._id === activeDragItemId)
                //Lấy vị trí mới từ over
                const newCardIndex = overColumn?.cards.findIndex(c => c._id === overCardId)
                //Dùng arrayMove của DndKit để sắp xếp lại mảng Columns ban đầu
                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
                const dndOrderedCardsIds = dndOrderedCards.map(card => card._id)

                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)
                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCardsIds
                    return nextColumns
                })

                moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardsIds, oldColumnWhenDraggingCard._id)
            }
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                //Lấy vị trí cũ từ active
                const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
                //Lấy vị trí mới từ over
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
                //Dùng arrayMove của DndKit để sắp xếp lại mảng Columns ban đầu
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

                setOrderedColumns(dndOrderedColumns)

                moveColumns(dndOrderedColumns)
            }
        }

        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }

    // Hiệu ứng khi thả phần tử
    const customDropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }

    const collisionDetectionStrategy = useCallback((args) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args })
        }

        const pointerIntersections = pointerWithin(args)

        if (!pointerIntersections?.length) return

        // const intersections = !!pointerIntersections?.lenght
        //     ? pointerIntersections
        //     : rectIntersection(args)

        let overId = getFirstCollision(pointerIntersections, 'id')
        if (overId) {
            const checkColumn = orderedColumns.find(column => column._id === overId)
            if (checkColumn) {
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(container => {
                        return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
                    })
                })[0]?.id
            }

            lastOverId.current = overId
            return [{ id: overId }]
        }

        return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType])

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            // collisionDetection={closestCorners}
            collisionDetection={collisionDetectionStrategy}
            sensors={sensors}>
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: (theme) => theme.hello.boardContentHeight,
                p: '10px 0'
            }}>
                <ListColumns columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {(!activeDragItemType) && null}
                    {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

export default BoardContent
