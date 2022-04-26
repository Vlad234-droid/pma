import { Status } from 'config/enum';

export const getAdditionalFields = (query) => ({ 'statuses_in[0]': Status.APPROVED, year: query.year });

const _limit = 18;
const _start = 0;

export const initialFields: Record<'_start' | '_limit', number> = {
  _start,
  _limit,
};
