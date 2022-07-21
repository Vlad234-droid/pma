import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'components/Translation';
import { ReviewType, Status } from 'config/enum';
import { Button, colors, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { BasicFormModal } from 'components/BasicFormModal';
import { Icon } from 'components/Icon';
import { getReviewTypeContent, getContent } from './utils';
import { useTenant } from '../Permission';

export type Props = {
  onClick?: () => void;
  onClose?: () => void;
  reviewType: ReviewType;
  status?: Status;
  startTime?: string;
  endTime?: string;
  lastUpdatedTime?: string;
  customStyle?: React.CSSProperties | {};
  title: string;
};

export const TEST_ID = 'review-widget';

const ReviewWidget: FC<Props> = ({
  customStyle,
  reviewType,
  status = Status.NOT_STARTED,
  startTime,
  lastUpdatedTime,
  title,
}) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const tenant = useTenant();

  //todo fine way to use outside of feature
  const ReviewForm = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Review`).then((module) => ({ default: module.Review }))),
    [],
  );

  const [graphic, iconColor, background, shadow, hasDescription, content, buttonContent] = getContent(
    {
      status,
      startTime,
      lastUpdatedTime,
    },
    t,
  );

  const { reviewTypeContent } = getReviewTypeContent({ reviewType, status, t, tenant });

  const descriptionColor = background === 'tescoBlue' ? colors.white : colors.base;
  const titleColor = background === 'tescoBlue' ? colors.white : colors.tescoBlue;
  const buttonVariant = background === 'tescoBlue' ? 'default' : 'inverse';

  const handleClickOpen = () => {
    status !== Status.NOT_STARTED && setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  return (
    <TileWrapper customStyle={{ ...customStyle }} hover={shadow} boarder={shadow} background={background}>
      <div className={css(wrapperStyle)} onMouseDown={handleClickOpen} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle({ color: titleColor }))}>{title}</span>
            {hasDescription && (
              <span className={css(descriptionStyle({ color: descriptionColor }))}>{reviewTypeContent}</span>
            )}
            <span className={css(descriptionStyle({ color: descriptionColor }), iconWrapper)}>
              <Icon
                graphic={graphic}
                iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                backgroundRadius={12}
                fill={colors[iconColor]}
              />
              {content}
            </span>
          </div>
        </div>
        {status !== Status.NOT_STARTED && (
          <div className={css(bodyStyle)}>
            <div className={css(bodyBlockStyle)}>
              <Button
                mode={buttonVariant}
                styles={[buttonStyle({ inverse: buttonVariant === 'default' })]}
                onPress={handleClickOpen}
              >
                {buttonContent}
              </Button>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <BasicFormModal onClose={handleClickClose} title={title}>
          <ReviewForm reviewType={reviewType} onClose={handleClickClose} />
        </BasicFormModal>
      )}
    </TileWrapper>
  );
};

const wrapperStyle: Rule = {
  padding: '24px 30px',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
};

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
};

const titleStyle: CreateRule<{ color: string }> =
  ({ color }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f18,
    letterSpacing: '0px',
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    marginBottom: '12px',
    color,
  });

const descriptionStyle: CreateRule<{ color: string }> =
  ({ color }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    letterSpacing: '0px',
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color,
  });

const iconWrapper: Rule = ({ theme }) => ({
  paddingTop: '16px',
  display: 'flex',
  alignItems: 'center',
  lineHeight: theme.font.fixed.f18.lineHeight,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    border: `2px solid ${inverse ? theme.colors.white : theme.colors.tescoBlue}`,
    ...theme.font.fixed.f14,
    letterSpacing: '0px',
  });

export default ReviewWidget;
