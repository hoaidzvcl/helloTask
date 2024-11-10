import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profile() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0 }}
                    aria-controls={open ? 'basic-menu-profile' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{
                            width: 34, 
                            height: 34,
                            border: '2px solid white'
                        }}
                        alt="Avatar"
                        src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/241192229_211887550831791_2728775047387110353_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-Xk0nYXlWI8Q7kNvgFGGVIp&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=A9iLRw3zC1PSMvZnfN79wIJ&oh=00_AYCMPB0jVYpssbkgNncnoBl9ZcAGG-4-B-7NOBn7I4wVOw&oe=6734C072"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-profile"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-profile',
                }}
            >
                <MenuItem>
                    <Avatar sx={{width: 28, height: 28, mr: 2}} /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar sx={{width: 28, height: 28, mr: 2}} /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Profile