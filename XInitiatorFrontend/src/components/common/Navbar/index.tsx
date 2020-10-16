import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import {
    AzureAD,
    AuthenticationState,
    IAzureADFunctionProps
} from "react-aad-msal";
import { authProvider } from '../../../Auth/AuthProvider';
import { useSelector } from 'react-redux';
import { hasAccess } from '../../../Auth/AccessControl';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function NavBar() {
    const classes = useStyles();
    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [, setLogin] = React.useState<any>();
    const userRole = useSelector((state: any) => state.user.user.role);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const setLoginObject = (loginFunction: any) => {
        setLogin(() => loginFunction);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: any) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRouteClick = (route: string) => {
        history.push(route);
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <AzureAD provider={authProvider}>
            {({ login, logout, authenticationState }: IAzureADFunctionProps) => {
                const isInProgress =
                    authenticationState === AuthenticationState.InProgress;
                const isAuthenticated =
                    authenticationState === AuthenticationState.Authenticated;
                const isUnauthenticated =
                    authenticationState === AuthenticationState.Unauthenticated;
                if (isAuthenticated) {
                    return (
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            id={menuId}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                            <MenuItem onClick={logout}>Signout</MenuItem>
                        </Menu>
                    )
                }
                else if (isUnauthenticated || isInProgress) {
                    setLoginObject(login);
                }

            }}

        </AzureAD>

    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {hasAccess(4, userRole) && (
                <MenuItem>
                    <Button aria-label="show 4 new mails" color="inherit" onClick={() => handleRouteClick("/users")}>
                        Users
                    </Button>
                </MenuItem>)}
            {hasAccess(4, userRole) && (
                <MenuItem>
                    <Button aria-label="show 4 new mails" color="inherit" onClick={() => handleRouteClick("/initiatives")}>
                        Initiatives
                    </Button>
                </MenuItem>)}

            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div>

            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} onClick={() => history.push("/")} variant="h6" noWrap>
                            <span style={{ cursor: 'pointer' }}>XInitiator</span>
                        </Typography>
                        <div className={classes.grow} />


                        <div className={classes.sectionDesktop}>
                            {hasAccess(4, userRole) && (<Button color="inherit" size="large" onClick={() => handleRouteClick("/users")}>Users</Button>)}
                            {hasAccess(4, userRole) && (<Button color="inherit" size="large" onClick={() => handleRouteClick("/initiatives")}>Initiatives</Button>)}
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <AzureAD provider={authProvider}>
                                {({ accountInfo }: IAzureADFunctionProps) => {
                                    return (
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                            <Typography variant="subtitle2">
                                                {accountInfo?.account.name}
                                            </Typography>
                                        </IconButton>
                                    )
                                }}
                            </AzureAD>

                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        </div>

    )
}
