import React, { FC } from 'react';
import { useStyle, Rule, Button, theme, useBreakpoints } from '@pma/dex-wrapper';
import successIcon from 'images/success.jpg';
import deleteIcon from 'images/delete.png';
import { useTranslation } from 'components/Translation';

export type Props = {
  negativeBtnAction: () => void;
  positiveBtnAction: () => void;
  action: string;
  tipTitle?: string;
};

const TipsFormModal: FC<Props> = ({ action, negativeBtnAction, positiveBtnAction, tipTitle }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const options = {
    discard: {
      title: t('discard_changes', 'Discard changes'),
      body: t(
        'you_have_not_saved_your_changes',
        'You have not saved your changes, are you sure you want to leave this page?',
      ),
      negativeBtnText: t('cancel', 'Cancel'),
      positiveBtnText: t('okay', 'Okay'),
      showImage: false,
    },
    create: {
      title: t('Success', 'Success'),
      body: t('new_tip_successfully_created', 'New Tip successfully created.'),
      negativeBtnText: '',
      positiveBtnText: t('okay', 'Okay'),
      showImage: true,
    },
    edit: {
      title: t('Success', 'Success'),
      body: t('tip_updated_successfully', 'Tip updated successfully.'),
      negativeBtnText: '',
      positiveBtnText: t('okay', 'Okay'),
      showImage: true,
    },
    confirmDelete: {
      title: t('delete', 'Delete'),
      body: `${t('do_you_want_to_delete', 'Do you want to delete')} ${tipTitle} ${t('tip', 'Tip')}?`,
      negativeBtnText: t('cancel', 'Cancel'),
      positiveBtnText: t('delete', 'Delete'),
      showImage: true,
    },
    successDelete: {
      title: t('delete', 'Delete'),
      body: `The Tip “${tipTitle}” have been permanently deleted.`,
      negativeBtnText: '',
      positiveBtnText: t('okay', 'Okay'),
      showImage: true,
    },
    failure: {
      title: 'Oops',
      body: t('something_went_wrong', 'Something went wrong'),
      negativeBtnText: '',
      positiveBtnText: t('okay', 'Okay'),
      showImage: false,
    },
  };

  return (
    <div className={css(TipsFormModalStyle)}>
      {options[action]['showImage'] &&
        (action === 'successDelete' || action === 'confirmDelete' ? (
          <img src={deleteIcon} alt='delete' />
        ) : (
          <img src={successIcon} alt='success' />
        ))}
      <div className={css(modalTitle)}>{options[action]['title']}</div>
      <div className={css(modalBody)}>{options[action]['body']}</div>
      <div className={css(formControlBtnsWrap)}>
        {options[action]['negativeBtnText'] && (
          <Button
            onPress={negativeBtnAction}
            mode='inverse'
            styles={[formControlBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
          >
            {options[action]['negativeBtnText']}
          </Button>
        )}
        <Button onPress={positiveBtnAction} styles={[formControlBtn]}>
          {options[action]['positiveBtnText']}
        </Button>
      </div>
    </div>
  );
};

const TipsFormModalStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#fff',
    width: '100%',
    height: '100%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    ...(mobileScreen
      ? {
          padding: '60px 15px 100px',
          borderRadius: '24px',
        }
      : {
          padding: '90px 40px 100px',
          borderRadius: '32px',
        }),
  };
};

const modalTitle: Rule = () => {
  return {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '32px',
    margin: '30px 0 16px',
  };
};

const modalBody: Rule = () => {
  return {
    fontSize: '24px',
    lineHeight: '28px,',
    maxWidth: '360px',
  };
};

const formControlBtnsWrap: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    width: '100%',
    background: '#fff',
    // @ts-ignore
    borderTop: `1px solid ${theme.colors.lightGray}`,
    ...(mobileScreen
      ? {
          padding: '0 10px',
        }
      : {
          padding: '0 40px',
          borderRadius: '0 0 32px 32px',
        }),
  };
};

const formControlBtn: Rule = () => {
  return {
    width: '50%',
    margin: '0 3px',
    fontWeight: 700,
    lineHeight: '20px',
  };
};

export default TipsFormModal;
