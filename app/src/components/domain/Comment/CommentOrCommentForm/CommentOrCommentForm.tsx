import React, { useState } from 'react';

import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import { Comment as CommentType } from 'src/types/Comment';

import CommentComponent from '../CommentComponent/CommentComponent';
import { ReactionType } from '../CommentFooter/Reactions/ReactionType';

type CommentOrCommentFormProps = {
  comment: CommentType;
  submittingEdition: boolean;
  repliesOpen: boolean;
  repliesLoading: boolean;
  replyFormOpen: boolean;
  onEdit?: (text: string) => void;
  onReport?: () => void;
  onSetReaction?: (type: ReactionType) => void;
  onToggleSubscription?: () => void;
  onToggleReplies?: () => void;
  onReply?: () => void;
};

const CommentOrCommentForm: React.FC<CommentOrCommentFormProps> = ({
  comment,
  submittingEdition,
  repliesOpen,
  repliesLoading,
  replyFormOpen,
  onEdit,
  onReport,
  onSetReaction,
  onToggleReplies,
  onReply,
  onToggleSubscription,
}) => {
  const [editing, setEditing] = useState(false);

  if (editing && onEdit) {
    return (
      <CommentForm
        type="edition"
        placeholder="Éditez votre message..."
        author={comment.author}
        initialText={comment.text}
        submitting={submittingEdition}
        onSubmit={onEdit}
        onClose={() => setEditing(false)}
      />
    );
  }

  return (
    <CommentComponent
      comment={comment}
      repliesOpen={repliesOpen}
      repliesLoading={repliesLoading}
      replyFormOpen={replyFormOpen}
      onEdit={onEdit ? () => setEditing(true) : undefined}
      onReport={onReport}
      onSetReaction={onSetReaction}
      onToggleReplies={onToggleReplies}
      onReply={onReply}
      onToggleSubscription={onToggleSubscription}
    />
  );
};

export default CommentOrCommentForm;
