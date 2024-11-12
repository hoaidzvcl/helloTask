import React from 'react'
import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
    return (
        <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
            <Box
                sx={{
                    p: '0 4px',
                    m: '0 5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    p: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: (theme) => `calc(
                        ${theme.hello.boardContentHeight} - 
                        ${theme.spacing(3)} -
                        ${theme.hello.columnHeaderHeight} -
                        ${theme.hello.columnFooterHeight}
                        )`,
                    '::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
                    '::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
                }}
            >
                {cards.map(card => <Card key={card._id} card={card} />)}
            </Box>
        </SortableContext>
    )
}

export default ListCards