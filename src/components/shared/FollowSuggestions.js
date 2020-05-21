import React from "react";
import { useFollowSuggestionsStyles } from "../../styles";
import { Typography, Avatar } from "@material-ui/core";
import { LoadingLargeIcon } from "../../icons";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { UserContext } from "../../App";
import { useQuery } from "@apollo/react-hooks";
import { SUGGEST_USERS } from "../../graphql/queries";

function FollowSuggestions({ hideHeader }) {
  const classes = useFollowSuggestionsStyles();
  const { me, followerIds } = React.useContext(UserContext)
  const variables = {
    limit: 20,
    followerIds,
    createdAt: me.created_at
  }
  const {data, loading} = useQuery(SUGGEST_USERS, { variables })

  console.log({ data })

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
                data.users.map( user => (
                  <FollowSuggestionsItem user={user} key={user.id} />
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
  const { profile_image, username, name, id } = user;

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
        <FollowButton id={id} side={false} />
      </div>
    </div>
  );
}
 

export default FollowSuggestions;
