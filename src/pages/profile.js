import React from "react";
import { useProfilePageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import { defaultCurrentUser } from '../data';
import { Card, CardContent, Hidden, Button, Typography, Dialog, Zoom, Divider, DialogTitle } from "@material-ui/core";
import ProfilePicture from '../components/shared/ProfilePicture';
import { Link } from "react-router-dom";
import { GearIcon } from "../icons";

function ProfilePage() {
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setOptionsMenu] = React.useState(false);
  const isOwner = true;

  function handleOptionMenuClick() {
    setOptionsMenu(prev => !prev);
  }

  return (
    <Layout title={`${defaultCurrentUser.name} @${defaultCurrentUser.username}`}>
      <div className={classes.container}>
        {/**  Desktop View **/}
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection user={defaultCurrentUser} isOwner={isOwner} handleOptionMenuClick={handleOptionMenuClick} />
              <PostCountSection />
              <NameBioSection />
            </CardContent>
          </Card>
        </Hidden>

        {/**  Mobile View **/}   
        <Hidden smUp>
          <Card className={classes.cardSmall}>
              <CardContent>
                <section className={classes.sectionSmall}>
                  <ProfilePicture size={77} isOwner={isOwner} />
                  <ProfileNameSection user={defaultCurrentUser} isOwner={isOwner} handleOptionMenuClick={handleOptionMenuClick} />
                </section>
                <NameBioSection />
              </CardContent>
              <PostCountSection />
            </Card>
        </Hidden>
        {
          showOptionsMenu && <OptionMenu handleClick={handleOptionMenuClick} />
        }
      </div>
    </Layout>
  );
}

function ProfileNameSection({ user, isOwner, handleOptionMenuClick }) {
  const classes = useProfilePageStyles();

  let followButton;
  const isFollowing = true;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button
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
    </>
  );
}

function PostCountSection() {
  return (
    <>PostCountSection</>
  );
}

function NameBioSection() {
  return (
    <>NameBioSection</>
  );
}

function OptionMenu({ handleClick }) {
  const classes = useProfilePageStyles();
  const [showLogoutMessage, setLogoutMessage] = React.useState(false);

  function handleLogoutClick() {
    setLogoutMessage(prev => !prev);
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
            Please log back in to continue using finstagram
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
          <OptionsItem text="Cancel" color="red" onClick={handleClick} />
        </>
      )
    }
      
    </Dialog>
  );

}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{padding: '12px 8px'}} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  )
}

export default ProfilePage;
