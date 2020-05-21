import React from "react";
import { UserContext } from "../App";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_EDIT_PROFILE_INFO } from "../graphql/queries";
import { EDIT_USER, EDIT_USER_AVATAR } from "../graphql/mutations";
import { AuthContext } from "../auth";

import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import isMobilePhone from 'validator/lib/isMobilePhone';

import { IconButton, Hidden, Drawer, List, ListItem, ListItemText, Typography, TextField, Button, Snackbar, Slide } from "@material-ui/core";
import { Menu } from '@material-ui/icons';

import LoadingScreen from "../components/shared/LoadingScreen";
import ProfilePicture from "../components/shared/ProfilePicture";
import Layout from "../components/shared/Layout";

import { useEditProfilePageStyles } from "../styles";
import handleImageUpload from "../utils/handleImageUpload";

function EditProfilePage({ history }) {
  // hooks
  const classes = useEditProfilePageStyles();
  
  // context
  const { currentUserId } = React.useContext(UserContext);

  // query
  const variables = { id: currentUserId };
  const { data, loading } = useQuery(GET_EDIT_PROFILE_INFO, { variables });

  // state and variables
  const [showDrawer, setDrawer] = React.useState(false);
  const path = history.location.pathname;

  if (loading) return <LoadingScreen />

  function handleToggleDrawer() {
    setDrawer(prev => !prev);
  }

  const options = [
    "Edit Profile",
    "Change Password",
    "Apps and Websites",
    "Email and SMS",
    "Push Notification",
    "Manage Contacts",
    "Privary and Security",
    "Login Activity",
    "Emails from Instagram"
  ]

  function handleSelected(index) {
    switch(index) {
      case 0:
        return path.includes('edit')
      default:
        break;
    }
  }

  function handleListClicked(index) {
    switch(index) {
      case 0:
        history.push('/accounts/edit')
        break;
      default:
        break;
    }
  }

  const drawer = (
    <List>
      {
        options.map((option, index) => (
          <ListItem
            key={option}
            button
            selected={handleSelected(index)}
            onClick={() => handleListClicked(index)}
            classes={{
              selected: classes.listItemSelected,
              button: classes.listItemButton
            }}
          >
            <ListItemText primary={option} />
          </ListItem>
        ))
      }
    </List>
  )

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
        <IconButton edge="start" onClick={handleToggleDrawer} className={classes.menuButton}>
          <Menu />
        </IconButton>
        <nav>
          {/** Mobile View **/}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={showDrawer}
              onClose={handleToggleDrawer}
              classes={{ paperAnchorLeft: classes.temporaryDrawer }}
            >
              {drawer}
            </Drawer>
          </Hidden>

          {/** Mobile View **/}
          <Hidden xsDown implementation="css" className={classes.permanentDrawerRoot}>
            <Drawer
              variant="permanent"
              open
              classes={{ 
                paper: classes.permanentDrawerPaper,
                root: classes.permanentDrawerRoot
               }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main>
          {
            path.includes('edit') && <EditUserInfo user={data.users_by_pk} />
          }
        </main>

      </section>
    </Layout>
  );
}

const DEFAULT_ERROR = {type: '', message: ''};

/**
 * Component displayed to the right of the drawer when Edit Profile is selected
 *  Allows users to update their name, username, website, bio, email, 
 *  phone number, and profile picture
 * 
 * @param {*} param0 
 */
