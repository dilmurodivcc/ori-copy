import { useEffect } from "react";
import ProfileLayout from "./profile/components/layout";


const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProfileLayout />;
};

export default Profile;
