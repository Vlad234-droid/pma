//@ts-ignore
import { RootState } from 'typesafe-actions';

export const auditLogsSelector = (state: RootState) => state.auditLogs;
