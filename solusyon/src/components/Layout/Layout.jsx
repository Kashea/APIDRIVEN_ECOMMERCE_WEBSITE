import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';
import ScrollToTopButton from '../../components/UI/ScrollToTop';

const Layout = () => {
  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
