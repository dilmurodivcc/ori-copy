import { Navigate, Outlet,  } from 'react-router-dom';
const PrivateRoute = () => {
  return (
    <>  
      {localStorage.getItem('access_token') ? (
        <Outlet />
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default PrivateRoute;
