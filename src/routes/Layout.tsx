import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='app-container'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
