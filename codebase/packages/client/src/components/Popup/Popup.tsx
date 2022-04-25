import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { CreateRule, Icon, ModalWithHeader, Rule, useStyle } from '@pma/dex-wrapper';
import Details from 'components/Details';
import { Attention } from 'components/Form';

export const TEST_ID = 'popup-test-id';

export type Props = {
  items: Array<{
    title: string;
    uuid: string;
  }>;
};

const Popup: FC<Props> = ({ items }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();

  if (items.length < 1) return null;

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles({ mobileScreen })}
      title='Strategic drivers'
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic={'close'} invertColors={true} />,
        closeOptionStyles: {},
        onClose: () => navigate(-1),
      }}
    >
      <div data-test-id={TEST_ID} className={css(main)}>
        <div className={css(descriptionHeader)}>Your organisation&#39;s strategic drivers</div>
        <Attention />
        <div className={css(templatesListStyles)}>
          {items.map((obj, idx) => {
            return (
              obj.title && <Details key={obj.uuid} title={`Strategic driver ${idx + 1}`} description={obj.title} />
            );
          })}
        </div>
      </div>
    </ModalWithHeader>
  );
};

const main = {
  padding: '40px',
  overflowY: 'scroll',
  position: 'relative',
  height: '100%',
} as Rule;

const templatesListStyles: Rule = () => ({
  margin: '0px',
  height: '100%',
});

const templatesModalWindowStyles: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => {
  return {
    width: mobileScreen ? '100%' : '60%',
    padding: '0',
    height: mobileScreen ? 'calc(100% - 50px)' : 'calc(100% - 100px)',
    marginTop: mobileScreen ? '50px' : 0,
    overflow: 'hidden',
  };
};

const descriptionHeader: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fixed.f24.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  paddingBottom: '8px',
});

export default Popup;
