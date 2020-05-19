import React from "react";
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import FeedPage from './pages/feed';
import ExplorePage from './pages/explore';
import ProfilePage from './pages/profile';
import EditProfilePage from './pages/edit-profile';
import PostPage from './pages/post';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import NotFoundPage from './pages/not-found';
import PostModal from './components/post/PostModal';
import { AuthContext } from "./auth";

function App() {
  const { authState } = React.useContext(AuthContext);
  const isAuth = authState.status === 'in'
  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    if (history.action !== 'POP' && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);
  
  const isModalOpen = modal && prevLocation.current !== location;

  if (!isAuth) {
    // use unAuth routes
    return (
      <Switch>
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignUpPage} />
        <Redirect to="/accounts/login" />
      </Switch>
    )
  }

  return (
    <>
      {/** imperatively telling switch to ignore routers current location and use the previous one if the modal is open **/}
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignUpPage} />
        
        <Route path="*" component={NotFoundPage} />
      </Switch>    
      {
        isModalOpen && <Route exact path="/p/:postId" component={PostModal} />
      }
    </>

  )
}

export default App;
