import React from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import { AppBar, Hidden, InputBase, Avatar, Grid, Fade, Typography, Zoom,  } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';
import { LoadingIcon, AddIcon, LikeIcon, LikeActiveIcon, ExploreIcon, ExploreActiveIcon, HomeIcon, HomeActiveIcon } from '../../icons';
import NotificationTooltip from '../notification/NotificationTooltip';
import { defaultCurrentUser, getDefaultUser } from '../../data';
import NotificationList from "../notification/NotificationList";
import { useNProgress } from '@tanem/react-nprogress';
 
function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isLoadingPage, setLoadingPage] = React.useState(true);
  const path = history.location.pathname;

  React.useEffect(() => {
    setLoadingPage(false);    
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {
            !minimalNavbar && (
              <>
                <Search history={history} />
                <Links path={path} />
              </>
            )
          }
        
        </section>
      </AppBar>
    </>
  )
}

function Logo() {
  const classes = useNavbarStyles();

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Finstagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  )
}

function Search({ history }) {
  const classes = useNavbarStyles();
  const [results, setResults] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [loading] = React.useState(false);

  const hasResults = Boolean(query) && results.length > 0;

  React.useEffect(() => {
    if(!query.trim()) return;

    setResults(Array.from({ length: 5 }, () => getDefaultUser() ));
  }, [query]);

  function handleClearInput() {
    setQuery('');
  }

  return (
    <Hidden xsDown>
      <WhiteTooltip arrow interactive TransitionComponent={Fade} open={hasResults} title={
        hasResults && (
          <Grid className={classes.resultContainer} container>
            {
              results.map(result => (
                <Grid 
                  key={result.id} 
                  item 
                  className={classes.resultLink} 
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">
                        {result.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))
            }
          </Grid>)
      }>
        <InputBase 
          className={classes.input}
          onChange={event => setQuery(event.target.value)}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span onClick={handleClearInput} className={classes.clearIcon}/>
            )
          }
          placeholder="Search"
          value={query}
        />
      </WhiteTooltip>
    </Hidden>
  )
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showingList, setShowingList] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  function handleToggleList() {
    setShowingList(prev => !prev);
  }

  function handleHideTooltip() {
    setShowTooltip(false);
  }

  function handleHideList() {
    setShowingList(false);
  }

  return (
    <div className={classes.linksContainer}>
      { showingList && <NotificationList handleHideList={handleHideList} /> }
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">
          {
            path === "/" ? <HomeActiveIcon /> : <HomeIcon />
          }
        </Link>
        <Link to="/explore">
          {
            path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />
          }
        </Link>
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToggleList}>
            {
              showingList ? <LikeActiveIcon /> : <LikeIcon />
            }
          </div>
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div 
            className={
              path ===`/${defaultCurrentUser.username}`
              ? classes.profileActive
              : ""
            }
          ></div>
          <Avatar
            src={defaultCurrentUser.profile_image}
            className={classes.profileImage}
          />
        </Link>
      </div>
    </div>
  )
}

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({ isAnimating });

  return (
    <div className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1, 
        transition: `opacity ${animationDuration}ms linear`
      }}>
      <div className={classes.progressBar} 
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`
        }}>
        <div className={classes.progressBackground} />
      </div>
    </div>
  )
}

export default Navbar;
