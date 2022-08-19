import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Status } from 'config/enum';
import { Button, CreateRule, Rule, useStyle, colors } from '@pma/dex-wrapper';
import { Colors } from 'config/types';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes/utils';
import { TFunction, useTranslation } from 'components/Translation';

export const TEST_ID = 'main-widget';

export type ContentProps = {
  status?: Status;
  statistic?: object;
  count?: number;
  nextReviewDate?: string;
};

export type ContentGraphics = {
  backgroundColor: Colors;
  subTitle: React.ReactNode;
  description?: string;
  buttonText: string;
  disabled?: boolean;
  viewPage?: Page;
};

export type ContentConfig = {
  viewPage: Page;
  widgetTitle: string;
  modalTitle: string;
  formComponent?: React.FC;
};

export type MainWidgetBaseProps = ContentProps & {
  getContent: (props: ContentProps, t: TFunction) => ContentConfig & ContentGraphics;
  customStyle?: React.CSSProperties | {};
};

const DISABLED_COLOR = '#B3CDE6';

export const MainWidgetBase: FC<MainWidgetBaseProps> = ({ customStyle, getContent, ...props }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { status } = props;

  const { backgroundColor, subTitle, description, buttonText, viewPage, widgetTitle, disabled } = getContent(props, t);

  const notApproved = !disabled && status !== Status.APPROVED;
  const mode = notApproved ? 'default' : 'inverse';

  const handleClick = () => {
    if (disabled) {
      return;
    }

    navigate(buildPath(viewPage), { state: { backPath: pathname } });
  };

  return (
    <>
      <TileWrapper customStyle={customStyle} hover={!disabled} background={backgroundColor}>
        <div
          className={css(wrapperStyle({ clickable: notApproved, disabled }))}
          onMouseDown={handleClick}
          data-test-id={TEST_ID}
        >
          <div className={css(headStyle)}>
            <div>
              <Icon
                graphic='document'
                invertColors={notApproved}
                iconStyles={iconStyles}
                //@ts-ignore
                color={disabled ? colors.darkBlue : undefined}
              />
            </div>
            <div className={css(headerBlockStyle)}>
              <span className={css(titleStyle)}>{widgetTitle}</span>
              <span className={css(descriptionStyle)}>{subTitle}</span>
            </div>
          </div>
          <div className={css(bodyStyle)}>
            {description && <div className={css(subDescription)}>{description}</div>}
            <div className={css(bodyBlockStyle)}>
              {!disabled && (
                <Button mode={mode} styles={[viewButtonStyle({ inverse: notApproved })]} onPress={handleClick}>
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </TileWrapper>
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

const wrapperStyle: CreateRule<{ clickable: boolean; disabled?: boolean }> =
  ({ clickable, disabled }) =>
  ({ theme }) => ({
    padding: '24px 30px',
    color: disabled ? DISABLED_COLOR : clickable ? theme.colors.white : theme.colors.tescoBlue,
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
