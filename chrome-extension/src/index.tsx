import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import Popup from './Popup';
import { Wormhole } from './types/Wormhole';
import { Provider as WormholeProvider } from './contexts/WormholeContext';
import WormholeIFrame from './components/WormholeIFrame';

import './index.css';

const App = () => {
  const [wormhole, setWormhole] = useState<Wormhole | null>(null);

  return (
    <WormholeProvider value={wormhole}>
      <Router>
        <Popup />
      </Router>
      <WormholeIFrame setWormhole={setWormhole} />
    </WormholeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();