import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import UserReactionsList from './UserReactionsList';
import UserReactionsListWithInformation from './UserReactionsListWithInformation';
import Authenticated from 'src/dashboard/components/Authenticated';

const UserReactions: React.FC = () => (
  <Authenticated>

    <Typography variant="h4">Mes réactions</Typography>

    <Switch>
      <Route path="/reactions/:id" component={UserReactionsListWithInformation} />
      <Route path="/reactions" component={UserReactionsList} />
    </Switch>

  </Authenticated>
);

export default UserReactions;
