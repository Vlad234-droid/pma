import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { useStyle, Rule, CreateRule } from '@dex-ddl/core';

import { ReviewFormModal } from '../Modal';
import { TileWrapper } from 'components/Tile';
import { Icon, Graphics } from 'components/Icon';
import { TriggerModalButton } from 'features/Modal';

export type Props = {
  onClick: () => void;
  status?: Status;
  customStyle?: React.CSSProperties | {};
  description?: string;
};

export const TEST_ID = 'review-widget';

const ReviewWidget: FC<Props> = ({ customStyle, onClick, status, description }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const isStateless = !status;
  const isDraft = status === Status.DRAFT;
  const isPending = status === Status.PENDING;
  const isApproved = status === Status.APPROVED;
  const notApproved = !isApproved;

  const getContent = (): [Graphics, boolean, string] => {
    switch (true) {
      case isDraft:
        return ['roundPencil', true, t('draft', 'Draft')];
      case isApproved:
        return ['roundTick', false, t('approved', 'Completed [08 Sep 2020]')];
      case isPending:
        return ['roundClock', false, t('pending', 'Pending')];
      case isStateless:
      default:
        return ['roundAlert', true, t('alert', 'Your form is now available')];
    }
  };

  const [graphic, clickable, event] = getContent();

  const handleClick = () => {
    notApproved && onClick();
  };

  return (
    <TileWrapper customStyle={{ ...customStyle }}>
      <div className={css(wrapperStyle({ clickable }))} onClick={handleClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans i18nKey='mid_year_review'>Mid-year review</Trans>
            </span>
            <span className={css(descriptionStyle)}>{description}</span>
            <span
              className={css(descriptionStyle, {
                paddingTop: '16px',
                verticalAlign: 'middle',
              })}
            >
              {clickable ? (
                <Icon
                  graphic={graphic}
                  iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
              ) : (
                <Icon graphic={graphic} iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }} />
              )}
              {event}
            </span>
          </div>
        </div>
        <div className={css(bodyStyle)}>
          <div className={css(bodyBlockStyle)}>
            <TriggerModalButton
              name={t('fill_review_form', 'Fill Review Form')}
              title={t('mid_year_review_form', 'Mid-year review form')}
              customStyle={{
                border: `1px solid ${clickable ? theme.colors.white : theme.colors.tescoBlue}`,
                backgroundColor: clickable ? theme.colors.tescoBlue : theme.colors.white,
                color: clickable ? theme.colors.white : theme.colors.tescoBlue,
              }}
            >
              <ReviewFormModal />
            </TriggerModalButton>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: CreateRule<{ clickable: boolean }> =
  ({ clickable }) =>
  ({ theme }) => ({
    padding: '24px 30px',
    backgroundColor: clickable ? theme.colors.tescoBlue : theme.colors.white,
    color: clickable ? theme.colors.white : theme.colors.tescoBlue,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
    ...(clickable && {
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    }),
  });

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
  paddingTop: '14px',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '12px',
};

const descriptionStyle: Rule = {
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
};

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

export default ReviewWidget;
