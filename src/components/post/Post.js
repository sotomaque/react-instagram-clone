import React from "react";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { MoreIcon, CommentIcon, ShareIcon, UnlikeIcon, LikeIcon, RemoveIcon, SaveIcon } from '../../icons';
import { Link } from "react-router-dom";
import { Typography, Button, Hidden, Divider, TextField } from "@material-ui/core";
import { defaultPost } from '../../data';
import OptionsDialog from '../shared/OptionsDialog';
import PostSkeleton from './PostSkeleton';

function Post() {
  const classes = usePostStyles();
  const [showOptionsDialog, setOptionsDialog] = React.useState(false);
  const { id, media, likes, user, caption, comments } = defaultPost;
  const [loading, setLoading] = React.useState(true);

  setTimeout(() => setLoading(false), 2000);
  if (loading) return <PostSkeleton />

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>

        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon className={classes.moreIcon} onClick={() => setOptionsDialog(true)} />
        </div>

        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="Post Media" className={classes.image} />
        </div>

        {/* Post Buttons */}
        <div className={classes.postButtonsWrapper}>

          {/* Like, Comment, Share, Save buttons */}
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>

          {/* Likes Count */}
          <Typography className={classes.likes} variant='subtitle2'>
            <span>
              {
                likes === 1 ? '1 like' : `${likes} likes`
              }
            </span>
          </Typography>

          {/* Caption */}
          <div className={classes.postCaptionContainer}>
            <Typography
              variant="body2"
              component="span"
              className={classes.postCaption}
              dangerouslySetInnerHTML={{ __html: caption }}
            />
            {
              comments.map(comment => (
                <div key={comment.id}>
                  {/* Commenting User's Username */}
                  <Link to={`/${comment.user.username}`}>
                    <Typography
                      variant='subtitle2'
                      component='span'
                      className={classes.commentUsername}
                    >
                      {comment.user.username}
                    </Typography>{" "}
                    {/* Comment Body */}
                    <Typography
                      variant='subtitlbody2e2'
                      component='span'
                    >
                      {comment.content}
                    </Typography>
                  </Link>
                </div>
              ))
            }
          </div>

          {/* Date Posted Info */}
          <Typography color='textSecondary' className={classes.datePosted}>
            5 DAYS AGO
          </Typography>

          {/* Area to add a comment */}
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
          
        </div>

      </article>

      {/* Post Options Dialog */}
      {
        showOptionsDialog && <OptionsDialog onClose={() => setOptionsDialog(false)} />
      }
    </div>
  );
}

function LikeButton() {
  const classes = usePostStyles();
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className= liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike; 

  function handleLike() {
    setLiked(true);
  }

  function handleUnlike() {
    setLiked(false);
  }

  return (<Icon className={className} onClick={onClick} />);
}

function SaveButton() {
  const classes = usePostStyles();
  const [saved, setSaved] = React.useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave; 

  function handleSave() {
    setSaved(true);
  }

  function handleRemove() {
    setSaved(false);
  }

  return (<Icon className={classes.saveIcon} onClick={onClick} />);
}

function Comment() {
  const classes = usePostStyles();
  const [content, setContent] = React.useState('');

  return(
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={ event => setContent(event.target.value) }
        className={classes.textField}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }}
      />

      <Button
        color='primary'
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
