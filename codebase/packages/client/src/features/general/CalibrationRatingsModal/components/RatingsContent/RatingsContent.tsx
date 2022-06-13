import React, { FC } from 'react';
import { InfoBlock } from './InfoBlock';
import { RatingForm } from '../RatingForm';
import { RatingInfo } from '../RatingInfo';
import { Modes } from '../../CalibrationRatingsModal';

//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀// TODO: temporary solution
const RatingsContent: FC<{ setStatus: (S) => void; mode: Modes | null; setMode: (M) => void; data: any }> = ({
  setStatus,
  mode,
  setMode,
  data,
}) => {
  return (
    <>
      <InfoBlock mode={mode} />
      {mode === Modes.SUBMIT ? <RatingForm setStatus={setStatus} /> : <RatingInfo data={data} setMode={setMode} />}
    </>
  );
};

export default RatingsContent;
