import React from 'react';

import AsyncContent from 'src/components/AsyncContent';
import { CommentCreationForm } from 'src/components/CommentForm';
import CommentsList from 'src/components/CommentsList';
import Fallback from 'src/components/Fallback';
import FiltersBar from 'src/components/FiltersBar';
import Text from 'src/components/Text';
import { useCommentsArea } from 'src/contexts/CommentsAreaContext';
import { SearchQueryProvider } from 'src/contexts/SearchQueryContext';
import { useCurrentUser } from 'src/contexts/UserContext';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import { parseComment } from 'src/types/Comment';
import { SortType } from 'src/types/SortType';

import Padding from '../../components/Padding';

const CommentsArea: React.FC = () => {
  const user = useCurrentUser();
  const commentsArea = useCommentsArea();

  const [
    { loading, data, total },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
  ] = useAxiosPaginated(`/api/comments-area/${commentsArea.id}/comments`, parseComment);

  const [comments, { prepend }] = useEditableDataset(data);

  return (
    <>
      <FiltersBar
        sort={{ type: sort || SortType.DATE_DESC, onChange: setSort }}
        onSearch={setSearch}
        page={page}
        pageSize={10}
        total={total}
        onPageChange={setPage}
      />

      { user && (
        <Padding top>
          <CommentCreationForm onCreated={comment => prepend(comment)} />
        </Padding>
      ) }

      <SearchQueryProvider value={search || undefined}>
        <AsyncContent
          loading={loading || !comments}
          render={() => (
            <Fallback
              when={comments.length === 0}
              fallback={
                <Text uppercase color="textLight">
                  { !search && <>Aucun commentaire n'a été publié pour le moment.</> }
                  { search && !loading && <>Aucun résultat ne correspond à cette recherche</> }
                </Text>
              }
              render={() => (
                <Padding top>
                  <CommentsList comments={comments} />
                </Padding>
              )}
            />
          )}
        >
        </AsyncContent>
      </SearchQueryProvider>

    </>
  );
};

export default CommentsArea;
