import { useEffect } from 'react';

import useAxios from 'src/hooks/use-axios';
import { parseNotificationsCount } from 'src/types/Notification';

import { useAppContext } from './AppContext';

export type NotificationsContextType = {
  count: number;
  refetch: () => void;
};

export const useNotificationsContext = () => {
  const [{ data: count }, refetch] = useAxios('/api/notification/me/count', parseNotificationsCount, { manual: true });

  const appCtx = useAppContext();
  const user = appCtx?.user.user;

  useEffect(() => {
    if (user)
      refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    count,
    refetch,
  };
};

export const useNotifications = () => {
  const { notifications } = useAppContext();

  return notifications;
};