import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from '../components/shared/Layout';
import UserCard from "../components/shared/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import { getDefaultPost } from '../data';
import { Hidden } from '@material-ui/core';
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
// lazy load the component only when we need it
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed] = React.useState(false);

  let loading = false;
  if (loading) return <LoadingScreen />

  return (
    <Layout>
      <div className={classes.container}>
        {/* Feed Post */}
        <div>
          { 
            Array.from({ length: 5 }, () => getDefaultPost())
              .map((post, index) => (
                <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                  <FeedPost post={post} index={index} />
                </React.Suspense>
              ))
          }
        </div>
        
        {/* Side Bar */}
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>

        {/* Fetching more posts Spinner */}
        {
          !isEndOfFeed && <LoadingLargeIcon />
        }
      </div>
    </Layout>
  );
}

export default FeedPage;
