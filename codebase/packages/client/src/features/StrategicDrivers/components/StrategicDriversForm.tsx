import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Rule, useStyle } from '@dex-ddl/core';
import * as Yup from 'yup';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, orgObjectivesSelector, Status } from '@pma/store';
import GenericForm from 'components/GenericForm';
import { Input } from 'components/Form';
import { InfoModal } from 'features/Modal';

enum Statuses {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  DRAFT = 'DRAFT',
}

const prepareOrgObjectivesData = (newData, orgObjectivesData) => {
  return orgObjectivesData.map((objective, idx) => {
    return { ...objective, title: newData[`Strategic Driver ${idx + 1}`] || objective.title };
  });
};

const StrategicDriversForm: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const orgObjectives = useSelector(orgObjectivesSelector) || [];

  const [status, setStatus] = useState<Statuses>(Statuses.PENDING);

  const save = (newData) => {
    delete newData.objectives;
    const data = prepareOrgObjectivesData(newData, orgObjectives);
    dispatch(
      OrgObjectiveActions.createOrgObjective({
        data,
      }),
    );
    setStatus(() => Statuses.DRAFT);
  };

  const publish = (newData) => {
    delete newData.objectives;
    const data = prepareOrgObjectivesData(newData, orgObjectives);
    dispatch(
      OrgObjectiveActions.createAndPublishOrgObjective({
        data,
      }),
    );
    setStatus(() => Statuses.SUBMITTED);
  };

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

  const handleCancel = () => {
    // @ts-ignore
    dispatch(OrgObjectiveActions.changeOrgObjectiveMetaStatus(Status.IDLE));
    setStatus(() => Statuses.PENDING);
  };

  if (!orgObjectives.length) return null;

  const shame = Yup.object().shape({
    'Strategic Driver 1': Yup.string().required().min(10),
    'Strategic Driver 2': Yup.string().min(10),
    'Strategic Driver 3': Yup.string().min(10),
    'Strategic Driver 4': Yup.string().min(10),
    'Strategic Driver 5': Yup.string().min(10),
    'Strategic Driver 6': Yup.string().min(10),
  });

  return (
    <GenericForm
      formFields={orgObjectives.map((item): any => {
        return {
          Element: Input,
          name: `Strategic Driver ${item.number}`,
          id: `driver_${item.number}`,
          label: `Strategic driver ${item.number}`,
        };
      })}
      schema={shame}
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

          {status !== Statuses.PENDING && (
            <InfoModal
              title={`Strategic drivers successfully ${status === Statuses.DRAFT ? 'saved' : 'published'}`}
              onCancel={handleCancel}
            />
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
