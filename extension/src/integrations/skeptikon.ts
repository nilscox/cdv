import setupIntegration from '../integration';

const getElement = () => document.querySelector<HTMLElement>('my-video-comments');

const getIdentifier = (url: string) => {
  const match = /watch\/([-a-z0-9]+)/.exec(url);

  if (!match)
    return null;

  return ['skeptikon', match[1]].join(':');
};

setupIntegration({
  getElement,
  getIdentifier,
  healthcheck: () => true,
  type: 'switch',
  originalText: 'Commentaires Skepitkón',
  integrationText: 'Commentaires Zétécom',
  darkMode: true,
});
