import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Rule, useStyle } from '@dex-ddl/core';
import * as Yup from 'yup';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, orgObjectivesSelector, orgObjectivesMetaSelector, Status } from '@pma/store';
import get from 'lodash.get';
import GenericForm from 'components/GenericForm';
import { Input } from 'components/Form';
import { InfoModal } from 'features/Modal';

const prepareOrgObjectivesData = (newData, orgObjectivesData) => {
  return orgObjectivesData.map((objective, idx) => ({ ...objective, title: get(newData, idx) }));
};

const StrategicDriversForm: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const orgObjectives = useSelector(orgObjectivesSelector) || [];
  const { status } = useSelector(orgObjectivesMetaSelector);

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
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

  // @ts-ignore
  const handleCancel = () => dispatch(OrgObjectiveActions.changeOrgObjectiveMetaStatus(Status.IDLE));

  if (!orgObjectives.length) return null;

  return (
    <GenericForm
      formFields={orgObjectives.map((item): any => {
        return {
          Element: Input,
          name: `objectives.${item.number - 1}`,
          id: `objective_${item.number}`,
          label: `Strategic Priority ${item.number}`,
        };
      })}
      //@ts-ignore
      schema={Yup.object().shape({
        objectives: Yup.array().of(Yup.string().required().min(10)).length(orgObjectives.length).required(),
      })}
      renderButtons={(isValid, isDirty, handleSubmit) => (
        <div className={css(publishBlock)}>
          <Button
            isDisabled={!isValid || !isDirty}
            onPress={() => handleSubmit(save)()}
            styles={[button, buttonWithMarginRight, !isValid || !isDirty ? disabledButton : activeButton]}
          >
            Save
          </Button>
          <Button
            isDisabled={!isValid || !isDirty}
            onPress={() => {
              handleSubmit(publish)();
            }}
            styles={[button, !isValid || !isDirty ? disabledButton : activeButton]}
          >
            Publish
          </Button>
          {status === Status.SUCCEEDED && (
            <InfoModal title={'Strategic drivers successfully saved'} onCancel={handleCancel} />
          )}
        </div>
      )}
      defaultValues={{
        objectives: orgObjectives.map(({ title }) => title),
      }}
    />
  );
};

const buttonWithMarginRight: Rule = {
  marginRight: '8px',
};

const button: Rule = ({ theme }) => {
  return {
    width: '50%',
    cursor: 'pointer',
    backgroundColor: `${theme.colors.white}`,
    color: `${theme.colors.tescoBlue}`,

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

const publishBlock: Rule = () => ({
  display: 'flex',
  width: '50%',
  justifyItems: 'flex-end',
  marginLeft: 'auto',

  '@media(max-width: 600px)': {
    width: '100%',
    flexDirection: 'column',
  },
});

export default StrategicDriversForm;
