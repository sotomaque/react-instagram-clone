import React from "react";
import { useFollowSuggestionsStyles } from "../../styles";
import { Typography, Avatar } from "@material-ui/core";
import { LoadingLargeIcon } from "../../icons";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getDefaultUser } from "../../data";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

function FollowSuggestions({ hideHeader }) {
  const classes = useFollowSuggestionsStyles();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={classes.container}>
      {/* Header (only displayed when props is false) */}
      {
        !hideHeader &&
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.typography}
        >
          Suggestions for you
        </Typography>
      }
      {/* Component Body */}
      {
        loading ? (
          <LoadingLargeIcon />
        ) : (
          <Slider 
            className={classes.slide}
            dots={false}
            infinite
            speed={1000}
            touchThreshold={1000}
            variableWidth
            swipeToSlide
            arrows
            slidesToScroll={3}
            easing="ease-in-out"
            >
              {
                Array.from({ length: 10 }, () => getDefaultUser()).map((user, index) => (
                  <FollowSuggestionsItem user={user} key={index} />
                ))
              }
            </Slider>
        )
      }
    </div>
    );
}

function FollowSuggestionsItem({ user }) {
  const classes = useFollowSuggestionsStyles();
  const { profile_image, username, name } = user;

  return (
    <div>
      {/* User Card */}
      <div className={classes.card}>
        {/* Profile Picture */}
        <Link to={`/${username}`}>
          <Avatar
            src={profile_image}
            alt={`${username}'s profile`}
            classes={{
              root: classes.avatar,
              img: classes.avatarImg
            }}
          />
        </Link>
        <Link to={`/${username}`}>
          {/* Username */}
          <Typography
            variant='subtitle2'
            className={classes.text}
            align='center'
          >
            {username}
          </Typography>
          {/* Name */}
          <Typography
            color='textSecondary'
            variant='body2'
            className={classes.text}
            align='center'
          >
            {name}
          </Typography>
        </Link>
        <FollowButton side={false} />
      </div>
    </div>
  );
}
 

export default FollowSuggestions;
