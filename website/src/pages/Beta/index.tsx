/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react';

import './Beta.scss';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import hereWeAre from './images/here-we-are-infography.png';
import logoFacebook from './images/logo-facebook.png';
import logoTwitter from './images/logo-twitter.png';
import imageEmail from './images/email.png';
import { withEnv } from 'src/utils/env';

const SeeMore: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        height: open ? 'auto' : 200,
        overflow: 'hidden',
      }}
      onClick={() => setOpen(true)}
    >
      { !open && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(#FFF6, #FFFC 30%, #FFFF)',
            textAlign: 'center',
            paddingTop: 60,
            textTransform: 'uppercase',
            fontSize: '2.2em',
            fontWeight: 'bold',
            color: '#446A',
            fontFamily: 'Noticia Text',
            cursor: 'pointer',
          }}
        >
          <span style={{ textShadow: '-4px 4px #0002' }}>En savoir plus</span>
        </div>
      ) }
      { children }
    </div>
  );
};


const Beta: React.FC = withEnv(({ FIREFOX_ADDON_STAGING_URL, CHROME_EXTENSION_STAGING_URL }) => (
  <>
    <Image src="https://i.imgflip.com/45st4i.jpg" className="we-need-you" alt="we need you" style={{ marginLeft: 80 }}></Image>

    <h2>Zétécom bêta</h2>

    <p>
      Nous, qui mettons en place le projet Zétécom, avons besoin de vous ! Que vous soyez un homme, une femme, jeune, vieux, zététicien ou non, ou même géologue, <strong>votre avis nous intéresse</strong> !
    </p>

    <p>
      Pour mieux comprendre vos besoins et développer un outil qui vous sera vraiment utile, nous avons besoin d'avoir une vision assez nette de l'impact que ce projet peut vous apporter.
      Cela se fait en deux temps :
    </p>

    <ul>
      <li>une phase d'expérimentation, où vous pouvez tester l'extension dans tous les sens</li>
      <li>une étape de retours, où vous nous expliquer ce qui n'a pas fonctionné comme attendu ou ce qui peut être amélioré</li>
    </ul>

    <p>
      Les inscriptions sur l'extension sont ouvertes à tous, mais faire des tests tout en respectant la charte n'est certainement pas idéal.
      Pour palier ce problème, une autre version de l'extension est disponible, une version "bac-à-sable", ou "staging", permettant de tester le système sans affecter la version "officielle".
    </p>

    <p>
      <a href={FIREFOX_ADDON_STAGING_URL}>Installer l'addon Firefox "Zétécom (staging)"</a>
    </p>

    <p>
      <a href={CHROME_EXTENSION_STAGING_URL}>Installer l'extension Chrome "Zétécom (staging)"</a>
    </p>

    Dès que l'installation est terminée, vous faite partie des bêta-testeurs ! Nous attendons alors vos retours avec impatience 😃 !

    <SeeMore>
      <More />
    </SeeMore>
  </>
));

