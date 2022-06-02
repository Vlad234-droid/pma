import React, { FC } from 'react';
import { CreateRule, Modal, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';

export type CompletedReviewsModalProps = {
  onClose: () => void;
  review: any;
  scheme: any;
};

const ReviewModal: FC<CompletedReviewsModalProps> = ({ onClose, review, scheme: _scheme }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  return (
    <Modal
      modalPosition={mobileScreen ? 'bottom' : 'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: onClose,
        styles: [modalCloseOptionStyle({ mobileScreen })],
      }}
      title={{
        content: 'Completed Reviews',
        styles: [modalTitleOptionStyle({ mobileScreen })],
      }}
    >
      <div className={css({ height: '100%', width: '100%' })}>
        <div
          className={css({
            height: '100%',
            overflow: 'auto',
          })}
        >
          <div className={css(titleStyles)}>
            {t(`review_type_description_${review?.type?.toLowerCase()}`, ReviewType[review?.type], {
              num: review?.number,
            })}
          </div>
          <div className={css(subTitleStyles)}>
            <Icon
              graphic={'calender'}
              size={'20px'}
              iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
            />
            {t('full_date', `${review?.lastUpdatedTime}`, { date: new Date(review?.lastUpdatedTime) })}
          </div>
          {review.uuid}
        </div>
      </div>
    </Modal>
  );
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: '640px',
  padding: '36px',
  height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
  marginTop: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const modalCloseOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const modalTitleOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: theme.font.weight.bold,
    ...(mobileScreen
      ? {
          fontSize: `${theme.font.fixed.f20.fontSize}`,
          lineHeight: `${theme.font.fluid.f24.lineHeight}`,
        }
      : {
          fontSize: `${theme.font.fixed.f24.fontSize}`,
          lineHeight: `${theme.font.fluid.f28.lineHeight}`,
        }),
  };
};

const titleStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f24,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  color: theme.colors.tescoBlue,
  paddingBottom: '8px',
});

const subTitleStyles: Rule = ({ theme }) => ({
  display: 'flex',
  ...theme.font.fixed.f20,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
});

export default ReviewModal;
