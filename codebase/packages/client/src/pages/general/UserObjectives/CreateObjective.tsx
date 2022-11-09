import React, { useMemo, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreateRule, Modal, useMedia } from '@pma/dex-wrapper';
import { useTenant } from 'features/general/Permission';
import { ModalWrapper } from 'components/ModalWrapper';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';
import { useSelector } from 'react-redux';
import { getNextReviewNumberSelector } from '@pma/store';
import { ReviewType } from 'config/enum';

const CreateObjective: FC = React.memo(() => {
  const tenant = useTenant();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { matchMedia } = useMedia();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const nextNumber = useSelector(getNextReviewNumberSelector(ReviewType.OBJECTIVE));

  const CreateUpdateObjectives = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/CreateUpdateObjectives`).then((module) => ({ default: module.default })),
      ),
    [],
  );

  const handleClose = () => navigate((state as any)?.backPath || buildPath(Page.REVIEWS));
  const onSuccessClose = () => navigate(buildPath(Page.REVIEWS_VIEW));

  return (
    <ModalWrapper isOpen={true}>
      <Modal
        modalPosition={'middle'}
        overlayColor={'tescoBlue'}
        modalContainerRule={[containerRule({ mobileScreen })]}
        closeOptions={{
          content: <Icon graphic='cancel' invertColors={true} />,
          onClose: handleClose,
          styles: [modalCloseOptionStyle({ mobileScreen })],
        }}
        title={{
          content: t('create_objectives', 'Create objectives'),
          styles: [modalTitleOptionStyle({ mobileScreen })],
        }}
      >
        <CreateUpdateObjectives onClose={handleClose} onSuccessClose={onSuccessClose} editNumber={nextNumber} create />
      </Modal>
    </ModalWrapper>
  );
});

const containerRule: CreateRule<{ mobileScreen }> =
  (props) =>
  ({ theme }) => {
    const { mobileScreen } = props;
    return {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      ...(mobileScreen
        ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 97px' }
        : { borderRadius: '32px', padding: `40px 0 112px` }),
      width: '640px',
      height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
      marginTop: '72px',
      marginBottom: mobileScreen ? 0 : '30px',
      background: theme.colors.white,
      cursor: 'default',
    };
  };

// TODO: Extract duplicate 13
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

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen }> =
  (props) =>
  ({ theme }) => {
    const { mobileScreen } = props;
    return {
      position: 'fixed',
      top: '22px',
      textAlign: 'center',
      left: 0,
      right: 0,
      color: theme.colors.white,
      letterSpacing: '0px',
      fontWeight: theme.font.weight.bold,
      ...(mobileScreen
        ? {
            fontSize: theme.font.fixed.f20.fontSize,
            lineHeight: theme.font.fluid.f20.lineHeight,
          }
        : {
            fontSize: theme.font.fixed.f24.fontSize,
            lineHeight: theme.font.fluid.f24.lineHeight,
          }),
    };
  };

export default CreateObjective;
