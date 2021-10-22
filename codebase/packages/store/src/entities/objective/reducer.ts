import { createReducer } from 'typesafe-actions';
import { getObjective, addObjective, createObjective, updateObjective, clearObjectiveData } from './actions';

// currentObjectives: { properties: {}, status: 'draft' } ??
export const initialState = {
  currentObjectives: {},
  formId: 'colleague_objectives_form',
  formVersion: 2,
  meta: { loading: false, loaded: false, error: null, status: null },
};

export default createReducer(initialState)
  .handleAction(getObjective.request, (state) => {
    console.log('getObjective handle');

    return {
      ...state,

      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(getObjective.success, (state, { payload }) => {
    console.log('payload', payload);
    let status; // todo check every status

    const mapObjectives = {};
    payload.forEach((objective) => {
      if (objective.properties?.mapJson) {
        mapObjectives[objective.number] = objective.properties.mapJson;
      }
      status = objective.status;
    });
    return {
      ...state,
      currentObjectives: mapObjectives,
      meta: { ...state.meta, loading: false, loaded: true, status },
    };
  })
  .handleAction(updateObjective.request, (state, { payload }) => {
    console.log('payload_request', payload);
    // todo remove to success
    return {
      ...state,
      meta: { ...state.meta, loading: true, error: null, loaded: false },
    };
  })
  .handleAction(updateObjective.success, (state, { payload }) => {
    console.log('updateObjective.success payload_payload', payload);
    const status = payload?.data[0]?.status;
    return {
      ...state,
      ...payload,
      objectivesStatus: 'submitted',
      meta: { ...state.meta, loading: false, loaded: true, status },
    };
  })
  .handleAction(addObjective, (state, { payload }) => ({
    ...state,
    currentObjectives: { ...state.currentObjectives, ...payload },
  }))
  .handleAction(clearObjectiveData, () => initialState);
