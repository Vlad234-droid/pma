import { createContext, useContext } from 'react';

import { useBreakpoints as hook } from '@energon-components/hooks';

import { BreakpointNames } from '../';

export const BreakpointsContext = createContext<Record<BreakpointNames, number>>({} as Record<BreakpointNames, number>);

export const { Provider: BreakpointsProvider } = BreakpointsContext;

export const useBreakpointsContext = () => useContext(BreakpointsContext);

export const useBreakpoints = () => hook(useBreakpointsContext());
