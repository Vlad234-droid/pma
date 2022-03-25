import { Response, Request } from 'express';
import NodeCache from 'node-cache';
import { getColleagueData, getColleagueUuid, getUserData, Optional, Plugin } from '@pma-connectors/onelogin';
import { PmaUserProfile } from '../../config/auth-data';
import { Colleague } from '@pma-connectors/colleague-api';

type ColleagueType = Pick<Colleague, 'colleagueUUID' | 'externalSystems'> &
  Partial<Pick<Colleague, 'contact' | 'serviceDates' | 'workRelationships'>>;

type Config<O> = {
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * optional, if true, token will be cashed on server and shared between sessions
   * defaults to true
   */
  cache?: boolean;

  /**
   * optional, cache Time-To-Live, in seconds
   * defaults to 6hrs (6 * 60 * 60)
   */
  cacheTtl?: number;
};

/**
 * Plugin cache instance
 */
const userRefreshCache = new NodeCache();

/**
 * A plugin middleware to be used in onelogin.
 * It gets the data from the colleauge API relies on identity data in response the object.
 */
export const userRefreshPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    const {
      shouldRun = () => true,
      cache = true,
      cacheTtl = 1 * 60 * 60, // 1 minute
    } = config;

    if (!shouldRun(req, res)) {
      return;
    }

    const colleagueUUID = getColleagueUuid(res);
    if (!colleagueUUID) {
      throw Error('No colleague UUID found');
    }

    if (cache) {
      const dniUserRefresh = userRefreshCache.get(colleagueUUID);
      if (typeof dniUserRefresh === 'string' && dniUserRefresh === 'REFRESHED') {
        return;
      }
    }

    let colleague: ColleagueType | undefined = getColleagueData(res);
    if (!colleague) {
      // if for some reason colleague data not found,
      // we are constructing user from data we should have

      const userData = getUserData<PmaUserProfile>(res);
      const employeeNumber = userData?.params?.employeeNumber;
      if (!employeeNumber) {
        throw Error('No Employee Number (IAM ID) found');
      }

      colleague = {
        colleagueUUID,
        externalSystems: { iam: { id: employeeNumber } },
      };
    }

    if (cache) {
      userRefreshCache.set(colleagueUUID, 'REFRESHED', cacheTtl);
    }
  };

  plugin.info = 'User Refresh plugin';
  plugin.optional = config.optional || false;

  return plugin;
};