const More: React.FC = withEnv(({ TWITTER_ACCOUNT, FACEBOOK_PAGE, CONTACT_EMAIL }) => (
  <>
    <p>
      Notre objectif est avant tout de proposer un outil qui pourra servir à une communauté en quête d'esprit critique par rapport aux informations présentes sur internet.
      Si vous n'êtes pas venu ici dans le but de donner un coup de pouce au projet, alors la suite de cette page ne vous intéressera probablement pas 🙂.
    </p>

    <p>
      Si vous pensez à des proches que cette initiative peut intéresser, n'hésitez pas à en parler et / ou à partager cette page !
    </p>

    <div style={{ clear: 'right' }} />

    <h3>Zétécom, on en est où ?</h3>

    <p>
      Actuellement, une première version fonctionnelle de l'extension est développée, mais il n'y a pas encore de communauté active qui fait vivre le projet. La timeline en image :
    </p>

    <a href={hereWeAre}>
      <Image src={hereWeAre} alt="on en est là" className="hereWeAre" />
    </a>

    <h3>A propos de l'extension staging</h3>

    <p>
      Le but de la version staging est de pouvoir faire tester le système et les nouvelles fonctionnalités aux bêta-testeurs avant de les rendre disponible sur la version de production.
    </p>

    <p>
      <strong>Sur la version staging :</strong>
    </p>

    <ul className="nobullet">
      <li>il n'est pas nécessaire de respecter la charte ;</li>
      <li>aucun email n'est envoyé (pas de validation d'adresse email par exemple) ;</li>
      <li>n'installez pas les deux extensions simultanément, sinon les zonnes de commentaires apparaîtront deux fois 😬 ;</li>
      <li>des zones de commentaires de test sont ouvertes sur certaines pages seulement :</li>
    </ul>

    <ul className="comments-zones-links">
      <li>YouTube : <a href="https://www.youtube.com/watch?v=LB2sVSD5LhM">Sciences, Média & Foutaises (TenL#81)</a> (la Tronche en Biais)</li>
      <li>LeMonde.fr : <a href="https://www.lemonde.fr/pixels/article/2020/04/05/coronavirus-le-risque-est-d-entrer-dans-une-nouvelle-ere-de-surveillance-numerique-invasive_6035640_4408996.html">Coronavirus : le risque est d’entrer dans « une nouvelle ère de surveillance numérique invasive »</a></li>
    </ul>

    <small>
      Les commentaires présents sur la vidéo de la Tronche en Biais sont majoritairement repris de la zone de commentaires originale.
      Vous pouvez également demander l'ouverture de nouvelles zones de commentaires de test.
    </small>

    <h3>Quels points aborder ?</h3>

    <p>
      Vous êtes bien sur libre de nous dire tout ce que vous pensez du projet : ce qui vous plait, mais aussi (et surtout !) les axes d'amélioration.
      Voici par exemple quelques points sur lesquels il y a matière à réfléchir :
    </p>

    <ul>
      <li><strong>L'extension</strong>, son utilisation et son ergonomie (création de compte, lecture et publication de commentaires, signalement...)</li>
      <li><strong>Le site web</strong>, la façon dont il présente le projet, les mots utilisés, mais aussi sa forme, son apparence</li>
      <li><strong>La charte</strong>, la pertinence et la formulation des règles</li>
      <li><strong>Le projet</strong> de manière générale, le contexte dans lequel il se place et les solutions qu'il apporte</li>
    </ul>

    <h3>Merci !</h3>

    <p style={{ marginTop: 24 }}>
      Un grand merci à vous qui choisissez de nous prêter main forte dans cette aventure.
      Nous espérons de tout cœur que nos efforts porterons leurs fruits et que vous pourrez, via Zétécom, entretenir des discussions enrichissantes avec des personnes à l'écoute !
    </p>

    <p>
      Nous sommes disponibles pour échanger par message sur twitter, par mail, ou même pour en parler de vive voix via Skype ou "IRL" 🙂.
    </p>

    <div className="contacts">

      {TWITTER_ACCOUNT && (
        <Link openInNewTab href={`https://twitter.com/${TWITTER_ACCOUNT}`} className="twitter-link">
          <Image src={logoTwitter} alt="logo twitter" />
          <strong>@{TWITTER_ACCOUNT}</strong>
        </Link>
      )}

      {FACEBOOK_PAGE && (
        <Link openInNewTab href={`https://facebook.com/${FACEBOOK_PAGE}`} className="facebook-link">
          <Image src={logoFacebook} alt="logo facebook" />
          <strong>{FACEBOOK_PAGE}</strong>
        </Link>
      )}

      {CONTACT_EMAIL && (
        <a href={`mailto:${CONTACT_EMAIL}`} className="email-link">
          <Image src={imageEmail} alt="email" />
          <strong>{CONTACT_EMAIL}</strong>
        </a>
      )}

    </div>

    <p>
      Au fait, c'est qui "nous" ?<br />
      Nous sommes deux : je suis Nils, 27 ans, développeur web, je suis à l'initiative du projet. Mais je ne suis pas seul : Violaine, 28 ans, est elle aussi développeuse web et elle me donne un bon coup de main. Nous habitons ensemble à Aix-en-Provence.
    </p>
  </>
));

export default Beta;
