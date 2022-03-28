import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { CreateRule, Icon, ModalWithHeader, Rule, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
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
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

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
        <div className={css(decsriptionHeader({ theme }))}>Your organisation&#39;s strategic drivers</div>
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

const decsriptionHeader: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  return {
    fontSize: '24px',
    lineHeight: '28px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

export default Popup;
