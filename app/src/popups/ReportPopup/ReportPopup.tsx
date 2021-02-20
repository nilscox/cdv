import React from 'react';

import styled from '@emotion/styled';
import { RouteComponentProps } from 'react-router-dom';

import Box from 'src/components/elements/Box/Box';
import Button from 'src/components/elements/Button/Button';
import Input from 'src/components/elements/Input/Input';
import { ExternalLink } from 'src/components/elements/Link/Link';
import Markdown from 'src/components/elements/Markdown/Markdown';
import Nested from 'src/components/elements/Nested/Nested';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import { useUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { fontSize, fontWeight, spacing, textColor } from 'src/theme';
import { Comment } from 'src/types/Comment';
import env from 'src/utils/env';

import useReport from './useReport';

const Container = styled.div`
  padding: ${spacing(5)};
`;

const Title = styled.div`
  margin: ${spacing(4, 0)};
  font-size: ${fontSize('xlarge')};
  font-weight: ${fontWeight('bold')};
`;

const Warning = styled.div`
  color: ${textColor('warning')};
`;

const ReportSuccess = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  font-weight: ${fontWeight('bold')};
`;

const ReportPopup: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const user = useUser();

  const [comment, { loading }] = useAxios<Comment>(`/api/comment/${match.params.id}`);
  const [{ loading: loadingReport, reported }, onReport] = useReport(comment);

  if (!user) {
    return <Box m={5}>Vous devez être connecté.e pour signaler un commentaire.</Box>;
  }

  if (reported) {
    return <ReportSuccess>Le commentaire a été signalé, merci pour votre contribution ! 💪</ReportSuccess>;
  }

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <Container>
          <Title>Signaler le commentaire de {comment?.author.nick}</Title>

          <Warning>
            <strong>Vous êtes sur le point de signaler un commentaire.</strong>
            <p>
              Il est important de signaler les commentaires qui dérogent à{' '}
              <ExternalLink href={`${env.WEBSITE_URL}/charte.html`}>la charte</ExternalLink> : cela en informera les
              modérateurs qui pourront entreprendre une action en fonction de la situation.
            </p>
            <p>
              Cependant, être en désaccord avec un message n'est pas un motif valable pour la signaler, et abuser de la
              fonction de signalement de manière répété et sans raison valable peut entrainer une suspension de votre
              compte.
            </p>
          </Warning>

          <Box py={4}>
            <Nested>
              <Markdown markdown={comment?.text ?? ''} />
            </Nested>
          </Box>

          <Box my={4}>
            <Input
              as="textarea"
              large
              outlined
              fullWidth
              placeholder="Préciser en quelques mots le motif du signalement si nécessaire"
            />
          </Box>

          <Box flex justifyContent="center" my={4}>
            <Button size="large" loading={loadingReport} onClick={() => onReport()}>
              Signaler
            </Button>
          </Box>
        </Container>
      )}
    />
  );
};

export default ReportPopup;
