import React from 'react';

import { Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import ChevronDown from '@material-ui/icons/KeyboardArrowDown';
import dayjs from 'dayjs';

import RouterLink, { Link } from 'src/components/Link';
import { CommentsArea } from 'src/types/CommentsArea';

import defaultCommentsAreaImage from './default-comments-area.png';

const imageRatio = 1.61803398875;

const useStyles = makeStyles<Theme, { folded?: boolean }>(({ breakpoints, spacing, palette }) => ({
  description: ({ folded }) => ({
    width: '100%',
    height: spacing(folded ? 20 : 40),
    padding: spacing(2),
    [breakpoints.down('md')]: {
      height: ({ folded }) => spacing(folded ? 20 : 30),
    },
  }),
  left: {
    height: '100%',
  },
  right: {
    flex: 1,
    paddingLeft: spacing(4),
  },
  image: ({ folded }) => ({
    width: spacing((folded ? 16 : 36) * imageRatio),
    height: '100%',
    objectFit: 'cover',
    [breakpoints.down('md')]: {
      width: ({ folded }) => spacing((folded ? 16 : 26) * imageRatio),
    },
  }),
  title: {
    color: palette.secondary.main,
    fontSize: '1.4em',
    fontWeight: 'bold',
    [breakpoints.down('md')]: {
      fontSize: '1.2em',
    },
  },
  author: {
    fontWeight: 'bold',
  },
  dateAndCommentsCount: ({ folded }) => ({
    marginTop: spacing(folded ? 0 : 2),
    marginLeft: spacing(folded ? 8 : 0),
  }),
  foldButton: ({ folded }) => ({
    padding: 0,
    cursor: 'pointer',
    transform: `rotate(${folded ? 90 : 0}deg)`,
    transition: 'transform 180ms ease-in-out',
  }),
  comments: {
    padding: spacing(2),
  },
}));

type LinkComponentProps = {
  commentsArea: CommentsArea;
  linkToInformation?: boolean;
};

const LinkComponent: React.FC<LinkComponentProps> = ({ commentsArea, linkToInformation, children }) => {
  if (linkToInformation) {
    return <Link href={commentsArea.informationUrl}>{children}</Link>;
  }

  return <RouterLink to={`/commentaires/${commentsArea.id}`}>{children}</RouterLink>;
};

type CommentsAreaDescriptionProps = {
  commentsArea: CommentsArea;
  folded?: boolean;
  toggleFolded?: (ctrlKey: boolean) => void;
  linkToInformation?: boolean;
};

const CommentsAreaDescription: React.FC<CommentsAreaDescriptionProps> = ({
  commentsArea,
  folded,
  toggleFolded,
  linkToInformation,
}) => {
  const classes = useStyles({ folded });

  const handleToggleFolded = (e: React.MouseEvent) => {
    toggleFolded?.(e.ctrlKey);
  };

  return (
    <Grid container className={classes.description}>
      <Grid item className={classes.left}>
        <LinkComponent commentsArea={commentsArea} linkToInformation={linkToInformation}>
          <img src={commentsArea.imageUrl || defaultCommentsAreaImage} className={classes.image} />
        </LinkComponent>
      </Grid>

      <Grid item className={classes.right}>
        <LinkComponent commentsArea={commentsArea} linkToInformation={linkToInformation}>
          <Typography className={classes.title}>{commentsArea.informationTitle}</Typography>
        </LinkComponent>

        <Grid container direction={folded ? 'row' : 'column'}>
          <Grid item>
            <Typography variant="body2" className={classes.author}>
              {commentsArea.informationAuthor}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.dateAndCommentsCount}>
              {commentsArea.published && dayjs(commentsArea.published).format('D MMMM YYYY')}
              {' - '}
              {commentsArea.commentsCount} commentaire{commentsArea.commentsCount !== 1 && 's'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {toggleFolded && (
        <Grid item>
          <IconButton disableRipple onClick={handleToggleFolded} className={classes.foldButton}>
            <ChevronDown fontSize="large" />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default CommentsAreaDescription;
