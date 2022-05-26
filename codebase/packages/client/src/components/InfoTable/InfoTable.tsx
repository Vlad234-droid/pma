import React, { FC, useState } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { Link } from 'react-router-dom';
import TableContent from './components/TableContent';
import { InfoTableProps as Props } from './type';
import { paramsReplacer } from 'utils';
import { buildPath, buildPathWithParams } from 'features/Routes';
import { HoverMessage } from '../HoverMessage';

export const INFO_TABLE_WRAPPER = 'info_table_wrapper';

const InfoTable: FC<Props> = ({
  mainTitle,
  data,
  preTitle = '',
  link = '',
  Wrapper = 'div',
  type = '',
  params = {},
  hoverMessage = '',
  hoverVisibility = true,
}) => {
  const { css } = useStyle();

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const props = {
    mainTitle,
    data,
    preTitle,
  };

  const HoverMessageWrapper = () => (
    <HoverMessage
      isVisible={hoverVisibility && !!hoverMessage && isHovering}
      text={hoverMessage}
      customStyles={hoverContainer}
    />
  );

  if (!link)
    return (
      <Wrapper
        className={css(infoTableWrapper)}
        data-test-id={INFO_TABLE_WRAPPER}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <TableContent {...props} />
        <HoverMessageWrapper />
      </Wrapper>
    );

  return (
    <Link
      to={buildPathWithParams(buildPath(paramsReplacer(link, { ':type': type })), {
        ...params,
      })}
      className={css(infoTableWrapper)}
      data-test-id={INFO_TABLE_WRAPPER}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <TableContent {...props} />
      <HoverMessageWrapper />
    </Link>
  );
};

const infoTableWrapper: Rule = ({ theme }) => ({
  padding: '24px',
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  width: '100%',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  position: 'relative',
});

const hoverContainer: Rule = () => ({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-50%, 100%)',
});

export default InfoTable;
