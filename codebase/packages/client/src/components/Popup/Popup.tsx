import React from 'react';
import { CreateRule, Icon, ModalWithHeader, Rule, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import Details from 'components/Details';
import { useNavigate } from 'react-router';

const Popup = (props) => {
  const { css, theme } = useStyle();
  const { items } = props;
  const navigate = useNavigate();

  if (items.length < 1) return null;

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles}
      title='Strategic drivers'
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic={'close'} invertColors={true} />,
        closeOptionStyles: {},
        onClose: () => navigate(-1),
      }}
    >
      <div className={css(main)}>
        <div className={css(decsriptionHeader({ theme }))}>Your organization has 6 drivers</div>

        <div className={css(descriptionText({ theme }))}>
          Organization drivers – are stategic goals that help all company-wide activities lead to one single direction.
        </div>
        <div className={css(templatesListStyles)}>
          {items.map((obj, idx) => {
            return <Details key={obj.uuid} title={`Strategic driver ${idx + 1}`} description={obj.title} />;
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

const templatesModalWindowStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    width: mobileScreen ? '100%' : '60%',
    padding: '0',
    height: mobileScreen ? 'calc(100% - 50px)' : 'calc(100% - 100px)',
    marginTop: mobileScreen ? '50px' : 0,
    overflow: 'hidden',
  };
};

const descriptionText: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f18}`,
    lineHeight: '22px',
    paddingBottom: '16px',
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
