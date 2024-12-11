import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AddressNavbar from '../components/clientSide/AddressNavbar/AddressNavbar';
import Navbar from '../components/clientSide/Navbar/Navbar';
import Footer from '../components/clientSide/Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import NavBarDrawer from '../components/clientSide/Navbar/NavBarDrawer';
import BottomNavbar from '../pages/clientSide/BottomNavbar/BottomNavbar';
import WhatsAppButton from '../components/clientSide/WhatsAppButton';
import UpdateNavbar from '../components/clientSide/Navbar/UpdateNavbar';

const MainLayout = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setOpen(false)
    }, [pathname])
    return (
        <div className='relative bg-white'>
            <NavBarDrawer open={open} setOpen={setOpen} />
            <ScrollToTop />
            <AddressNavbar />
            <div className='sm:sticky top-0 z-40'>
                <Navbar/>
            </div>
            <div className='fixed bottom-0 left-0 w-full z-20 block sm:hidden'>
                <BottomNavbar/>
            </div>
            <Outlet></Outlet>
            <Footer />
            <WhatsAppButton></WhatsAppButton>
        </div>
    );
};

export default MainLayout;