function EditUserInfo({ user }) {
  // hooks
  const classes = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const [editUser] = useMutation(EDIT_USER);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);

  // context
  const { updateEmail } = React.useContext(AuthContext);

  // state 
  const [error, setError] = React.useState(DEFAULT_ERROR);
  const [open, setOpen] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState(user.profile_image)

  /**
   * Async function for submitting form
   *  function is passed in to handleSubmit function from useForm hook
   *  function attempts to update email on firebase first, as we dont want to 
   *  persist changes to postgress (heroku) if firebase fails; 
   *  if firebase update succeeds, function calls editUser query passing in variables
   *  from the form + the user.id as an object
   *  function then displays a message notifying user their profile has been updated
   * 
   * @param {Object} inputObject - inputObject comes from HOC and contains input
   *                               and password attributes from form
   */
  async function onSubmit(data) {
    try {
      setError(DEFAULT_ERROR);
      const variables = { ...data, id: user.id };
      // update email on firebase side
      await updateEmail(data.email);
      // update email on hasura side
      await editUser({ variables });
      // show snackbar
      setOpen(true);
    } catch(err) {
      console.error('Error updating profile', err);
      handleError(err);
    }
  }
  
  /**
   * Function for setting error message from submitting form
   *  Cleans up Firebase errors for presentation to the user
   *  Within the corresponding section item
   * 
   * @param {Object} error - error object from loginWithEmailAndPassword
  */
  function handleError(error) {
    if (error.message.includes('users_username_key')) {
      setError({ type: "username", message: "This username already taken" });
    } else if (error.code?.includes("auth")) {
      setError({ type: "email", message: error.message });
    } else {
      console.log("FAILED TO CATCH ERROR", error)
      setError({ type: 'other', message: 'Error'})
    }
  }

  async function handleUpdateProfilePic(event) {
    try {
      const url = await handleImageUpload(event.target.files[0], 'finstagram-avatar');
      const variables = { id: user.id, profileImage: url };
      await editUserAvatar({ variables });
      setProfileImage(url);
      setOpen(true)
    } catch(err) {
      console.error('Error uploading image', err)
      handleError(err);
    } 
  }

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} image={profileImage} />

        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>{user.username}</Typography>
          <input 
            accept="image/*"
            id="image"
            type="file"
            style={{ display: 'none' }}
            onChange={handleUpdateProfilePic}
          />
          <label htmlFor="image">
            <Typography color="primary" variant="body2" className={classes.typographyChangePic}>Change Profile Picture</Typography>
          </label>
        </div>
      </div>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionItem 
          text="Name" 
          formItem={user.name} 
          name="name" 
          inputRef={register({
            required: true,
            minLength: 5,
            maxLength: 20
          })} 
        />
        <SectionItem 
          text="Username" 
          formItem={user.username} 
          name="username" 
          error={error}
          inputRef={register({
            required: true,
            pattern: /^[a-zA-Z0-9_.]*$/,
            minLength: 5,
            maxLength: 20
          })}
        />
        <SectionItem 
          text="Website" 
          formItem={user.website} 
          name="website" 
          inputRef={register({
            validate: input => Boolean(input) ? isURL(input, {
              protocols: ['http', 'https'],
              require_protocol: true
            }) : true
          })}
        /> 

        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.bio}>Bio</Typography>
          </aside>
          <TextField
            name="bio"
            inputRef={register({
              maxLength: 120
            })}
            variant="outlined" 
            multiline 
            rowsMax={3}
            rows={3}
            fullWidth
            defaultValue={user.bio} 
          />
        </div>

        <div className={classes.sectionItem}>
          <div />
          <Typography color="textSecondary" className={classes.justifySelfStart}>Personal Information</Typography>
        </div>

        <SectionItem 
          text="Email" 
          formItem={user.email} 
          type="email" 
          name="email" 
          error={error}
          inputRef={register({
            required: true,
            validate: input => isEmail(input)
          })}
        />
        <SectionItem 
          text="Phone Number" 
          formItem={user.phone_number} 
          name="phoneNumber" 
          inputRef={register({
            validate: input => Boolean(input) ? isMobilePhone(input) : true
          })}
        />
        <div className={classes.sectionItem}>
          <div />
          <Button variant="contained" color="primary" type="submit" className={classes.justifySelfStart}>Submit</Button>
        </div>
      </form>
      <Snackbar 
        open={open}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        onClose={() => setOpen(false)}
        message={"Profile Updated!"}
      />
    </section>
  );
}

/**
 * Component used to display label to the left of the input textfield 
 * 
 * @param {type, text, formItem, inputRef, name, error} 
 */
function SectionItem({ type="text", text, formItem, inputRef, name, error }) {
  const classes = useEditProfilePageStyles();

  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align="right">{text}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography}>{text}</Typography>
        </Hidden>
      </aside>

      <TextField 
        name={name}
        inputRef={inputRef}
        helperText={error?.type === name && error.message }
        variant="outlined" 
        fullWidth 
        defaultValue={formItem} 
        type={type} 
        className={classes.textField}
        inputProps={{
          className: classes.textFieldInput
        }}
      />
    </div>
  )
}

export default EditProfilePage;
