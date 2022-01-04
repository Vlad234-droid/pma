import React, { FC, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { Button, Colors, CreateRule, Rule, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { useHistory } from 'react-router-dom';
import { Page } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { ModalComponent } from '../Modal';
import { CreateUpdateObjectives } from '../ObjectiveModal';

export type Props = {
  onClick: () => void;
  status?: Status;
  customStyle?: React.CSSProperties | {};
  count?: number;
  nextReviewDate?: string;
};

export const TEST_ID = 'main-widget';

const getContent = (props: {
  status?: string;
  count?: number;
  date?: string;
}): {
  graphic: Graphics;
  backgroundColor: Colors;
  subTitle: string;
  description: string;
  buttonText: string;
  redirectToObjective: boolean;
  invertColors: boolean;
} => {
  const { status, count, date = '' } = props;
  const { t } = useTranslation();
  if (!status) {
    return {
      graphic: 'add',
      backgroundColor: 'tescoBlue',
      subTitle: t('create_my_objectives', 'Create my objectives'),
      description: 'Remember your objectives should be strategic, relevant and up to date.',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: false,
      invertColors: true,
    };
  }
  const contents: {
    [key: string]: {
      graphic: Graphics;
      backgroundColor: Colors;
      subTitle: string;
      description: string;
      buttonText: string;
      redirectToObjective: boolean;
      invertColors: boolean;
    };
  } = {
    [Status.STARTED]: {
      graphic: 'add',
      backgroundColor: 'tescoBlue',
      subTitle: t('create_my_objectives', 'Create my objectives'),
      description: 'Remember your objectives should be strategic, relevant and up to date.',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: false,
      invertColors: true,
    },
    [Status.DRAFT]: {
      graphic: 'roundPencil',
      backgroundColor: 'tescoBlue',
      subTitle: t('objective_is_draft', `${count} objective(s) saved as a draft`, { count }),
      description: 'Remember if your priorities change, review your objectives',
      buttonText: t('view_and_edit_objectives', 'View and edit objectives'),
      redirectToObjective: false,
      invertColors: false,
    },
    [Status.WAITING_FOR_APPROVAL]: {
      graphic: 'roundClock',
      backgroundColor: 'tescoBlue',
      subTitle: t('objective_is_pending', `${count} objective(s) are waiting for approval`, { count }),
      description: 'Remember if your priorities change, review your objectives',
      buttonText: t('view', 'View'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.APPROVED]: {
      graphic: 'roundTick',
      backgroundColor: 'white',
      subTitle: t(
        'objective_is_approved',
        `Well done! All ${count} objective(s) have been approved. Your mid year review is scheduled for ${date}.`,
        { count, date: new Date(date) },
      ),
      description: 'Remember if your priorities change, review your objectives',
      buttonText: t('view', 'View'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.DECLINED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: 'Your objectives were declined by the Line Manager',
      description: '',
      buttonText: t('view', 'View'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.OVERDUE]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: 'Objectives are overdue',
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: true,
      invertColors: false,
    },
  };
  return contents[status];
};

const MainWidget: FC<Props> = ({ nextReviewDate = '', count = 0, status, customStyle, onClick }) => {
  const { css } = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const notApproved = status !== Status.APPROVED;
  const mode = notApproved ? 'default' : 'inverse';

  const { graphic, backgroundColor, subTitle, description, buttonText, redirectToObjective, invertColors } = getContent(
    {
      status,
      count,
      date: nextReviewDate,
    },
  );

  const handleClick = () => {
    redirectToObjective ? history.push(buildPath(Page.OBJECTIVES_VIEW)) : setIsOpen(true);
  };

  return (
    <>
      <TileWrapper customStyle={customStyle} hover={true} background={backgroundColor}>
        <div className={css(wrapperStyle({ clickable: notApproved }))} onClick={handleClick} data-test-id={TEST_ID}>
          <div className={css(headStyle)}>
            <div>
              <Icon graphic='document' invertColors={notApproved} iconStyles={iconStyles} />
            </div>
            <div className={css(headerBlockStyle)}>
              <span className={css(titleStyle)}>
                <Trans i18nKey='my_business_objectives'>My objectives</Trans>
              </span>
              <span className={css(descriptionStyle)}>
                <span className={css(iconStyle)}>
                  {invertColors ? (
                    <Icon graphic={graphic} invertColors />
                  ) : (
                    <Icon graphic={graphic} backgroundRadius={12} />
                  )}
                </span>
                {subTitle}
              </span>
            </div>
          </div>
          <div className={css(bodyStyle)}>
            <div className={css({ marginTop: '14px', marginLeft: '9px' })}>{description}</div>
            <div className={css(bodyBlockStyle)}>
              <Button mode={mode} styles={[viewButtonStyle({ inverse: notApproved })]} onPress={handleClick}>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </TileWrapper>
      {isOpen && (
        <ModalComponent onClose={() => setIsOpen(false)} title={t('create_objectives', 'Create objectives')}>
          <CreateUpdateObjectives onClose={() => setIsOpen(false)} />
        </ModalComponent>
      )}
    </>
  );
};

const viewButtonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    border: `1px solid ${inverse ? theme.colors.white : theme.colors.tescoBlue}`,
  });

const wrapperStyle: CreateRule<{ clickable: boolean }> =
  ({ clickable }) =>
  ({ theme }) => ({
    padding: '24px 30px',
    color: clickable ? theme.colors.white : theme.colors.tescoBlue,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
  });

const iconStyles: Rule = () => ({
  width: '52px',
  height: '70px',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
});

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  marginLeft: '30px',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
  paddingTop: '14px',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  marginBottom: '12px',
};

const descriptionStyle: Rule = {
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  paddingLeft: '33px',
};

const iconStyle: Rule = () => ({
  display: 'flex',
  position: 'absolute',
  left: 0,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

export default MainWidget;
