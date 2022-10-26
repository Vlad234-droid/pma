import { getCurrentYear, getLocalNow, getPrevYear } from 'utils';

const startMonth = 3;
export const isStartPeriod = () => getLocalNow().month >= startMonth;
export const getCurrentYearWithStartDate = () => (isStartPeriod() ? getCurrentYear() : getPrevYear(1));
