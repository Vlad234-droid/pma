import React, { FC } from 'react';
import { useStyle, CreateRule, Rule } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  title: string;
};

const SideBar: FC<Props> = ({ isOpen, onClose, children, title }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyles({ isOpen }))} data-test-id='sidebar'>
      <div className={css(headerStyle)}>
        <h3 className={css(titleStyle)}>{title}</h3>
        <IconButton
          graphic='close'
          customVariantRules={{
            default: iconBtnStyle as Rule,
          }}
          onPress={onClose}
        />
      </div>
      {children}
    </div>
  );
};

// @ts-ignore
const wrapperStyles: CreateRule<{ isOpen: boolean }> = ({ isOpen }) => {
  const { theme } = useStyle();

  return {
    position: 'fixed',
    width: '300px',
    height: '100vh',
    padding: '10px 16px 16px 16px',
    top: '0',
    right: '0px',
    pointerEvents: isOpen ? 'all' : 'none',
    transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
    transition: 'transform .3s ease',
    transformOrigin: '50% 0%',
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    background: `${theme.colors.white}`,
    zIndex: 2,
    overflowY: 'scroll',
  };
};

const headerStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle: Rule = () => {
  const { theme } = useStyle();

  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    color: theme.colors.tescoBlue,
    fontWeight: 400,
    margin: 0,
  };
};

const iconBtnStyle: Rule = {
  paddingTop: '6px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  cursor: 'pointer',
};

export default SideBar;
