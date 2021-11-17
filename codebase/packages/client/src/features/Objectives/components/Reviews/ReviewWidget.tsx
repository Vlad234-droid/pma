import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { useStyle, Rule, CreateRule, Colors, colors } from '@dex-ddl/core';

import { ReviewFormModal } from '../Modal';
import { TileWrapper } from 'components/Tile';
import { Icon, Graphics } from 'components/Icon';
import { TriggerModalButton } from 'features/Modal';

export type Props = {
  onClick: () => void;
  status?: Status;
  customStyle?: React.CSSProperties | {};
  title?: string;
  description?: string;
};

export const TEST_ID = 'review-widget';

const ReviewWidget: FC<Props> = ({ customStyle, onClick, status, description, title }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const getContent = (status): [Graphics, Colors, Colors, boolean, string] => {
    if (!status) {
      return [
        'roundAlert',
        'pending',
        'tescoBlue',
        false,
        t('review_form_not_available', 'This form is available now'),
      ];
    }
    const contents: { [key: string]: [Graphics, Colors, Colors, boolean, string] } = {
      [Status.NOT_AVAILABLE]: [
        'calender',
        'tescoBlue',
        'white',
        true,
        t('review_form_not_available', 'The form will be available in Sept 2021'),
      ],
      [Status.AVAILABLE]: [
        'roundAlert',
        'pending',
        'tescoBlue',
        true,
        t('review_form_not_available', 'This form is available now'),
      ],
      [Status.OVERDUE]: [
        'roundAlert',
        'error',
        'white',
        true,
        t('review_form_not_available', 'Submit by 08 Sept 2021'),
      ],
      [Status.DRAFT]: ['roundPencil', 'base', 'white', true, t('review_form_draft', 'Draft')],
      [Status.APPROVED]: ['roundTick', 'green', 'white', true, t('review_form_approved', 'Completed [08 Sep 2020]')],
      [Status.PENDING]: ['roundClock', 'pending', 'white', true, t('review_form_pending', 'Pending')],
    };

    return contents[status];
  };

  const [graphic, iconColor, background, shadow, content] = getContent(status);

  const descriptionColor = background === 'tescoBlue' ? colors.white : colors.base;
  const titleColor = background === 'tescoBlue' ? colors.white : colors.tescoBlue;
  const buttonVariant = background === 'tescoBlue' ? 'default' : 'inverse';

  const handleClick = () => {
    onClick();
  };

  return (
    <TileWrapper customStyle={{ ...customStyle }} hover={shadow} boarder={shadow} background={background}>
      <div className={css(wrapperStyle)} onClick={handleClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle({ color: titleColor }))}>{title}</span>
            <span className={css(descriptionStyle({ color: descriptionColor }))}>{description}</span>
            <span
              className={css(descriptionStyle({ color: descriptionColor }), {
                paddingTop: '16px',
                verticalAlign: 'middle',
              })}
            >
              <Icon
                graphic={graphic}
                iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                backgroundRadius={12}
                fill={colors[iconColor]}
              />
              {content}
            </span>
          </div>
        </div>
        {status !== Status.NOT_AVAILABLE && (
          <div className={css(bodyStyle)}>
            <div className={css(bodyBlockStyle)}>
              <TriggerModalButton
                name={t('view_and_edit', 'View and Edit')}
                title={t('mid_year_review_form', 'Mid-year review form')}
                mode={buttonVariant}
              >
                <>
                  <ReviewFormModal />
                </>
              </TriggerModalButton>
            </div>
          </div>
        )}
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = {
  padding: '24px 30px',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
};

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
};

const titleStyle: CreateRule<{ color: string }> = ({ color }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '12px',
  color,
});

const descriptionStyle: CreateRule<{ color: string }> = ({ color }) => ({
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  color,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

export default ReviewWidget;
