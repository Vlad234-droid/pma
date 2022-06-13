import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import * as Yup from 'yup';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, orgObjectivesSelector, orgObjectivesMetaSelector, Status } from '@pma/store';
import GenericForm from 'components/GenericForm';
import { Input } from 'components/Form';
import { InfoModal } from 'features/general/Modal';
import Spinner from 'components/Spinner';
import { RICH_TEXT_CHARACTERS_LIMIT } from 'config/constants';

enum Mode {
  SAVED = 'saved',
  PUBLISHED = 'published',
}

const strLength = Yup.string().min(10);

// TODO: move schema to separate file
const schema = Yup.object().shape({
  drivers: Yup.array().of(
    //@ts-ignore
    Yup.string()
      .test('firstMandatory', 'strategic driver 1 is required', function () {
        const { options } = this as Yup.TestContext;

        //@ts-ignore
        if (options && options?.index === 0) {
          //@ts-ignore
          return options.originalValue.length > 0;
        }
        return true;
      })
      .test('minLength', 'must be at least 10 characters', function () {
        const { options } = this as Yup.TestContext;
        //@ts-ignore
        if (options && options.originalValue) {
          //@ts-ignore
          return strLength.isValidSync(options.originalValue);
        }
        return true;
      })
      .max(RICH_TEXT_CHARACTERS_LIMIT),
  ),
});

const prepareOrgObjectivesData = (newData, orgObjectivesData) => {
  return orgObjectivesData.map((objective, idx) => ({ ...objective, title: newData[idx] }));
};

const StrategicDriversForm: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const orgObjectives = useSelector(orgObjectivesSelector) || [];

  const { status, loading, loaded } = useSelector(orgObjectivesMetaSelector);

  const [mode, setMode] = useState<Mode>();

  const save = (newData) => {
    setMode(Mode.SAVED);
    const data = prepareOrgObjectivesData(newData.drivers, orgObjectives);
    dispatch(
      OrgObjectiveActions.createOrgObjective({
        data,
      }),
    );
  };

  const publish = (newData) => {
    const data = prepareOrgObjectivesData(newData.drivers, orgObjectives);
    setMode(Mode.PUBLISHED);
    dispatch(
      OrgObjectiveActions.createAndPublishOrgObjective({
        data,
      }),
    );
  };

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

  const handleCancel = () => {
    // @ts-ignore
    dispatch(OrgObjectiveActions.changeOrgObjectiveMetaStatus(Status.IDLE));
  };

  if (!loaded || loading) {
    return <Spinner />;
  }

  if (!orgObjectives.length) return null;

  return (
    <GenericForm
      formFields={orgObjectives?.map((item, idx): any => {
        return {
          Element: Input,
          name: `drivers.${idx}`,
          id: `drivers_${idx}`,
          label: `Strategic driver ${item.number}`,
        };
      })}
      schema={schema}
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
            <InfoModal title={`Strategic drivers successfully ${mode}`} onCancel={handleCancel} />
          )}
        </div>
      )}
      defaultValues={{
        drivers: orgObjectives?.map(({ title }) => title),
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
