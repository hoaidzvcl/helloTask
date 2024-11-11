import React from 'react'
import theme from '~/theme'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import Button from '@mui/material/Button'
import { capitalizeFirstLetter } from '~/utils/formatters'

function BoardBar({board}) {
    const boardbarItemStyle = {
        color: 'white',
        bgcolor: 'transparent',
        border: 'none',
        paddingX: '5px',
        borderRadius: '4px',
        '& .MuiSvgIcon-root': {
            color: 'white'
        },
        '&:hover': {
            bgcolor: 'primary.50'
        }
    }
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.hello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={boardbarItemStyle}
                    icon={<DashboardIcon />}
                    label= {board?.title}
                    clickable
                />
                <Chip
                    sx={boardbarItemStyle}
                    icon={<VpnLockIcon />}
                    label= {capitalizeFirstLetter(board?.type)}
                    clickable
                />
                <Chip
                    sx={boardbarItemStyle}
                    icon={<AddToDriveIcon />}
                    label="Add To Google Drive"
                    clickable
                />
                <Chip
                    sx={boardbarItemStyle}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                />
                <Chip
                    sx={boardbarItemStyle}
                    icon={<FilterListIcon />}
                    label="Filter"
                    clickable
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<PersonAddAlt1Icon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {borderColor: 'white'}
                    }}
                >Invite
                </Button>
                <AvatarGroup
                    max={4}
                    sx={{
                        gap: '10px',
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            color: 'white',
                            cursor: 'pointer',
                            '&:first-of-type': {bgcolor: '#a4b0be'}
                        }
                    }}
                >
                    <Tooltip title="Huấn Hoa Hồng">
                        <Avatar
                            alt="Huấn Hoa Hồng"
                            src="https://i.imgflip.com/5xd7in.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="Ngô Bá Khá">
                        <Avatar
                            alt="Ngô Bá Khá"
                            src="https://i1.sndcdn.com/artworks-Otgw8J9LbvBoiwDj-9Qpp6w-t500x500.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="Sơn Tùng">
                        <Avatar
                            alt="Sơn Tùng"
                            src="https://thethaovanhoa.mediacdn.vn/Upload/O5NP4aFt6GVwE7JTFAOaA/files/2022/06/son-tung-mtp-va-hai-tu%20(1).jpg"
                        />
                    </Tooltip>
                    <Tooltip title="Phú Lê">
                        <Avatar
                            alt="Phú Lê"
                            src="https://th.bing.com/th/id/OIP.60QDjWU6KkYSDDIScdbEGgAAAA?rs=1&pid=ImgDetMain"
                        />
                    </Tooltip>
                    <Tooltip title="Walter White">
                        <Avatar
                            alt="Walter White"
                            src="https://th.bing.com/th/id/R.ea6f3f50467690ebea8acbece42b9f68?rik=k%2bm4K03c5zV1eg&pid=ImgRaw&r=0"
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar
