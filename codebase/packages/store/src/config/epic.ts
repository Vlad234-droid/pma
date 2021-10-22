import { combineEpics } from 'redux-observable';
import userEpic from '../entities/user/epic';
import objectiveEpic from '../entities/objective/epic';
import schemaEpic from '../entities/schema/epic';

export const rootEpic = combineEpics(userEpic, schemaEpic, objectiveEpic);
