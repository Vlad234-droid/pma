import { ReviewType } from './enum';

export interface ActionParams {
  pathParams?: any;
}

export interface ActionGetParams {
  searchParams?: any;
}

export interface ActionPostData {
  data?: any[];
}

export interface ReviewActionParams extends ActionParams, ActionPostData, ActionGetParams {
  pathParams: { colleagueUuid?: string; type?: ReviewType; cycleUuid: string; number?: number; status?: string };
}
