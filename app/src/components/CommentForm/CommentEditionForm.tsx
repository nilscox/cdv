import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { Comment } from 'src/types/Comment';
import { trackEditComment } from 'src/utils/track';

import CommentForm, { ClearFormRef } from './CommentForm';

type CommentEditionFormProps = {
  comment: Comment;
  onEdited: (comment: Comment) => void;
  closeForm?: () => void;
};

const CommentEditionForm: React.FC<CommentEditionFormProps> = ({ comment, onEdited, closeForm }) => {
  const formRef = React.useRef<ClearFormRef>(null);

  const opts: AxiosRequestConfig = { method: 'PUT', url: `/api/comment/${comment.id}` };
  const [{ data, loading, error }, postComment] = useAxios(opts, { manual: true }, Comment);

  if (error) {
    throw error;
  }

  const onSubmit = (text: string) => postComment({ data: { text } });

  useEffect(() => {
    if (data) {
      trackEditComment();
      onEdited(data);

      if (formRef.current) {
        formRef.current.clear();
      }
    }
  }, [data, onEdited, formRef]);

  return (
    <CommentForm
      ref={formRef}
      placeholder="Éditez votre message..."
      preloadedMessage={comment.text}
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

export default CommentEditionForm;
