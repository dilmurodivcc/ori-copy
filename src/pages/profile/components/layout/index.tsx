import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sitebar from '../Sitebar';

function ProfileLayout() {
  return (
   <div className="container">
     <div className="profile-layout">
      <Header />
      <div className="profile-content">
        <Sitebar />
        <div className="profile-page">
          <Outlet />
        </div>
      </div>
    </div>
   </div>
  );
}

export default ProfileLayout;
