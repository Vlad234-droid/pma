import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { FormType } from '../constants/type';

export type Settings = {
  text: string;
  type: FormType;
};

type Data = {
  stepperLength: number;
  activeStepper: FormType;
  setActiveStepper: (T) => void;
  data: Array<Settings>;
  setData: (T) => void;
  handleNext: () => void;
};

const defaultData = {
  stepperLength: 0,
  activeStepper: FormType.GENERAL,
  setActiveStepper: () => null,
  data: [],
  setData: () => null,
  handleNext: () => null,
};

const PerformanceStepperContext = createContext<Data>(defaultData);

const { Provider, Consumer } = PerformanceStepperContext;

export const PerformanceStepperProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [stepperLength, setStepperLength] = useState<number>(0);
  const [activeStepper, setActiveStepper] = useState<FormType>(FormType.GENERAL);
  const [data, setData] = useState<Array<Settings>>([]);

  useEffect(() => {
    if (!data.length) return;
    setStepperLength(() => data.length);
  }, [data]);

  const handleNext = () => {
    if (activeStepper === FormType.GENERAL) return setActiveStepper(() => FormType.DETAILS);
    setActiveStepper(() => FormType.GENERAL);
  };

  return (
    <Provider value={{ stepperLength, activeStepper, setActiveStepper, setData, data, handleNext }}>
      {children}
    </Provider>
  );
};

export const PerformanceStepperConsumer = Consumer;
export { PerformanceStepperContext };
export const usePerformanceStepperContext = () => useContext(PerformanceStepperContext);
