import React, { FC, useState } from 'react';
import { CalibrationColleague } from '@pma/openapi';
import { colors, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { useTranslation, Trans } from 'components/Translation';
import { ColleagueProfile } from 'components/ColleagueProfile';
import { Icon } from 'components/Icon';
import { useSelector } from 'react-redux';
import { getColleagueFilterSelector } from '@pma/store';

import { getSelectedGroups } from '../../utils';

const ColleaguesRemover: FC<{
  colleaguesRemoved: any;
  onRemove: any;
  onCancel: () => void;
  filter: any;
  colleagues: CalibrationColleague[];
}> = ({ colleaguesRemoved, onRemove, filter, colleagues }) => {
  const { t } = useTranslation();
  const colleagueFilter = useSelector(getColleagueFilterSelector) || {};
  const { css } = useStyle(['lineHeight']);
  const [isPeopleListOpen, togglePeopleList] = useState<boolean>(false);
  const selectedNamesGroup = getSelectedGroups(colleagueFilter, filter)
    .map((name) => t(`group_name_${name}`, name))
    .join(' | ');

  const colleaguesRemovedUUID = colleaguesRemoved.map((colleagueRemoved) => colleagueRemoved.value);
  const colleaguesAvailable = colleagues?.filter(({ colleague }) => {
    return colleague?.uuid && !colleaguesRemovedUUID.includes(colleague.uuid);
  });

  const handleRemove = (colleague: any) => {
    const { uuid, firstName, lastName } = colleague.colleague;
    onRemove([...colleaguesRemoved, { value: uuid, label: `${firstName} ${lastName}`, type: 'remove' }]);
  };

  const onUndoRemove = (uuid) => {
    onRemove(colleaguesRemoved.filter((c) => c.value !== uuid));
  };

  return (
    <>
      <div className={css(borderStyle, { marginTop: '20px' })}>
        <div className={css(blockContainerStyle)}>
          <div
            className={css(
              { padding: '4px', minHeight: '28px' },
              { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
            )}
          >
            {selectedNamesGroup}
          </div>
        </div>
        <div className={css(blockContainerStyle, bottomBorderStyle, relativeStyles)}>
          <div className={css({ padding: '4px', minHeight: '28px' })}>
            {t('show_number_of_people_in_group', 'People in this group', { number: colleaguesAvailable.length })}
          </div>
          <div className={css({ paddingRight: '4px' })}>
            <IconButton
              onPress={() => togglePeopleList(!isPeopleListOpen)}
              graphic={isPeopleListOpen ? 'arrowUp' : 'arrowDown'}
            />
          </div>
          {isPeopleListOpen && colleaguesAvailable.length > 0 && (
            <div className={css(optionsWrapperStyles)}>
              {colleaguesAvailable?.map((item, idx) => (
                <div
                  data-test-id={`option-${idx}`}
                  key={idx}
                  className={css(optionStyle)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleRemove(item)}
                >
                  <ColleagueProfile
                    firstName={item?.colleague?.firstName}
                    lastName={item?.colleague?.lastName}
                    job={item?.colleague?.jobName}
                    department={''}
                    action={
                      <div className={css(optionActionStyle)}>
                        <Trans i18nKey='remove'>Remove</Trans>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {colleaguesRemoved?.length > 0 && (
        <div className={css({ position: 'relative' })}>
          {colleaguesRemoved.map((item) => (
            <div key={item.value} className={css(selectedStyle)}>
              <span className={css({ marginRight: '10px' })}>Removed: {`${item.label}`}</span>
              <div
                data-test-id={`remove-selected-${item.label}`}
                className={css({ cursor: 'pointer' })}
                onClick={() => onUndoRemove && onUndoRemove(item.value)}
              >
                <Icon graphic={'cancel'} fill={colors.error} size={'16px'} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const relativeStyles: Rule = {
  //@ts-ignore
  width: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const optionsWrapperStyles: Rule = ({ theme }) => ({
  display: 'block',
  position: 'absolute',
  width: '100%',
  top: '30px',
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
  borderRadius: theme.border.radius.sm,
  background: theme.colors.white,
  zIndex: theme.zIndex.i40,
});

const optionStyle: Rule = ({ theme }) => ({
  display: 'block',
  width: '100%',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  padding: '10px 30px 10px 16px',
  ':hover': {
    background: '#F3F9FC',
  },
});

const selectedStyle = ({ theme }) =>
  ({
    borderRadius: '10px',
    border: `2px solid ${theme.colors.error}`,
    height: '32px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 12px',
    marginRight: '16px',
    marginTop: '15px',

    '& > span': {
      whiteSpace: 'nowrap',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fixed.f16.lineHeight,
      letterSpacing: '0px',
      color: theme.colors.error,
    },
  } as Styles);

const borderStyle: Rule = ({ theme }) => ({ border: `1px solid ${theme.colors.tescoBlue}`, borderRadius: '5px' });
const bottomBorderStyle: Rule = ({ theme }) => ({
  background: theme.colors.backgroundDark,
  //@ts-ignore
  borderTop: `1px solid ${theme.colors.lightGray}`,
  borderRadius: '0 0 5px 5px',
});

const blockContainerStyle: Rule = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

const optionActionStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  marginLeft: 'auto',
  fontWeight: 'bold',
  color: theme.colors.tescoBlue,
});

export default ColleaguesRemover;
