import React, { useEffect } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';

import pages from './pages';
import NotFound from './pages/NotFound';
import PageHeader from './components/PageHeader';
import Navigation from './components/Navigation';
import PageFooter from './components/PageFooter';
import TrackingProvider, { TrackPageView } from './utils/TrackingProvider';

import 'fontsource-noticia-text/latin-400.css';
import 'fontsource-noticia-text/latin-700.css';

import 'fontsource-montserrat/latin-400.css';
import 'fontsource-montserrat/latin-600.css';

import 'reset-css';
import './styles.scss';

const Routes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      {pages.map(({ id, path, Component }) => (
        <Route key={id} exact path={path} component={Component} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const page = pages.find(({ path }) => path === location.pathname);

  return (
    <TrackingProvider>
      <TrackPageView />

      <div className="page" id={`page-${page ? page.id : 'not-found'}`}>
        <PageHeader />

        <div className="page-content">
          <Navigation />

          <main>
            <Routes />
          </main>
        </div>

        <PageFooter />
      </div>
    </TrackingProvider>
  );
};

export default App;
