//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const toastsSelector = (state: RootState) => state.toasts.data;
