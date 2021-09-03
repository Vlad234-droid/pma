import { combineEpics } from 'redux-observable';
import userEpic from '../entities/user/epic';

export const rootEpic = combineEpics(userEpic);
