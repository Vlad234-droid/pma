import React, { FC, useState } from 'react';
import { useStyle, Rule, colors } from '@dex-ddl/core';

import { WidgetTeamMateProfile } from 'features/MyTeam';
import { Rating, Status } from 'config/enum';
import { IconButton } from 'components/IconButton';
import { Employee } from 'config/types';
import { useTranslation } from 'components/Translation';

import EditRatingsModal from '../EditRatingsModal';

type Props = {
  colleagues: Employee[];
  editMode: boolean;
  onSave: () => void;
};

const Colleagues: FC<Props> = ({ colleagues, editMode, onSave }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [currentEmployee, setCurrentEmployee] = useState<null | Employee>(null);
  const [currentRating, setCurrentRating] = useState<Rating>(Rating.OUTSTANDING);

  const handleEditRating = (employee: Employee) => {
    if (editMode) {
      setCurrentEmployee(employee);
    }
  };

  const handleCloseModal = () => {
    setCurrentEmployee(null);
  };

  const handleSaveChanges = (rating: Rating) => {
    // TODO: save changes
    setCurrentEmployee(null);
    setCurrentRating(rating);
    onSave();
  };

  return (
    <div>
      {currentEmployee && (
        <EditRatingsModal
          employee={currentEmployee}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
      <div className={css({ marginBottom: '16px', cursor: editMode ? 'pointer' : 'default' })}>
        {colleagues.map((employee) => (
          <WidgetTeamMateProfile
            key={employee.uuid}
            uuid={employee.uuid}
            status={Status.PENDING}
            employee={employee}
            rating={currentRating}
            onClick={() => handleEditRating(employee)}
          />
        ))}
      </div>
      <IconButton // TODO: change icon, fix styles, display when more items exist
        graphic='hamburger'
        customVariantRules={{
          default: buttonDefaultStyle,
        }}
        iconStyles={{ width: '18px', height: '18px' }}
        onPress={() => console.log('Load more')}
      >
        <span className={css(buttonText)}>{t('see_more', 'See more')}</span>
      </IconButton>
    </div>
  );
};

const buttonText: Rule = ({ theme }) => ({
  marginLeft: '8px',
  color: colors.tescoBlue,
  paddingBottom: '2px',
  fontSize: `${theme.font.fixed.f12}`,
});

const buttonDefaultStyle: Rule = {
  marginRight: 'auto',
  '> span:first-child': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '> svg path': {
    fill: colors.base,
    marinRight: '8px',
  },
} as Rule;

export default Colleagues;
