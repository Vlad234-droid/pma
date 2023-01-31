import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const TRACE_ID_HEADER = 'TraceId';
export const TESCO_TRACE_ID_HEADER = 'TescoTraceId';

export const isTraceIdAbsent = (req: Request): boolean => {
  const traceId = req.header(TRACE_ID_HEADER);
  return typeof traceId !== 'string';
};

export const getTraceId = (req: Request): string => {
  const traceId = req.header(TRACE_ID_HEADER);
  return typeof traceId === 'string' ? traceId : uuidv4();
};
