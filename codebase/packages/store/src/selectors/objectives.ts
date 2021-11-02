import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const objectivesSelector = (state: RootState) => state.objectives;
export const getObjectivesStatusSelector = createSelector(objectivesSelector, (objectives: any) => {
  const [objective] = objectives?.origin;
  return objective?.status;
});

export const getObjectivesStatusByNumberSelector = (number) =>
  createSelector(objectivesSelector, (objectives: any) => {
    const [objective] = objectives?.origin?.filter((obj) => obj.number === number);
    return objective?.status;
  });

export const isObjectivesInStatus = (status) =>
  createSelector(objectivesSelector, (objectives: any) => {
    const statuses = objectives.origin?.map((objective) => objective.status);

    return statuses.every((elem) => elem === status);
  });

export const isObjectivesNumberInStatus = (status: string, numbers: number[]) =>
  createSelector(objectivesSelector, (objectives: any) => {
    if (objectives?.origin?.length) {
      const statuses = objectives.origin
        ?.filter((objective) => numbers.includes(Number(objective.number)))
        ?.map((objective) => objective.status);

      return statuses.every((elem) => elem === status);
    }
    return false;
  });

export const isObjectivesOverMinUnderMaxMarkup = ({ max, min }) =>
  createSelector(objectivesSelector, (objectives: any) => {
    if (min <= objectives.origin?.length && max > objectives.origin?.length) {
      return true;
    }
    return false;
  });

export const getObjectivesSelector = createSelector(objectivesSelector, (objectives: any) => {
  const mapObjectives = {};
  if (objectives.origin.length) {
    objectives.origin?.forEach((objective) => {
      if (objective.properties?.mapJson) {
        mapObjectives[objective.number] = objective.properties.mapJson;
      }
    });
  }

  return {
    mapObjectives,
  };
});
export const getNextObjectiveNumberSelector = createSelector(objectivesSelector, (objectives: any) => {
  if (objectives?.origin?.length) {
    const number = objectives?.origin[objectives?.origin?.length - 1].number;
    return number + 1;
  }

  return 1;
});
export const objectivesMetaSelector = createSelector(objectivesSelector, ({ meta }) => meta);
