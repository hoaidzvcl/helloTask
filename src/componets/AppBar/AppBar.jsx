import React from 'react'
import { useState } from 'react'
import theme from '~/theme'
import Box from '@mui/material/Box'
import ModeSelect from '~/componets/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as HelloIcon } from '~/assets/hello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.hello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AppsIcon sx={{ color: 'white' }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={HelloIcon} inheritViewBox sx={{ color: 'white' }} />
                    <Typography variant="span" sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>Hello</Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    <Workspaces />
                    <Recent />
                    <Started />
                    <Templates />
                    <Button
                        sx={{
                            color: 'white',
                            border: 'none',
                            '&:hover': { border: 'none' }
                        }}
                        variant="outlined"
                        startIcon={<LibraryAddIcon />}
                    >Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                    id="outlined-search"
                    label="Search ..."
                    type="text"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon
                                    fontSize="small"
                                    sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                                    onClick={() => setSearchValue('')}
                                />
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '170px',
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

                <ModeSelect />

                <Tooltip title="Notification">
                    <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <Badge color="secondary" sx={{ cursor: 'pointer' }}>
                        <HelpOutlineIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>

                <Profile />
            </Box>
        </Box>
    )
}

export default AppBar
