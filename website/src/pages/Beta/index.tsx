import React from 'react';

import './Beta.scss';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import hereWeAre from './images/here-we-are-infography.png';
import logoFacebook from './images/logo-facebook.png';
import logoTwitter from './images/logo-twitter.png';
import imageEmail from './images/email.png';

const Beta: React.FC = () => (
  <>
    <Image src="https://i.imgflip.com/45st4i.jpg" style={{ float: 'right', maxWidth: 230 }} alt="we need you"></Image>

    <h2>Rejoindre la beta</h2>

    <p>
      Nous, qui mettons en place le projet Zétécom, avons besoin de vous ! Que vous soyez un homme, une femme, jeune, vieux, zététicien ou non, ou même géologue, votre avis nous intéresse !
    </p>

    <p>
      Cela fait quelque temps que nous consacrons notre énergie à mettre en place cet outil, et nous avons maintenant besoin de retours et de tests pour affiner le système. Si vous n'êtes pas venu ici dans le but de nous donner un petit coup de pouce, alors la suite de cette page ne vous intéressera probablement pas. 🙂
    </p>

    <p>
      D'ailleurs, cette page n'est pas référencée et n'est pas destinée à être postée publiquement (sur facebook par exemple). En revanche, si vous pensez à des proches que cette initiative peut intéresser, n'hésitez pas à en parler et à leur partager !
    </p>

    <div style={{ clear: 'right' }} />

    <h3>Zétécom, on en est où ?</h3>

    <p>
      Actuellement, une toute première version de l'addon Firefox et de l'extension Chrome sont développés et fonctionnels. Mais les inscriptions ne sont pas encore ouvertes publiquement : il n'y a donc pour l'instant pas de communauté active qui fait vivre le projet.
      Une image vaut souvent mieux que mille mots :
    </p>

    <Image src={hereWeAre} alt="on en est là" className="hereWeAre" />

    <p>
      Notre objectif est de proposer un outil qui pourra servir à une communauté en quête d'esprit critique sur internet. Pour cela, nous cherchons à recueillir des retours de futurs utilisateurs, pour mieux comprendre leurs intérêts, leurs attentes, et ce que ce produit pourra leur apporter.
    </p>

    <p>
      Si vous souhaitez participer à la phase de beta, voici les quelques petites choses à savoir pour tester efficassement le produit.
    </p>

    <h3>Deux versions : test et production</h3>

    <p>
      Il existe deux versions de l'extension  :
    </p>

    <ul>
      <li>une version "production" : c'est la version officielle</li>
      <li>une version "staging" (ou de "test") : pour tester les évolutions avant de les rendre disponibles sur la version de production</li>
    </ul>

    <p style={{ marginTop: 24 }}>
      Celle à utiliser pour beta-tester l'extension est la version staging, disponible sur :
    </p>

    <Link openInNewTab href="https://staging.zetecom.fr" className="link-staging">https://staging.zetecom.fr</Link>

    <p>
      <strong>Sur version staging :</strong>
    </p>

    <ul className="nobullet">
      <li>Il n'est bien sûr pas nécessaire de respecter la charte.</li>
      <li>Aucun email n'est envoyé (pas de validation d'adresse email par exemple).</li>
      <li>Les commentaires existants sont majoritairement repris de la zone de commentaires originale.</li>
      <li>Des zones de commentaires de test sont ouvertes sur certaines pages seulement :</li>
    </ul>

    <ul className="comments-zones-links">
      <li>YouTube : <a href="https://img.youtube.com/vi/LB2sVSD5LhM/0.jpg">Sciences, Média & Foutaises (TenL#81)</a> (la Tronche en Biais)</li>
      <li>LeMonde.fr : <a href="https://img.lemde.fr/2020/04/05/0/0/1024/682/688/0/60/0/59bd152_JXxyTT9Py3J-R4jEx4-EW20I.jpg">Coronavirus : le risque est d’entrer dans « une nouvelle ère de surveillance numérique invasive »</a></li>
    </ul>

    <small>Nous pourrons ouvrir des zones de commentaires sur d'autres pages à la demande.</small>

    <h3>Quels points aborder ?</h3>

    <p>
      Vous êtes bien sur libre de nous dire tout ce que vous pensez du projet : les choses cool, les points d'améliorations, les bugs, vos idées... (les points d'améliorations étant très appréciés).
      Plus spécifiquement, voici quelques axes sur lesquels il y a matière à réfléchir :
    </p>

    <ul>
      <li><strong>L'extension</strong>, son utilisation sur la version de test (création de compte, envoi de message, signalement...)</li>
      <li><strong>Le site web</strong>, la façon dont il présente le projet, les mots utilisés, mais aussi sa forme, son apparence</li>
      <li><strong>La charte</strong>, la pertinence et la formulation des règles</li>
      <li><strong>Le projet</strong> de manière générale, le contexte dans lequel il se place et les solutions qu'il met en place</li>
    </ul>

    <h3>Merci !</h3>

    <p style={{ marginTop: 24 }}>
      Un grand merci à vous qui choisissez de nous prêter main forte dans cette aventure. Nous espérons de tout cœur que nos efforts porterons leurs fruits !  Nous sommes disponibles pour échanger par message sur twitter, par mail, ou même pour en parler de vive voix via Skype ou "IRL" 😁
    </p>

    <div className="contacts">

      <Link openInNewTab href="https://twitter.com/zetecom1" className="twitter-link">
        <Image src={logoTwitter} alt="logo twitter" width={80} />
        <strong>@zetecom1</strong>
      </Link>

      <Link openInNewTab href="https://facebook.com/zetecom3" className="facebook-link">
        <Image src={logoFacebook} alt="logo facebook" width={80} />
        <strong>zetecom3</strong>
      </Link>

      <a href="mailto:contact@zetecom.fr" className="email-link">
        <Image src={imageEmail} alt="email" width={80} />
        <strong>contact@zetecom.fr</strong>
      </a>

    </div>

    <p>
      Au fait, c'est qui "nous" ?<br />
      Nous sommes deux : je suis Nils, 27 ans, développeur web, je suis à l'initiative du projet. Mais je ne suis pas seul : Violaine, 28 ans, est elle aussi développeuse web et elle me donne un bon coup de main. Nous habitons ensemble à Aix-en-Provence.
    </p>

  </>
);

export default Beta;
