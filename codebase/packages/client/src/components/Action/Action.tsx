import React, { FC, useState, useRef } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Icon, Graphics } from 'components/Icon';
import useClickOutside from 'hooks/useClickOutside';

export const TEST_ID = 'action_test_id';
export const ITEMS_TEST_ID = 'items_action_test_id';
export const ICON_TEST_ID = 'icon_action_test_id';

type Props = {
  items: Array<{ text: string; icon: Graphics; action: () => void }>;
};

const Action: FC<Props> = ({ items }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, toggleOpen] = useState(false);
  const { css } = useStyle();
  const handleOpen = () => toggleOpen((open) => !open);

  useClickOutside(ref, () => toggleOpen(false));

  return (
    <div className={css({ position: 'relative', marginLeft: '6px' })} ref={ref} data-test-id={TEST_ID}>
      <Icon graphic={'more'} onClick={handleOpen} containerTestId={ICON_TEST_ID} />
      {isOpen && (
        <div className={css(modalStyle)} data-test-id={ITEMS_TEST_ID}>
          {items.map(({ icon, text, action }, idx) => (
            <div key={idx} className={css(item)} onClick={action}>
              <Icon graphic={icon} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Action;

const modalStyle: Rule = ({ colors }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  right: '-6px',
  top: '100%',
  background: colors.white,
  zIndex: 2,
  borderRadius: '8px',
  boxShadow: 'rgba(100, 100, 111, 0.05) 4px 2px 10px 10px',

  ':before': {
    content: "''",
    width: '18px',
    height: '18px',
    position: 'absolute',
    top: '-7px',
    right: '9px',
    background: colors.white,
    boxShadow: 'rgba(100, 100, 111, 0.08) -1px -1px 3px -1px',
    transform: 'rotate(45deg)',
  },
});

const item: Rule = ({ colors }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 24px',
  cursor: 'pointer',
  minWidth: '8em',
  // @ts-ignore
  borderBottom: `1px solid ${colors.lightGray}`,

  ':last-child': {
    borderBottom: 'none',
  },
});
