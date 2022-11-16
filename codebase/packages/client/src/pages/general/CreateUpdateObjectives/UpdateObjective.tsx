import React, { FC, useMemo } from 'react';
import { CreateRule, Modal, useStyle } from '@pma/dex-wrapper';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { Icon } from 'components/Icon';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';
import { useTenant } from 'features/general/Permission';

const UpdateObjective: FC = () => {
  const tenant = useTenant();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const editNumber = id !== undefined ? +id : 1;

  const handleClose = () => navigate((state as any)?.backPath || buildPath(Page.REVIEWS_VIEW));

  const CreateUpdateObjectives = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/CreateUpdateObjectives`).then((module) => ({ default: module.default })),
      ),
    [],
  );

  return (
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
        content: 'Edit objectives',
        styles: [modalTitleOptionStyle({ mobileScreen })],
      }}
    >
      <CreateUpdateObjectives onClose={handleClose} editNumber={editNumber} useSingleStep={!!id} />
    </Modal>
  );
};

export default UpdateObjective;

// TODO: Extract duplicate 2
const containerRule: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ colors }) => ({
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
    background: colors.white,
    cursor: 'default',
  });

// TODO: Extract duplicate 13
const modalCloseOptionStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
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
});

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f20.fontSize,
          lineHeight: theme.font.fixed.f20.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f24.fontSize,
          lineHeight: theme.font.fixed.f24.lineHeight,
        }),
  });
