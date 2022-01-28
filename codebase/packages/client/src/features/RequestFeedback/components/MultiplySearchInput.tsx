import React, { ChangeEvent, FC, RefObject } from 'react';
import { colors, useStyle, Rule, Styles } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';
import { useRefContainer } from 'components/Form/context/input';
import defaultImg from '../../../../public/default.png';
import { Close } from 'components/Icon/graphics/Close';

export interface FormItemProps {
  disabled?: boolean;
  value?: string | undefined;
  name?: string;
  placeholder?: string;
  styles?: Rule;
  onChange: (e: any) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (e: any) => void;
  onClear: () => void;
  domRef?: RefObject<any>;
  isValid?: boolean;
  id?: string;
  options: Array<any>;
  selected: Array<any>;
}

const MultiplySearchInput: FC<FormItemProps> = ({
  domRef,
  placeholder = '',
  onChange,
  onSearch,
  onDelete,
  onClear,
  name,
  value,
  isValid = true,
  options,
  selected,
}) => {
  const { css, theme } = useStyle();
  const refIcon = useRefContainer();

  return (
    <>
      <input
        ref={mergeRefs([domRef, refIcon])}
        name={name}
        data-test-id={name}
        value={value}
        onChange={onSearch}
        autoComplete={'off'}
        disabled={false}
        className={css({
          width: '100%',
          border: `1px solid ${isValid ? colors.backgroundDarkest : colors.error}`,
          borderRadius: '50px',
          fontSize: '16px',
          lineHeight: '20px',
          padding: '10px 30px 10px 16px',
          ':focus': {
            outline: 'none !important',
            border: `1px solid ${isValid ? colors.tescoBlue : colors.error}`,
          },
        })}
        placeholder={placeholder}
      />
      {!!options.length && (
        <div
          style={{
            display: 'block',
            position: 'absolute',
            border: `1px solid ${theme.colors.backgroundDarkest}`,
            borderRadius: theme.border.radius.sm,
            background: theme.colors.white,
            width: '100%',
            zIndex: 999,
          }}
        >
          <div className={css(relativeStyles)}>
            {!!selected.length &&
              selected.map((item): any => (
                <div key={item.value} className={css(selectedStyle)}>
                  <span className={css({ marginRight: '10px' })}>{`${item.label}`}</span>
                  <div className={css({ cursor: 'pointer' })} onClick={onDelete}>
                    <Close />
                  </div>
                </div>
              ))}
            {!!selected.length && (
              <span className={css(cleanAllStyle)} onClick={onClear}>
                Clear all
              </span>
            )}
          </div>
          {options?.map((item) => {
            return (
              <div
                key={item?.colleague?.colleagueUUID}
                className={css({
                  display: 'block',
                  width: '100%',
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '10px 30px 10px 16px',
                  ':hover': {
                    background: '#F3F9FC',
                  },
                })}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(item);
                }}
              >
                <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
                  <img className={css({ width: '50px', height: '50px', borderRadius: '50%' })} src={defaultImg} />
                  <div className={css({ marginLeft: '16px' })}>
                    <div className={css(selectedItemStyle, flexGapStyle)}>
                      <div>{item?.colleague?.profile?.firstName}</div>
                      <div>{item?.colleague?.profile?.lastName}</div>
                    </div>
                    <div className={css(flexGapStyle, { marginTop: '4px' })}>
                      <div>{item?.colleague?.workRelationships[0].job?.name}</div>
                      <div>{item?.colleague?.workRelationships[0].department?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const flexGapStyle: Rule = {
  display: 'flex',
  gap: '8px',
};

const selectedItemStyle: Rule = ({ colors }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: colors.link,
});

const relativeStyles: Rule = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '90%',
};

const selectedStyle = {
  borderRadius: '10px',
  border: '1px solid  #00539F',
  height: '32px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 12px',
  marginRight: '16px',
  marginTop: '15px',

  '& > span': {
    whiteSpace: 'nowrap',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#00539F',
  },
} as Styles;

const cleanAllStyle: Rule = {
  position: 'absolute',
  top: '11px',
  right: '-50px',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
  cursor: 'pointer',
};

export default MultiplySearchInput;
