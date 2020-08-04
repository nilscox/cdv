import React from 'react';

import Collapse from 'src/components/Collapse';
import Loader from 'src/components/Loader';
import Padding from 'src/components/Padding';
import CommentsList from 'src/components/CommentsList';
import { Comment } from 'src/types/Comment';

import FetchMoreReplies from './FetchMoreReplies';
import Indented from './Indented';

import { Box } from '@material-ui/core';

type RepliesProps = {
  replies: Comment[];
  displayReplies: boolean;
  loading: boolean;
  remainingRepliesCount: number;
  fetchMoreReplies: () => void;
};

const Replies: React.FC<RepliesProps> = (props) => {
  const { replies, displayReplies, loading, remainingRepliesCount, fetchMoreReplies } = props;

  return (
    <Collapse open={displayReplies}>

      { replies && replies.length > 0 && (
        <Padding top>
          <Indented>
            <CommentsList comments={replies || []} />
          </Indented>
        </Padding>
      ) }

      { loading && (
        <Box paddingTop={6}>
          <Loader />
        </Box>
      ) }

      { remainingRepliesCount > 0 && !loading && (
        <FetchMoreReplies
          remainingRepliesCount={remainingRepliesCount}
          fetchMoreReplies={fetchMoreReplies}
        />
      ) }

    </Collapse>
  );
};

export default Replies;