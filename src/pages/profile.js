import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { GET_USER_PROFILE } from "../graphql/queries";
import { FOLLOW_USER, UNFOLLOW_USER } from "../graphql/mutations";
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
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    variables, 
    fetchPolicy: 'no-cache'
  });

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
  const { currentUserId, followingIds, followerIds } = React.useContext(UserContext);
  const [followUser] = useMutation(FOLLOW_USER);

  // state and local variables
  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
  let followButton;
  const isAlreadyFollowing = followingIds.some(id => id === user.id);
  const [isFollowing, setFollowing] = React.useState(isAlreadyFollowing)
  const isFollower = !isFollowing && followerIds.some(id => id === user.id);
  
  function handleFollowUser() {
    setFollowing(true)
    const variables = {
      userIdToFollow: user.id,
      currentUserId
    }
    followUser({ variables })
  }

  const onUnfollowUser = React.useCallback(() => {
    setUnfollowDialog(false);
    setFollowing(false);
  }, []);

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
        onClick={handleFollowUser}
      >
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleFollowUser}
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
        showUnfollowDialog && <UnfollowDialog  user={user} onClose={() => setUnfollowDialog(false)} onUnfollowUser={onUnfollowUser} />
      }
    </>
  );
}

function UnfollowDialog({ onClose, user, onUnfollowUser }) {
  const classes = useProfilePageStyles();
  const { currentUserId } = React.useContext(UserContext);

  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  function handleUnfollowUser() {
    const variables = {
      userIdToUnfollow: user.id,
      currentUserId
    }
    unfollowUser({ variables });
    onUnfollowUser();
  }

  return (
    <Dialog 
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar src={user.profile_image} alt={`${user.username}'s Avatar`} className={classes.avatar} />
      </div>

      <Typography align="center" className={classes.unfollowDialogText} variant="body2">
        Unfollow @{user.username}
      </Typography>

      <Divider />

      <Button onClick={handleUnfollowUser} className={classes.unfollowButton}>
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
  const client = useApolloClient();
  const [showLogoutMessage, setLogoutMessage] = React.useState(false);

  function handleLogoutClick() {
    setLogoutMessage(true);
    setTimeout(async () => {
      await client.clearStore();
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
