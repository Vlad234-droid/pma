import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessagesActions, getMessagesCount } from '@pma/store';
import { Status } from '../types';
import { DEFAULT_SENDER_NAME } from '../config';

type Props = {
  status: Status;
  initFetch?: boolean;
};

export const useMessagesCount = ({ status, initFetch = true }: Props): [number, () => void] => {
  const dispatch = useDispatch();
  const count = useSelector(getMessagesCount);

  useEffect(() => {
    initFetch && fetchMessagesCount();
  }, [initFetch]);

  const fetchMessagesCount = useCallback(() => {
    dispatch(MessagesActions.getMessagesCount({ status, senders: DEFAULT_SENDER_NAME }));
  }, [status]);

  return [count, fetchMessagesCount];
};
