import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CreateRule, Rule, Theme, useStyle } from '@dex-ddl/core';
import * as Yup from 'yup';
import DescriptionBlock from 'components/DescriptionBlock';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, orgObjectivesSelector, auditLogsSelector } from '@pma/store';
import get from 'lodash.get';
import GenericForm from 'components/GenericForm';
import { Input } from 'components/Form';
import HistoryTable from 'components/HistoryTable/HistoryTable';

export type CreateUpdateObjectiveModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectiveModalProps;

const historyTable = { headers: ['Name', 'Action Type', 'Time'] };

const prepareOrgObjectivesData = (newData, orgObjectivesData) => {
  return orgObjectivesData.map((objective) => ({ ...objective, title: get(newData, objective.number) }));
};

const CreateOrganizationObjectives: FC<Props> = () => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();
  const auditLogs = useSelector(auditLogsSelector) || [];

  const [isHistoryOpen, setHistoryOpen] = useState<boolean>(false);

  const orgObjectives = useSelector(orgObjectivesSelector) || [];

  const save = (newData) => {
    const data = prepareOrgObjectivesData(newData.objectives, orgObjectives);

    dispatch(
      OrgObjectiveActions.createOrgObjective({
        data,
      }),
    );
  };

  const publish = (newData) => {
    const data = prepareOrgObjectivesData(newData.objectives, orgObjectives);

    dispatch(
      OrgObjectiveActions.createAndPublishOrgObjective({
        data,
      }),
    );
  };

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgAuditLogs({ start: 1, limit: 3 }));
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

  if (!orgObjectives.length) return null;

  const handleChangeSelect = (e) => {
    console.log(e);
  };

  return (
    <div className={css(main)}>
      {/* <LeftsideMenu /> */}
      <div className={css(page)}>
        <div className={css(contentArea)}>
          <DescriptionBlock>
            <div className={css(descriptionHeader({ theme }))}>Strategic Priorities</div>
            <div className={css(descriptionText({ theme }))}>
              Create titles for Strategic drivers. Click “Save” button to keep the changes. Or “Publish” to cascade them
              on the colleagues.
            </div>
            <div>
              <GenericForm
                formFields={orgObjectives.map((item): any => {
                  return {
                    Element: Input,
                    name: `objectives.${item.number}`,
                    id: `objective_${item.number}`,
                    label: `Strategic Priority ${item.number}`,
                  };
                })}
                //@ts-ignore
                schema={Yup.object().shape({
                  objectives: Yup.object().shape({
                    ...orgObjectives?.reduce((acc, { number }) => {
                      return { ...acc, [number]: Yup.string().min(10).required() };
                    }, {}),
                  }),
                })}
                renderButtons={(isValid, handleSubmit) => (
                  <div className={css(descriptionFooter)}>
                    <Button onPress={() => setHistoryOpen(!isHistoryOpen)} styles={[historyBtn({ theme })]}>
                      History of changes{' '}
                      <span className={`${css(arrow)} ${!isHistoryOpen ? css(arrowRight) : css(arrowDown)}`} />
                    </Button>
                    <div className={css(publishBlock)}>
                      <Button
                        isDisabled={!isValid}
                        onPress={() => handleSubmit(save)()}
                        styles={[button, saveBtnMargined, !isValid ? disabledButton : activeButton]}
                      >
                        Save
                      </Button>
                      <Button
                        isDisabled={!isValid}
                        onPress={() => {
                          handleSubmit(publish)();
                        }}
                        styles={[button, !isValid ? disabledButton : activeButton]}
                      >
                        Publish
                      </Button>
                    </div>
                  </div>
                )}
                defaultValues={{
                  objectives: orgObjectives.reduce((acc, { title, number }) => ({ ...acc, [number]: title }), {}),
                }}
              />
            </div>
            <HistoryTable headers={historyTable.headers} items={auditLogs} isVisible={isHistoryOpen} />
          </DescriptionBlock>
        </div>
      </div>
    </div>
  );
};

const saveBtnMargined: Rule = {
  marginRight: '8px',
};

const button: Rule = ({ theme }) => {
  return {
    width: '50%',
    cursor: 'pointer',
    backgroundColor: `${theme.colors.white}`,
    color: `${theme.colors.tescoBlue}`,
    opacity: '0.5',

    '@media(max-width: 600px)': {
      width: '100%',
      marginBottom: '10px',
    },
  };
};

const activeButton: Rule = ({ theme }) => {
  return {
    border: `2px solid ${theme.colors.tescoBlue}`,
    color: `${theme.colors.tescoBlue}`,
  };
};

const disabledButton: Rule = ({ theme }) => {
  return {
    border: `2px solid ${theme.colors.disabled}`,
    color: `${theme.colors.disabled}`,
    cursor: 'default',
  };
};

const contentArea: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const historyBtn: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    backgroundColor: 'transparent',
    color: `${theme.colors.tescoBlue}`,
    fontWeight: 'bold',
  };
};

const arrow: Rule = {
  marginLeft: '13.75px',
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '4px',
};

const arrowRight: Rule = {
  transform: 'rotate(-45deg)',
};

const arrowDown: Rule = {
  marginTop: '-4px',
  transform: 'rotate(45deg)',
};

const publishBlock: Rule = () => ({
  display: 'flex',
  width: '50%',

  '@media(max-width: 600px)': {
    flexDirection: 'column',
  },
});

const descriptionFooter: Rule = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px',

  '@media(max-width: 600px)': {
    flexDirection: 'column',
  },
});

const descriptionText: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f16}`,
    lineHeight: '20px',
    paddingBottom: '32px',
  };
};

const descriptionHeader: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f20}`,
    lineHeight: '24px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

const main: Rule = () => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  paddingRight: '20px',

  '@media(max-width: 600px)': {
    paddingRight: '0',
  },
});

const page: Rule = () => ({
  width: '100%',
  marginLeft: '15px',

  '@media(max-width: 600px)': {
    marginLeft: '0',
    paddingLeft: '15px',
  },
});

export default CreateOrganizationObjectives;
