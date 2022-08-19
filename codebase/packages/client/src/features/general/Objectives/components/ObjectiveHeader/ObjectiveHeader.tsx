import React, { FC, useMemo } from 'react';
import { Header, HeaderProps } from 'components/Accordion';
import { Status } from 'config/enum';
import StatusBadge from 'components/StatusBadge';
import { Rule, useStyle } from '@pma/dex-wrapper';

const ObjectiveHeader: FC<
  Omit<HeaderProps, 'children'> & {
    title: string;
    subTitle?: string;
    description?: string;
    status?: Status;
  }
> = ({ title, subTitle, description, status, ...rest }) => {
  const { css } = useStyle();
  const statusComponent = useMemo(
    () => (status ? <StatusBadge status={status} styles={{ marginRight: '20px' }} /> : null),
    [status],
  );
  return (
    <Header headingLevel={1} title={title} status={status} component={statusComponent} {...rest}>
      {title && <h3 className={css(titleStyles)}>{title}</h3>}
      {subTitle && <h4 className={css(subTitleStyles)}>{subTitle}</h4>}
      <p className={css(descriptionStyles)}>{description}</p>
    </Header>
  );
};

export default ObjectiveHeader;

const titleStyles: Rule = ({ theme }) => ({
  margin: 0,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const subTitleStyles: Rule = ({ theme }) => ({
  margin: 0,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fluid.f16.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  paddingTop: 0,
});

const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  paddingBottom: 0,
  margin: 0,
});
