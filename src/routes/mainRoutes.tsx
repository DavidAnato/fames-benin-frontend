import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import UnderDevelopment from '../pages/UnderDevelopment';
import UserProfiles from '../pages/UserProfile';

const MainRoutes = [
  <Route key="home" path="/" Component={Home} />,
  <Route key="under-development" path="*" Component={UnderDevelopment} />,
  <Route key="profile" path="/profile" Component={UserProfiles} />,
];

export default MainRoutes;