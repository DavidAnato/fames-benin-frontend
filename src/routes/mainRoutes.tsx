import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import UnderDevelopment from '../pages/UnderDevelopment';
import UserProfiles from '../pages/UserProfile';
import News from '../pages/News';
import Post from '../pages/Post';
import Gallery from '../pages/Gallery';
import AboutPage from '../pages/About';
import OpportunityPage from '../pages/Opportunities';
import ConsularCardRequest from '../pages/consularCard';

const MainRoutes = [
  <Route key="home" path="/" Component={Home} />,
  <Route key="news" path="/news" Component={News} />,
  <Route key="post" path="/news/:slug" Component={Post} />,
  <Route key="under-development" path="*" Component={UnderDevelopment} />,
  <Route key="profile" path="/profile" Component={UserProfiles} />,
  <Route key="gallery" path="/gallery" Component={Gallery} />,
  <Route key="about" path="/about-us" Component={AboutPage} />,
  <Route key="opportunities" path="/opportunities" Component={OpportunityPage} />,
  <Route key="consular-card" path="/consular-card" element={<ConsularCardRequest />} />,
];

export default MainRoutes;