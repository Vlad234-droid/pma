import React, { FC, useState } from 'react';
import { TFunction, Trans, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { Button, Colors, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { useNavigate } from 'react-router-dom';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes/utils';
import { ModalComponent } from 'features/general/ObjectivesForm/components/ModalComponent';
// import { ObjectivesForm } from 'features/bank/ObjectivesForm';
import { ObjectivesForm } from 'features/general/ObjectivesForm';

export type Props = {
  onClick: () => void;
  status?: Status;
  customStyle?: React.CSSProperties | {};
  count?: number;
  nextReviewDate?: string;
};

export const TEST_ID = 'main-widget';

type ContentGraphics = {
  graphic: Graphics;
  backgroundColor: Colors;
  subTitle: string;
  description: string;
  buttonText: string;
  redirectToObjective: boolean;
  invertColors: boolean;
};

const getContent = (
  props: {
    status?: string;
    count?: number;
    date?: string;
  },
  t: TFunction,
): ContentGraphics => {
  const { status, count, date = '' } = props;
  const defaultGraphics = {
    graphic: 'add',
    backgroundColor: 'tescoBlue',
    subTitle: t('create_my_objectives', 'Create my objectives'),
    description: 'Remember your objectives should be strategic, relevant and up to date.',
    buttonText: t('create_my_objectives', 'Create my objectives'),
    redirectToObjective: false,
    invertColors: true,
  };
  if (!status) return defaultGraphics as ContentGraphics;
  const contents: {
    [key: string]: ContentGraphics;
  } = {
    [Status.STARTED]: {
      graphic: 'add',
      backgroundColor: 'tescoBlue',
      subTitle: t('create_my_objectives', 'Create my objectives'),
      description: t(
        'remember_your_objectives_should_be_strategic',
        'Remember your objectives should be strategic, relevant and up to date.',
      ),
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: false,
      invertColors: true,
    },
    [Status.DRAFT]: {
      graphic: 'roundPencil',
      backgroundColor: 'tescoBlue',
      subTitle: t('objective_is_draft', `${count} objective(s) saved as a draft`, { count }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view_and_edit_objectives', 'View and edit objectives'),
      redirectToObjective: false,
      invertColors: false,
    },
    [Status.WAITING_FOR_APPROVAL]: {
      graphic: 'roundClock',
      backgroundColor: 'tescoBlue',
      subTitle: t('objective_is_pending', `${count} objective(s) are waiting for approval`, { count }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view', 'View'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.APPROVED]: {
      graphic: 'roundTick',
      backgroundColor: 'white',
      subTitle: t('objective_is_approved', `Well done! All ${count} objective(s) have been approved.`, {
        count,
        date: new Date(date),
      }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view', 'View'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.DECLINED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t(
        'your_objectives_were_declined_by_the_line_manager',
        'Your objectives were declined by the Line Manager',
      ),
      description: '',
      buttonText: t('view', 'View'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.OVERDUE]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('objectives_are_overdue', 'Objectives are overdue'),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.PENDING]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('objectives_are_pending', 'Objectives are pending'),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: true,
      invertColors: false,
    },
    [Status.NOT_STARTED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('objectives_are_not_started', 'Objectives are not started'),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToObjective: true,
      invertColors: false,
    },
  };
  return contents[status] || defaultGraphics;
};

const MainWidget: FC<Props> = ({ nextReviewDate = '', count = 0, status, customStyle }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
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
    t,
  );

  const handleClick = () => {
    redirectToObjective ? navigate(buildPath(Page.OBJECTIVES_VIEW)) : setIsOpen(true);
  };

  return (
    <>
      <TileWrapper customStyle={customStyle} hover={true} background={backgroundColor}>
        <div className={css(wrapperStyle({ clickable: notApproved }))} onMouseDown={handleClick} data-test-id={TEST_ID}>
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
            <div className={css(subDescription)}>{description}</div>
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
          <ObjectivesForm onClose={() => setIsOpen(false)} />
        </ModalComponent>
      )}
    </>
  );
};

const viewButtonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f14,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    padding: '0 16px',
    border: `2px solid ${inverse ? theme.colors.white : theme.colors.tescoBlue}`,
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

const iconStyles: Rule = {
  width: '52px',
  height: '70px',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
};

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

const titleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f18,
  letterSpacing: '0px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  marginBottom: '12px',
});

const descriptionStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  paddingLeft: '33px',
});

const iconStyle: Rule = () => ({
  display: 'flex',
  position: 'absolute',
  left: 0,
  '& > span': { display: 'flex' },
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};
const subDescription: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  marginTop: '14px',
  marginLeft: '9px',
});

export default MainWidget;
