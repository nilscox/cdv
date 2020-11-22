import React from 'react';

import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import { Redirect } from 'react-router-dom';

import Button from 'src/components/Button';
import { UserAvatarNick } from 'src/components/UserAvatar';
import { useCurrentUser } from 'src/contexts/UserContext';
import ChangePasswordField from 'src/popup/views/AuthenticatedView/ChangePasswordField';

import useLogout from './useLogout';

const AuthenticatedView: React.FC = () => {
  const user = useCurrentUser();
  const [{ loading }, logout] = useLogout();

  // TODO: <Authenticated />
  if (!user) {
    return <Redirect to="/popup/connexion" />;
  }

  return (
    <>
      <Box marginTop={2} paddingY={2}>
        <UserAvatarNick user={user} />
      </Box>

      <Typography>Email : {user.email}</Typography>
      <Typography>Inscrit(e) depuis le : {dayjs(user.signupDate).format('DD MM YYYY')}</Typography>

      <Box paddingY={2}>
        <ChangePasswordField />
      </Box>

      <Button loading={loading} onClick={() => logout()}>
        Déconnexion
      </Button>
    </>
  );
};

export default AuthenticatedView;
