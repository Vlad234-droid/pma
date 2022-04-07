import React, { Dispatch, FC, MouseEvent, SetStateAction, useRef } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import useEventListener from 'hooks/useEventListener';
import { IconButton } from 'components/IconButton';
import { Checkbox } from 'components/Form';
import { Trans } from 'components/Translation';

enum FilterType {
  SELECT_ALL = 'Select All',
}

type FilterModalProps = {
  filterModal: boolean;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  filterData: any;
  setFilterData: (T: any) => void;
  checkedItems: string[];
  setCheckedItems: (T: any) => void;
  isCheckAll: string[];
  setIsCheckAll: (T: any) => void;
};
type SelectAllProps = {
  onChange: (e: any, value?: string) => any;
  checkBoxItem: any;
  innerTitle: string;
};

// TODO: Extract duplicate 3
const FilterModal: FC<FilterModalProps> = ({
  filterModal,
  setFilterModal,
  filterData,
  checkedItems,
  setCheckedItems,
  isCheckAll,
  setIsCheckAll,
}) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setFilterModal(false);
    }
  };

  useEventListener('mousedown', handleClickOutside);

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setCheckedItems([...checkedItems, id]);
    if (!checked) {
      const [mainTitle] = id.split('-');
      if (isCheckAll.includes(`${mainTitle}-${FilterType.SELECT_ALL}`)) {
        const filteredCheckedAll = isCheckAll.filter((item) => item !== `${mainTitle}-${FilterType.SELECT_ALL}`);
        setIsCheckAll(() => filteredCheckedAll);
      }
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (e) => {
    const { id, checked } = e.target;
    setIsCheckAll((prev) => [...prev, id]);
    const [mainTitle] = id.split('-');
    const selectedItems = filterData
      .find((item) => item.title === mainTitle)
      .data.map((item) => {
        if (item.title !== FilterType.SELECT_ALL) return item.title;
      })
      .filter(Boolean)
      .map((item) => {
        return `${mainTitle}-${item}`;
      });
    setCheckedItems((prev) => [...new Set([...prev, ...selectedItems])]);

    if (!checked) {
      setIsCheckAll((prev) => [...prev.filter((item) => item !== id)]);
      setCheckedItems(() =>
        checkedItems.filter((item) => {
          if (selectedItems.includes(item)) return;
          return item;
        }),
      );
      return;
    }
  };

  const SelectAll: FC<SelectAllProps> = ({ onChange, checkBoxItem, innerTitle }) => {
    return (
      <>
        <Checkbox
          name={`${innerTitle}-${checkBoxItem.title}`}
          id={`${innerTitle}-${checkBoxItem.title}`}
          onChange={onChange}
          checked={isCheckAll.includes(`${innerTitle}-${checkBoxItem.title}`)}
          indeterminate={isCheckAll.includes(`${innerTitle}-${checkBoxItem.title}`)}
        />
        <span className={css(checkBoxItemTitle)}>
          <Trans>{checkBoxItem.title}</Trans>
        </span>
      </>
    );
  };

  return (
    <div ref={ref} className={css(wrapperStyle({ filterModal }))}>
      <div className={css(flexColumnStyle)}>
        <div className={css(flexStyle)}>
          <span className={css(filterStyle)}>Filter</span>
          <IconButton
            graphic='decline'
            iconStyles={iconStyle}
            onPress={() => {
              setFilterModal(() => false);
            }}
          />
        </div>
        {filterData.map((item) => {
          const { title, data } = item;
          return (
            <div key={title} className={css(wrapperContainer)}>
              <div className={css(titleStyle)}>{item.title}</div>
              {data.map((checkBoxItem) => (
                <label className={css(labelStyle)} key={`${title}-${checkBoxItem.title}`}>
                  {checkBoxItem.title === FilterType.SELECT_ALL ? (
                    <SelectAll onChange={(e) => handleSelectAll(e)} checkBoxItem={checkBoxItem} innerTitle={title} />
                  ) : (
                    <>
                      <Checkbox
                        id={`${title}-${checkBoxItem.title}`}
                        checked={checkedItems.includes(`${title}-${checkBoxItem.title}`)}
                        onChange={(e) => handleClick(e)}
                      />
                      <span className={css(checkBoxItemTitle)}>
                        <Trans>{checkBoxItem.title}</Trans>
                      </span>
                    </>
                  )}
                </label>
              ))}
            </div>
          );
        })}
      </div>
      <div className={css(absoluteStyle)}>
        <div className={css(relativeBtnStyled)}>
          <div className={css(spacingStyle({ mobileScreen }))}>
            <Button styles={[theme.font.fixed.f16, buttonStyle]} onPress={() => setFilterModal(() => false)}>
              <Trans>Cancel</Trans>
            </Button>
            <Button
              styles={[theme.font.fixed.f16, filterButtonStyle]}
              onPress={() => {
                setFilterModal(() => false);
              }}
            >
              <Trans>Filter</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const wrapperStyle: CreateRule<{ filterModal: boolean }> = ({ filterModal }) => {
  const { theme } = useStyle();
  return {
    position: 'absolute',
    width: '424px',
    padding: '24px 24px 60px 24px',
    top: '60px',
    right: '44px',
    pointerEvents: filterModal ? 'all' : 'none',
    transform: filterModal ? 'scaleY(1)' : 'scaleY(0)',
    transition: 'transform .3s ease',
    transformOrigin: '50% 0%',
    background: theme.colors.white,
    boxShadow: '0px 0px 6px 1px rgba(0, 0, 0, 0.14)',
    borderRadius: '10px',
    zIndex: 2,
  };
};
const flexColumnStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};
const labelStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};
const wrapperContainer: Rule = ({ theme }) =>
  ({
    marginTop: '28px',
    position: 'relative',
    paddingBottom: '12px',
    ':not(:last-child)': {
      ':after': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '2px',
        background: theme.colors.backgroundDarkest,
        bottom: '0px',
        left: '0px',
      },
    },
  } as Styles);
const checkBoxItemTitle: Rule = () => {
  const { theme } = useStyle();

  return {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.link,
    marginLeft: '16px',
  };
};
const titleStyle: Rule = () => {
  const { theme } = useStyle();

  return {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: theme.colors.link,
    marginBottom: '24px',
  };
};
const filterStyle: Rule = () => {
  const { theme } = useStyle();

  return {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: theme.colors.link,
  };
};
const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const iconStyle: Rule = {
  width: '18px',
  height: '18px',
  marginTop: '5px',
};
const absoluteStyle: Rule = () => {
  const { theme } = useStyle();
  return {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    background: theme.colors.white,
  };
};
const relativeBtnStyled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
});

const spacingStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  padding: mobileScreen ? '18px' : '24px',
  display: 'flex',
  justifyContent: 'space-between',
});

const buttonStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
});
const filterButtonStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.tescoBlue,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.white}`,
  fontSize: '16px',
  lineHeight: '20px',
});

export default FilterModal;
