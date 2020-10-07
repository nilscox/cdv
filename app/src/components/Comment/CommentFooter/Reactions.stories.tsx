import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import { ReactionType } from 'src/types/Comment';

import makeComment from '../../../test/makeComment';
import withUser from '../../../utils/storybook/withUser';

import Reaction from './Reaction';
import Reactions from './Reactions';

export default {
  title: 'Reactions',
  decorators: [withUser],
};

export const reaction = () => (
  <Reaction
    userReaction={boolean('is user reaction', false)}
    type={ReactionType.APPROVE}
    count={42}
    onUpdate={action('update')}
  />
);

export const reactions = () => <Reactions comment={makeComment()} />;
