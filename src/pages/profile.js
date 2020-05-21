import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_PROFILE } from "../graphql/queries";
import { AuthContext } from "../auth";
import { UserContext } from "../App";

import { Card, CardContent, Hidden, Button, Typography, Dialog, Zoom, Divider, DialogTitle, Avatar } from "@material-ui/core";
import LoadingScreen from "../components/shared/LoadingScreen";
import Layout from "../components/shared/Layout";
import ProfilePicture from '../components/shared/ProfilePicture';
import ProfileTabs from '../components/profile/ProfileTabs';
import { GearIcon } from "../icons";

import { useProfilePageStyles } from "../styles";


function ProfilePage() {
  // hooks 
  const classes = useProfilePageStyles();
  const { currentUserId } = React.useContext(UserContext);
  const { username } = useParams();
  const variables = { username }
  const { data, loading } = useQuery(GET_USER_PROFILE, {variables});

  // state and local variables
  const [showOptionsMenu, setOptionsMenu] = React.useState(false);

  if (loading) return <LoadingScreen />
  const user = data.users[0];
  const isOwner = user.id === currentUserId;

  function handleOptionMenuClick() {
    setOptionsMenu(prev => !prev);
  }

  return (
    <Layout title={`${user.name} @${user.username}`}>
      <div className={classes.container}>
        {/**  Desktop View **/}
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} image={user.profile_image} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection user={user} isOwner={isOwner} handleOptionMenuClick={handleOptionMenuClick} />
              <PostCountSection user={user} />
              <NameBioSection user={user} />
            </CardContent>
          </Card>
        </Hidden>

        {/**  Mobile View **/}   
        <Hidden smUp>
          <Card className={classes.cardSmall}>
              <CardContent>
                <section className={classes.sectionSmall}>
                  <ProfilePicture size={77} isOwner={isOwner} image={user.profile_image}  />
                  <ProfileNameSection user={user} isOwner={isOwner} handleOptionMenuClick={handleOptionMenuClick} />
                </section>
                <NameBioSection user={user} />
              </CardContent>
              <PostCountSection user={user} />
            </Card>
        </Hidden>
        {
          showOptionsMenu && <OptionMenu handleClick={handleOptionMenuClick} />
        }
        <ProfileTabs user={user} isOwner={isOwner} />
      </div>
    </Layout>
  );
}

function ProfileNameSection({ user, isOwner, handleOptionMenuClick }) {
  // hooks
  const classes = useProfilePageStyles();

  // state and local variables
  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
  let followButton;
  const isFollowing = false;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setUnfollowDialog(true)}
        variant="outlined"
        className={classes.button}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button
        variant="outlined"
        className={classes.button}
      >
        Follow
      </Button>
    );
  }

  return (
    <>
      {/**  Desktop View **/}  
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
          {
            isOwner ? (
              <> 
                <Link to='/accounts/edit'>
                  <Button variant='outlined'>Edit Profile</Button>
                </Link>
                <div onClick={handleOptionMenuClick} className={classes.settingsWrapper}>
                  <GearIcon className={classes.settings} />
                </div>
              </>
            ) : (
              <>
                {followButton}
              </>
            )
          }
        </section>
      </Hidden>

      {/**  Mobile View **/}  
      <Hidden smUp>
          <section>
            <div className={classes.usernameDivSmall}>
              <Typography className={classes.username}>{user.username}</Typography>
              {
                isOwner && (
                  <div onClick={handleOptionMenuClick} className={classes.settingsWrapper}>
                    <GearIcon className={classes.settings} />
                  </div>
                )
              }
            </div>
            {
              isOwner ? (
                <Link to='/accounts/edit'>
                  <Button variant='outlined' style={{width: "100%"}}>Edit Profile</Button>
                </Link>
              ) : (followButton)
            }
          </section>
      </Hidden>
      {
        showUnfollowDialog && <UnfollowDialog  user={user} onClose={() => setUnfollowDialog(false)} />
      }
    </>
  );
}

function UnfollowDialog({ onClose, user }) {
  const classes = useProfilePageStyles();

  return (
    <Dialog 
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper
      }}
      onClose
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar src={user.profile_image} alt={`${user.username}'s Avatar`} className={classes.avatar} />
      </div>

      <Typography align="center" className={classes.unfollowDialogText} variant="body2">
        Unfollow @{user.username}
      </Typography>

      <Divider />

      <Button className={classes.unfollowButton}>
        Unfollow
      </Button>

      <Divider />

      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  )
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ["posts", "followers", "following"];
  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>

      <section className={classes.followingSection}>
        {
          options.map(option => (
            <div key={option} className={classes.followingText} >
              <Typography className={classes.followingCount}>
                {user[`${option}_aggregate`].aggregate.count}
              </Typography>
              <Hidden xsDown>
                <Typography>
                  {option}
                </Typography>
              </Hidden>
              <Hidden smUp>
                <Typography color="textSecondary">
                  {option}
                </Typography>
              </Hidden>
              </div>
          ))
        }
      </section>

      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

function NameBioSection({ user }) {
  const classes = useProfilePageStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
}

function OptionMenu({ handleClick }) {
  const classes = useProfilePageStyles();
  const { signOut } = React.useContext(AuthContext);
  const history = useHistory();
  const [showLogoutMessage, setLogoutMessage] = React.useState(false);

  function handleLogoutClick() {
    setLogoutMessage(true);
    setTimeout(() => {
      signOut();
      history.push('/accounts/login');
    }, 1000)
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper
      }}
      TransitionComponent={Zoom}
    >
      {
        showLogoutMessage ? (
          <DialogTitle className={classes.dialogTitle}>
            Logging Out
            <Typography color="textSecondary">
              Please log back in to continue using Finstagram.
            </Typography>
          </DialogTitle>
        ) : (
          <>
            <OptionsItem text="Change Password" />
            <OptionsItem text="Nametag" />
            <OptionsItem text="Authorized Apps" />
            <OptionsItem text="Notifications" />
            <OptionsItem text="Privacy and Security" />
            <OptionsItem text="Log out" onClick={handleLogoutClick}/>
            <OptionsItem text="Cancel" color={'red'} onClick={handleClick} />
          </>
        )
      }
    </Dialog>
  );

}

function OptionsItem({ text, onClick, color = 'black'}) {
  return (
    <>
      <Button style={{padding: '12px 8px', color: `${color}` }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  )
}

export default ProfilePage;
