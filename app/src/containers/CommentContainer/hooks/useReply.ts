import { useCallback, useEffect } from 'react';

import { useCommentsArea } from 'src/contexts/commentsAreaContext';
import useAxios from 'src/hooks/useAxios';
import { Comment } from 'src/types/Comment';

const useReply = (comment: Comment, onSubmitted: (reply: Comment) => void) => {
  const commentsArea = useCommentsArea();

  const [reply, { loading }, onReply] = useAxios<Comment>(
    {
      method: 'POST',
      url: '/api/comment',
      params: { parentId: comment.id },
    },
    { manual: true },
  );

  useEffect(() => {
    if (reply) {
      onSubmitted(reply);
    }
  }, [reply, onSubmitted]);

  const handleReply = useCallback(
    (text: string) => {
      return onReply({ data: { commentsAreaId: commentsArea?.id, text } });
    },
    [commentsArea, onReply],
  );

  return [{ loading }, handleReply] as const;
};

export default useReply;
