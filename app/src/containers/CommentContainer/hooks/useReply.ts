import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useUpdatedCachedComment from 'src/containers/CommentContainer/hooks/useUpdateCachedComment';
import { useCommentsArea } from 'src/contexts/commentsAreaContext';
import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { Comment } from 'src/types/Comment';
import { Paginated } from 'src/types/Paginated';

const createReply = async (parent: Comment, commentsAreaId: number, text: string) => {
  const response = await axios.post<Comment>('/api/comment', { parentId: parent.id, commentsAreaId, text });

  return response.data;
};

const useAddReplyToParent = (parent: Comment) => {
  const queryClient = useQueryClient();
  const updateComment = useUpdatedCachedComment();

  return (reply: Comment) => {
    updateComment({
      ...parent,
      repliesCount: parent.repliesCount + 1,
    });

    queryClient.setQueryData<Paginated<Comment>>(['commentReplies', { commentId: parent.id }], old => {
      if (!old) {
        return {
          total: 1,
          items: [reply],
        };
      }

      return {
        total: old.total + 1,
        items: [reply, ...old.items],
      };
    });
  };
};

const useReply = (comment: Comment) => {
  const commentsArea = useCommentsArea();
  const addReplyToParent = useAddReplyToParent(comment);
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: submittingReply } = useMutation(
    (text: string) => createReply(comment, commentsArea.id, text),
    {
      onSuccess: reply => {
        addReplyToParent(reply);
        trackEvent(track.commentCreated());
      },
    },
  );

  return [mutate, { submittingReply }] as const;
};

export default useReply;
