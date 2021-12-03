import React, { Dispatch, FC, SetStateAction } from 'react';
import { useStyle, Rule, CreateRule } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';

type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};

type FilterModalProps = {
  filterModal: boolean;
  filterFeedbacks: filterFeedbacksType;
  setFilterFeedbacks: Dispatch<SetStateAction<filterFeedbacksType>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
};

export const FilterModal: FC<FilterModalProps> = ({
  filterModal,
  filterFeedbacks,
  setFilterFeedbacks,
  setFilterModal,
}) => {
  const { css } = useStyle();
  const chosesHandler = (val: string) => {
    setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
    setFilterFeedbacks((prev) => {
      return {
        ...prev,
        [val]: true,
      };
    });
    setFilterModal(() => false);
  };

  const btns_radio = [
    {
      id: '1',
      label: 'AZ',
      checked: filterFeedbacks.AZ,
      text: 'A-Z',
    },
    {
      id: '2',
      label: 'ZA',
      checked: filterFeedbacks.ZA,
      text: 'Z-A',
    },
    {
      id: '3',
      label: 'newToOld',
      checked: filterFeedbacks.newToOld,
      text: 'Newest to oldest',
    },
    {
      id: '4',
      label: 'oldToNew',
      checked: filterFeedbacks.oldToNew,
      text: 'Oldest to newest',
    },
  ];

  return (
    <div className={css(wrapper_style({ filterModal }))}>
      <div className={css(Flex_column_style)}>
        <span>Sort :</span>
        {btns_radio.map((item) => (
          <div className={css({ cursor: 'pointer', marginTop: '10px' })} key={item.id}>
            <label htmlFor={item.label} className={css(Flex_center_style)}>
              <Radio
                type='radio'
                name={item.label}
                value={item.label}
                checked={item.checked}
                id={item.label}
                onChange={(e) => {
                  chosesHandler(e.target.id);
                }}
              />
              <span className={css(Size_style)}>
                <Trans>{item.text}</Trans>
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
const Flex_column_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
};
const Size_style: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '0px 5px',
};
const Flex_center_style: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};
const wrapper_style: CreateRule<{ filterModal: boolean }> = ({ filterModal }) => {
  const { theme } = useStyle();
  return {
    position: 'absolute',
    width: '200px',
    height: '186px',
    padding: '10px 16px 16px 16px',
    top: '40px',
    right: '0px',
    pointerEvents: filterModal ? 'all' : 'none',
    transform: filterModal ? 'scaleY(1)' : 'scaleY(0)',
    transition: 'transform .3s ease',
    transformOrigin: '50% 0%',
    border: `1px solid ${theme.colors.tescoBlue}`,
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    background: '#F6F6F6',
    borderRadius: '10px',
    zIndex: 2,
  };
};
