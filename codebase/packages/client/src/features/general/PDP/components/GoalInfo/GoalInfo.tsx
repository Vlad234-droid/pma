import React, { useEffect, useState } from 'react';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { Button, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { ConfirmModal } from 'features/general/Modal';
import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { DATE_STRING_FORMAT, EXPIRATION_DATE, formatDateString } from 'utils';

export const DELETE_TEST_ID = 'goal-delete';
export const EDIT_TEST_ID = 'goal-edit';

const modifiedTitleRegex = new RegExp(/\*/, 'g');

const GoalInfo = (props) => {
  const { id, title, subtitle, currentGoalId, description, data, formElements, deleteGoal, editGoal } = props;
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [isOpen, toggleOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 3000);
  }, []);

  return (
    <div className={css(fullGoals)}>
      {confirmDelete && (
        <ConfirmModal
          title={t('are_you_sure_you_want_to_delete_this_goal', 'Are you sure you want to delete this goal?')}
          description={t('this_is_permanent_and_cannot_be_undone', 'This is permanent and cannot be undone.')}
          submitBtnTitle={<Trans i18nKey='delete'>Delete</Trans>}
          onSave={() => {
            deleteGoal(id);
            setConfirmDelete(false);
            window.scrollTo(0, 0);
          }}
          onCancel={() => setConfirmDelete(false)}
          onOverlayClick={() => setConfirmDelete(false)}
        />
      )}
      <Accordion
        id={`pdp-goal-accordion-${title}`}
        customStyle={{
          borderBottom: 'none',
          marginTop: 0,
        }}
      >
        <BaseAccordion id={`pdp-goal-${title}`}>
          {() => (
            <>
              <Section defaultExpanded={false}>
                <div className={css(titleBlock)} onClick={() => toggleOpen(!isOpen)}>
                  {title?.replace(modifiedTitleRegex, '')}
                  <div className={css({ paddingLeft: '12px' })}>
                    <ExpandButton />
                  </div>
                </div>
                <div className={css(goalBlock)}>
                  <div className={css({ fontWeight: `${theme.font.weight.bold}` })}>
                    {subtitle.replace(modifiedTitleRegex, '')}
                  </div>
                  <div>{description}</div>
                </div>
                <Panel>
                  <div>
                    {data &&
                      Object.keys(data).map((key, index) => {
                        const isExpDate = key === EXPIRATION_DATE;

                        if (index !== 0) {
                          /* Math.random should replace to index to prevent extra rerender */
                          return (
                            <div
                              key={formElements[index].label + Math.random()}
                              className={`${css(fullDesc)} ${css(goalBlock)}`}
                            >
                              <div className={css({ fontWeight: `${theme.font.weight.bold}` })}>
                                {formElements[index].label.replace(modifiedTitleRegex, '')}
                              </div>
                              <div>{isExpDate ? formatDateString(data[key], DATE_STRING_FORMAT) : data[key]}</div>
                            </div>
                          );
                        }
                      })}

                    <div className={css(btnBlock)}>
                      <Button
                        data-test-id={EDIT_TEST_ID}
                        styles={[editBtn]}
                        onPress={() => editGoal(id, currentGoalId)}
                      >
                        <Icon graphic='edit' iconStyles={{ height: '16px', width: '16px' }} title={t('edit', 'Edit')} />
                        <div className={css({ marginLeft: '5px' })}>{t('edit', 'Edit')}</div>
                      </Button>

                      <Button
                        data-test-id={DELETE_TEST_ID}
                        styles={[btns]}
                        onPress={() => setConfirmDelete(!confirmDelete)}
                      >
                        <div className={css({ height: '25px' })}>
                          <Icon
                            graphic='delete'
                            fill={theme.colors.link}
                            iconStyles={{ width: '19.20px' }}
                            title={t('delete', 'Delete')}
                          />
                        </div>
                        <div className={css({ marginLeft: '5px' })}>{t('delete', 'Delete')}</div>
                      </Button>
                    </div>
                  </div>
                </Panel>
              </Section>
            </>
          )}
        </BaseAccordion>
      </Accordion>
    </div>
  );
};

const btnBlock: Rule = {
  margin: '24px 0 32px 0',
  display: 'flex',
  fontWeight: `${theme.font.weight.bold}`,
};

const editBtn: Rule = {
  padding: '8px 0',
  marginRight: '36.67px',
  background: 'none',
  color: `${theme.colors.tescoBlue}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  height: '34px',
  boxSizing: 'border-box',
};

const btns: Rule = {
  background: 'none',
  color: `${theme.colors.tescoBlue}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  height: '34px',
  boxSizing: 'border-box',
  padding: '8px 0px',
};

const fullGoals: Rule = {
  borderBottom: `2px solid ${theme.colors.backgroundDarkest}`,
};

const goalBlock: Rule = {
  paddingBottom: '24px',
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  userSelect: 'none',
  fontFamily: '"TESCO Modern", Arial, sans-serif',
};

const fullDesc: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  flexDirection: 'column',
};

const titleBlock: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 0 16px 0',
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  color: `${theme.colors.link}`,
};

export default GoalInfo;
