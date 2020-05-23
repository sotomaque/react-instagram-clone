import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from '../components/shared/Layout';
import UserCard from "../components/shared/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import { Hidden } from '@material-ui/core';
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
import { UserContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_FEED } from "../graphql/queries";
import usePageBottom from "../utils/usePageBottom";
// lazy load the component only when we need it
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed, setEndOfFeed] = React.useState(false);
  const { me, feedIds } = React.useContext(UserContext)
  const variables = { feedIds, limit: 2 };
  const { data, loading, fetchMore } = useQuery(GET_FEED, { variables });
  const isPageBottom = usePageBottom();

  const handleUpdateQuery = React.useCallback((prev, { fetchMoreResult}) => {
    if (fetchMoreResult.posts.length === 0) {
      setEndOfFeed(true);
      return prev;
    }

    return { posts: [...prev.posts, ...fetchMoreResult.posts] }
  }, []);

  React.useEffect(() => {
    if (!isPageBottom || !data) return

    const lastTimestamp = data.posts[data.posts.length - 1].created_at;
    const variables = {
      feedIds, 
      limit: 2,
      lastTimestamp
    }
    fetchMore({ variables, updateQuery: handleUpdateQuery });
  }, [isPageBottom, data, handleUpdateQuery, fetchMore, feedIds])


  if (loading) return <LoadingScreen />

  return (
    <Layout>
      <div className={classes.container}>
        {/* Feed Post */}
        <div>
          { 
           data.posts.map((post, index) => (
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
              <UserCard user={me} avatarSize={50} />
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
