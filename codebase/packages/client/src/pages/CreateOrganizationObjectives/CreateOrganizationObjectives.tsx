import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import StrategicDrivers from 'features/StrategicDrivers';

export type CreateUpdateObjectiveModalProps = {
  onClose: () => void;
  editNumber?: number;
};

const StrategicDriversPage: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css(main)}>
      {/* <LeftsideMenu /> */}
      <div className={css(page)}>
        <StrategicDrivers />
      </div>
    </div>
  );
};

const main: Rule = () => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  paddingRight: '20px',

  '@media(max-width: 600px)': {
    paddingRight: '0',
  },
});

const page: Rule = () => ({
  width: '100%',
  marginLeft: '15px',

  '@media(max-width: 600px)': {
    marginLeft: '0',
    paddingLeft: '15px',
  },
});

export default StrategicDriversPage;
