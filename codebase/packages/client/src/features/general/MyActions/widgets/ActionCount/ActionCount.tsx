import React, { FC } from 'react';
import { colors, fontWeight, Rule, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { useTranslation } from 'components/Translation';
import { shallowEqual, useSelector } from 'react-redux';
import { getPendingEmployees } from '@pma/store';

const ActionCount: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { employeeWithPendingApprovals, employeePendingApprovals } =
    useSelector(getPendingEmployees, shallowEqual) || {};

  const waitingCount = employeeWithPendingApprovals?.length;
  const draftCount = employeePendingApprovals?.length;

  return (
    <>
      <TileWrapper customStyle={tileWrapperStyles}>
        <div data-test-id='actions' className={css(wrapperStyles)}>
          <div className={css(titleStyles)}>{t('your_actions', 'Your actions')}</div>
          <div className={css(contentStyles)}>
            <div className={css(blockStyles)}>
              <div className={css(countStyles, { color: colors.pending })}>{waitingCount}</div>
              <div className={css(subtitleStyles)}>{t('your_pending_actions', 'Your pending actions')}</div>
            </div>
            <div className={css(blockStyles)}>
              <div className={css(countStyles, { color: colors.base })}>{draftCount}</div>
              <div className={css(subtitleStyles)}>
                {t('your_colleagues_pending_actions', 'Your colleagues pending actions')}
              </div>
            </div>
          </div>
        </div>
      </TileWrapper>
    </>
  );
};

export default ActionCount;

const tileWrapperStyles: Rule = { minWidth: '350px' };

const wrapperStyles: Rule = {
  textAlign: 'center',
  padding: '24px',
};

const titleStyles: Rule = ({ theme }) => ({
  display: 'block',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  letterSpacing: '0px',
  paddingBottom: '10px',
  fontWeight: fontWeight.bold,
});

const contentStyles: Rule = {
  justifyContent: 'space-around',
  display: 'flex',
};

const blockStyles: Rule = { display: 'inline-block' };

const subtitleStyles: Rule = ({ theme }) => ({
  maxWidth: '128px',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
  color: colors.base,
});

const countStyles: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f28.fontSize}`,
  lineHeight: `${theme.font.fixed.f28.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: fontWeight.bold,
});
