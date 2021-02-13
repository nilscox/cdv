import React from 'react';

import { select, text } from '@storybook/addon-knobs';
import { toast } from 'react-toastify';

import ToastContainer from './index';

import 'react-toastify/dist/ReactToastify.min.css';

export default {
  title: 'Toast',
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <>
        <ToastContainer />
        {storyFn()}
      </>
    ),
  ],
};

export const toastStory = () => {
  const message = text('message', 'Hello !');
  const type = select('type', ['success', 'warning', 'error'], 'success');

  return <button onClick={() => toast[type](message)}>Trigger a toast</button>;
};