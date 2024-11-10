import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function ListCards() {
    return (
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
            <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
            }}>
                <CardMedia
                    sx={{ height: 140, borderRadius: '6px' }}
                    image="https://th.bing.com/th/id/OIP.qRTDHtIzppeo-8FFSb_WrQHaE7?rs=1&pid=ImgDetMain"
                    title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>Chả cá Hàn Quốc cay cay</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    <Button size="small" startIcon={<GroupIcon />}>20</Button>
                    <Button size="small" startIcon={<CommentIcon />}>15</Button>
                    <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                </CardActions>
            </Card>

            <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
            }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>Card 01</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ListCards