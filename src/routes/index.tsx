import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';
import Category from '../pages/Category';
import Detail from '../pages/Detail';
// import Reading from '../pages/Reading';
import Audio from '../pages/Audio';
import Subscribe from '../pages/profile/pages/Subscribe';
import E_Account from '../pages/profile/pages/E_Account';
import My_books from '../pages/profile/pages/My_books';
import Saved from '../pages/profile/pages/Saved';
import Settings from '../pages/profile/pages/Settings';
import ProfileLayout from '../pages/profile/components/layout';
import ReadingEpub from '../pages/ReadingEpub';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<Category />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfileLayout />}>
            <Route index element={<Subscribe />} />
            <Route path='e-account' element={<E_Account />} />
            <Route path='my-books' element={<My_books />} />
            <Route path='saved' element={<Saved />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Route>
        <Route path='/audio' element={<Audio />} />
      </Route>
      <Route path='/reading' element={<ReadingEpub />} />
    </Routes>
  );
};

export default AppRoutes;
