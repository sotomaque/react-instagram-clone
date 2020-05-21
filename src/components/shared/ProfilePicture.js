import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_USER_AVATAR } from "../../graphql/mutations";
import { UserContext } from "../../App";

import { Person } from '@material-ui/icons';
import handleImageUpload from '../../utils/handleImageUpload';

import { useProfilePictureStyles } from "../../styles";

function ProfilePicture({ size, image, isOwner }) {
  // hooks
  const classes = useProfilePictureStyles({ size, isOwner });
  const { currentUserId } = React.useContext(UserContext);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);

  // state and local variables
  const [img, setImg] = React.useState(image);
  const inputRef = React.useRef();

  function openFileInput() {
    inputRef.current.click();
  }

  async function handleUpdateProfilePic(event) {
    const url = await handleImageUpload(event.target.files[0]);
    const variables = { id: currentUserId, profileImage: url };
    await editUserAvatar({ variables });
    setImg(url);
  }

  return (
    <section className={classes.section}>
      <input style={{ display: 'none'}} ref={inputRef} type='file' onChange={handleUpdateProfilePic} />
      {
        image ? (
          <div className={classes.wrapper} onClick={isOwner ? openFileInput: () => null}>
            <img src={img} alt="user profile" className={classes.image} />
          </div>
        ) : (
          <div className={classes.wrapper}>
            <Person className={classes.person} />
          </div>
        )
      }
    </section>
  );
}

export default ProfilePicture;
