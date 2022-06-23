import React, { FC, useState } from 'react';
import { Status } from 'config/enum';
import { Button, Colors, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { useNavigate } from 'react-router-dom';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes/utils';
import { ModalComponent } from 'features/general/ObjectivesForm/components/ModalComponent';
import { TFunction, useTranslation } from 'components/Translation';

export const TEST_ID = 'main-widget';

export type ContentProps = {
  status?: Status;
  count?: number;
  nextReviewDate?: string;
};

export type ContentGraphics = {
  graphic: Graphics;
  backgroundColor: Colors;
  subTitle: string;
  description: string;
  buttonText: string;
  redirectToViewPage: boolean;
  invertColors: boolean;
};

export type ContentConfig = {
  viewPage: Page;
  widgetTitle: string;
  modalTitle: string;
  formComponent: React.FC<{ onClose: () => void }>;
};

export type MainWidgetBaseProps = ContentProps & {
  getContent: (props: ContentProps, t: TFunction) => ContentConfig & ContentGraphics;
  customStyle?: React.CSSProperties | {};
};

export const MainWidgetBase: FC<MainWidgetBaseProps> = ({ customStyle, getContent, ...props }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { status } = props;

  const {
    graphic,
    backgroundColor,
    subTitle,
    description,
    buttonText,
    redirectToViewPage,
    invertColors,
    modalTitle,
    viewPage,
    widgetTitle,
    formComponent: FormComponent,
  } = getContent(props, t);

  const notApproved = status !== Status.APPROVED;
  const mode = notApproved ? 'default' : 'inverse';

  const handleClick = () => {
    redirectToViewPage ? navigate(buildPath(viewPage)) : setIsOpen(true);
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
              <span className={css(titleStyle)}>{widgetTitle}</span>
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
        <ModalComponent onClose={() => setIsOpen(false)} title={modalTitle}>
          <FormComponent onClose={() => setIsOpen(false)} />
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
