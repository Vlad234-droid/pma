import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesByCriteria, MessagesActions } from '@pma/store';
import { Status } from '../types';
import { MAX_COUNT } from '../config';
import { formatToRelativeDate } from 'utils';

type Props = {
  status: Status;
  initFetch?: boolean;
  page?: number;
  size?: number;
};

export const useMessages = ({ status, initFetch = false, page = 0, size = MAX_COUNT }: Props) => {
  const dispatch = useDispatch();
  const filterFn = (item) => item;

  const serializer = (item) => ({ ...item, sentAt: formatToRelativeDate(item.sentAt) });

  const sortFn = (i1, i2) => {
    const val1 = i1.sentAt;
    const val2 = i2.sentAt;
    return val1.localeCompare(val2);
  };

  const messages = useSelector(getMessagesByCriteria({ filterFn, serializer, sortFn, size }));

  useEffect(() => {
    initFetch && fetchMessages();
  }, [initFetch]);

  const fetchMessages = useCallback(() => {
    dispatch(MessagesActions.getMessages({ status, page, size }));
  }, [status, page, size]);

  return [messages, fetchMessages];
};
