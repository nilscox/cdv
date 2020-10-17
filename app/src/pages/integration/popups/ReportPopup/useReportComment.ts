import { useEffect } from 'react';

import useAxios from 'src/hooks/use-axios';
import { Comment } from 'src/types/Comment';
import { trackReportComment } from 'src/utils/track';

const useReportComment = (onReported?: () => void) => {
  const [result, report] = useAxios(
    { method: 'POST', validateStatus: (status: number) => [201, 400].includes(status) },
    { manual: true },
  );

  const { error, raw, status } = result;

  const reported = status(201);
  const alreadyReported = status(400) && raw?.message === 'COMMENT_ALREADY_REPORTED';

  if (error || (status(400) && !alreadyReported)) {
    throw error;
  }

  useEffect(() => {
    if (status(201)) {
      trackReportComment();
      onReported?.();
    }
  }, [status, onReported]);

  const handleReport = (comment: Comment, message?: string) => {
    report({
      url: `/api/comment/${comment.id}/report`,
      data: {
        commentId: comment.id,
        message,
      },
    });
  };

  return [{ reported, alreadyReported }, result, handleReport] as const;
};

export default useReportComment;