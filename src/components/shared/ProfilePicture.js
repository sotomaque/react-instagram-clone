import React from "react";
import { useProfilePictureStyles } from "../../styles";
import { Person } from '@material-ui/icons';

function ProfilePicture({ size, 
  image = "https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/72873649_496638094222254_1079803740841574400_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=t1gSAoH8q4EAX-D70LL&oh=6b37dcf73305f88e81a6bb4112ad46c9&oe=5EB61702",
  isOwner }) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return <section className={classes.section}>{
    image ? (
      <div className={classes.wrapper}>
        <img src={image} alt="user profile" className={classes.image} />
      </div>
    ) : (
      <div className={classes.wrapper}>
        <Person className={classes.person} />
      </div>
    )
  }</section>;
}

export default ProfilePicture;
