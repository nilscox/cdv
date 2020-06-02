import React, { useContext, useEffect, useState } from 'react';

import { LocationDescriptorObject } from 'history';

import RouterLink from 'src/components/Link';
import Loader from 'src/components/Loader';
import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';
import useAxios from 'src/hooks/use-axios';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import { Notification, parseNotification } from 'src/types/Notification';

import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

type NotificationItemProps = {
  notification: Notification;
  seen: boolean;
  markAsSeen: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  fallbackMessage: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.secondary.light,
    fontSize: '1.4em',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, seen, markAsSeen }) => {
  const { information } = notification.subscription.reaction;
  const linkLocation: LocationDescriptorObject = { pathname: `/information/${information.id}/reactions` };

  if (!seen)
    linkLocation.state = { notificationId: notification.id };

  return (
    <ListItem>

      <ListItemText>
        <RouterLink to={linkLocation}>
          <strong>{ notification.actor.nick }</strong>{' '}
          a répondu à une réaction sur l'information{' '}
          <strong>{ information.title }</strong>
        </RouterLink>
      </ListItemText>

      { !seen && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={markAsSeen} data-testid="set-seen-icon">
            <DoneIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) }

    </ListItem>
  );
};

type FallbackMessageProps = {
  seen: boolean;
};

const FallbackMessage: React.FC<FallbackMessageProps> = ({ seen }) => {
  const classes = useStyles({});

  const getMessageText = () => {
    if (seen)
      return <>Aucunes notifications</>;

    return <>Aucunes nouvelles notifications</>;
  };

  return <div className={classes.fallbackMessage}>{ getMessageText() }</div>;
};

const useNotifications = (seen: boolean) => {
  const { refetch: refetchNotificationsCount } = useContext(NotificationsCountContext);

  const [{ data, loading }] = useAxiosPaginated(
    `/api/notification/me${seen ? '/seen' : ''}`,
    parseNotification,
  );
  const [{ status: setSeenStatus }, setSeen] = useAxios({
    method: 'POST',
  }, undefined, { manual: true });

  const [notifications, { remove }] = useEditableDataset(data);
  const [seenNotification, setSeenNotification] = useState<Notification | null>(null);

  const markAsSeen = (notification: Notification) => {
    if (seen)
      return;

    setSeenNotification(notification);
    setSeen({ url: `/api/notification/${notification.id}/seen` });
  };

  useEffect(() => {
    if (setSeenStatus(204)) {
      remove(seenNotification);
      setSeenNotification(null);
      refetchNotificationsCount();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeenStatus]);

  return {
    notifications,
    loading,
    markAsSeen,
  };
};

type NotificationsListProps = {
  seen: boolean;
};

const NotificationsList: React.FC<NotificationsListProps> = ({ seen = false }) => {
  const { notifications, loading, markAsSeen } = useNotifications(seen);
  const classes = useStyles({});

  if (loading || !notifications)
    return <Loader />;

  if (notifications.length === 0)
    return <FallbackMessage seen={seen} />;

  return (
    <Paper className={classes.paper}>
      <List dense>
        { notifications.map((notification, idx) => (
          <div key={notification.id}>
            <NotificationItem
              notification={notification}
              seen={seen}
              markAsSeen={() => markAsSeen(notification)}
            />
            { idx < notifications.length - 1 && <Divider /> }
          </div>
        )) }
      </List>
    </Paper>
  );
};

export default NotificationsList;
