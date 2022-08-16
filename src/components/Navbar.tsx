import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useProvider, useContract } from 'wagmi'
import { CONTRACT_ADDRESS } from "../../web3-constants";
import { useEffect, useState } from 'react';
import contractInterface from '../utils/abi.json';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const { address } = useAccount()
    const provider = useProvider()

    const contractProvider = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: contractInterface.abi,
        signerOrProvider: provider,
    })

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const checkIfAdmin = async () => {
        if (!contractProvider) return;
        try {
            const ownerOfContract = await contractProvider.owner()
            console.log('owner of contract:', ownerOfContract)
            console.log('address', address)
            if (address === ownerOfContract) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        checkIfAdmin()
    })

    useEffect(() => {
        const checkIfSignedIn = async () => {
            if (address){
                setIsSignedIn(true)
            } else {
                setIsSignedIn(false)
            }
        }

        checkIfSignedIn()
    }, [address])

    return (
        <AppBar position="sticky" style={{ top: 0, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href='/'>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <a>m3mento</a>
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {isAdmin && <MenuItem onClick={handleCloseNavMenu}>
                                <Link href='/admin'>
                                    <Typography textAlign="center">Admin</Typography>
                                </Link>
                            </MenuItem>}
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link href='/events'>
                                    <Typography textAlign="center">Events</Typography>
                                </Link>
                            </MenuItem>
                            {isSignedIn && <MenuItem onClick={handleCloseNavMenu}>
                                <Link href='/my-events'>
                                    <Typography textAlign="center">My Events</Typography>
                                </Link>
                            </MenuItem>}
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link href='/contact-us'>
                                    <Typography textAlign="center">Contact Us</Typography>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {isAdmin && <Link href='/admin'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Admin
                            </Button>
                        </Link>}
                        <Link href='/events'>
                            <Button
                                key='Events'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Events
                            </Button>
                        </Link>
                        {isSignedIn && <Link href='/my-events'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                My Events
                            </Button>
                        </Link>}
                        <Link href='/contact-us'>
                            <Button
                                key='Admin'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </Box>
                    <ConnectButton />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
