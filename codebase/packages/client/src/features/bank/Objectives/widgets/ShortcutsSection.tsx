import React from 'react';
import { useNavigate } from 'react-router';
import { Styles, theme, useStyle } from '@pma/dex-wrapper';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import BaseWidget, { Props as WidgetProps } from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';

const ShortcutsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { css } = useStyle();

  const widgets: WidgetProps[] = [
    // {
    //   iconGraphic: 'list',
    //   title: t('Priorities archive'),
    //   customStyle: { flex: '2 1 110px' },
    //   onClick: () => navigate(buildPath(Page.CONTRIBUTION)),
    // },
    {
      iconGraphic: 'edit',
      title: t('My Notes'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.NOTES)),
    },
  ];

  return (
    <div className={css(wrapperStyle)}>
      {widgets.map((props, idx) => (
        <BaseWidget
          customStyle={{
            fontSize: theme.font.fixed.f16.fontSize,
            lineHeight: theme.font.fixed.f16.lineHeight,
            letterSpacing: '0px',
          }}
          key={idx}
          {...props}
        />
      ))}
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

export default ShortcutsSection;
