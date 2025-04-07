import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useBreadcrumbStore from '../store/breadcrumbStore';

export const useBreadcrumbUpdate = () => {
  const location = useLocation();
  const { setBreadcrumb } = useBreadcrumbStore();

  useEffect(() => {
    const isProfilePage = location.pathname.startsWith('/profile');
    const isHomePage = location.pathname === '/';

    // Always show breadcrumbs on all pages except home page
    const breadcrumbs = [{ label: 'Бош сахифа', path: '/' }];

    // Add second breadcrumb for all non-home pages
    if (!isHomePage) {
      breadcrumbs.push({
        label: isProfilePage ? 'Профиль' : 'Китоблар',
        path: isProfilePage ? '/profile' : location.pathname,
      });
    }

    setBreadcrumb(breadcrumbs);
  }, [location.pathname, setBreadcrumb]);
};
