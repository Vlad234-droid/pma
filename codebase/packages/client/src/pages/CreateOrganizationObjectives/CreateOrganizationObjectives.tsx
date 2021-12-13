import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { Button, CreateRule, Rule, Theme, useStyle } from '@dex-ddl/core';
import { Header } from 'components/Header';
import DescriptionBlock from 'components/DescriptionBlock';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item } from 'components/Form';
import { useForm } from 'react-hook-form';
import HistoryTable from 'components/HistoryTable/HistoryTable';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, orgObjectivesSelector } from '@pma/store';
import { auditLogsSelector } from '@pma/store/src/selectors/audit-log';
import { useSelector } from 'react-redux';

export type CreateUpdateObjectiveModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectiveModalProps;
const formInputs = [
  {
    id: 0,
    name: 'Objective 1',
    label: 'Objective 1 label',
    placeholder: 'Enter title for this objectives',
    value: '',
  },
  {
    id: 1,
    name: 'Objective 2',
    label: 'Objective 2 label',
    placeholder: 'Enter title for this objectives',
    value: '',
  },
  {
    id: 2,
    name: 'Objective 3',
    label: 'Objective 3 label',
    placeholder: 'Enter title for this objectives',
    value: '',
  },
  {
    id: 3,
    name: 'Objective 4',
    label: 'Objective 4 label',
    placeholder: 'Enter title for this objectives',
    value: '',
  },
  {
    id: 4,
    name: 'Objective 5',
    label: 'Objective 5 label',
    placeholder: 'Enter title for this objectives',
    value: '',
  },
  {
    id: 5,
    name: 'Objective 6',
    label: 'Objective 6 label',
    placeholder: 'Enter title for this objectives',
    value: '',
  },
];

const historaTable = { headers: ['Name', 'Action Type', 'Time'] };

const CreateOrganizationObjectives: FC<Props> = () => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();
  const auditLogs = useSelector(auditLogsSelector) || [];

  const initialObjectivesData = [
    { number: 1, title: null },
    { number: 2, title: null },
    { number: 3, title: null },
    { number: 4, title: null },
    { number: 5, title: null },
    { number: 6, title: null },
  ];

  const [isSaveBtnDisabled, setSaveBtnDisabled] = useState<boolean>(true);
  const [isPublishBtnDisabled, setPublishBtnDisabled] = useState<boolean>(true);
  const [isHistoryOpen, setHistoryOpen] = useState<boolean>(false);
  const [getOrgObjectivesData, setOrgObjectivesData] = useState<Array<any>>(initialObjectivesData);

  const methods = useForm({
    mode: 'onChange',
  });

  const save = async () => {
    if (isSaveBtnDisabled) return;

    dispatch(
      OrgObjectiveActions.createOrgObjective({
        data: getOrgObjectivesData,
      }),
    );
  };

  const publish = async () => {
    if (isPublishBtnDisabled) return;

    dispatch(
      OrgObjectiveActions.createAndPublishOrgObjective({
        data: getOrgObjectivesData,
      }),
    );
  };

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const checkInputData = () => {
    if (getOrgObjectivesData.filter((el) => el.title !== null && el.title.length > 20).length == 6) {
      setSaveBtnDisabled(false);
      setPublishBtnDisabled(false);
    } else {
      setSaveBtnDisabled(true);
      setPublishBtnDisabled(true);
    }
  };

  const callCheckValidation = debounce(() => checkInputData());

  const onChangeInput = (value, idx) => {
    if (formInputs.every((el) => el.value !== null && el.value.length > 20)) {
      setSaveBtnDisabled(false);
      setPublishBtnDisabled(false);
    } else {
      callCheckValidation();
    }
    const newData = getOrgObjectivesData;
    newData[idx].title = value;

    setOrgObjectivesData(newData);
  };

  const orgObjectives = useSelector(orgObjectivesSelector) || [];

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgAuditLogs({ start: 1, limit: 3 }));
  }, []);

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

  return (
    <div className={css(main)}>
      {/* <LeftsideMenu /> */}
      <div className={css(page)}>
        <Header title='Create Organization Objectives' />

        <div className={css(contentArea)}>
          <DescriptionBlock>
            <div className={css(decsriptionHeader({ theme }))}>Organization objectives</div>

            <div className={css(descriptionText({ theme }))}>
              Create titles for organization objectives. Click “Save” button to keep the changes. Or “Publish” to
              cascade them on the colleagues.
            </div>
            <div>
              {formInputs.map((item, idx) => {
                formInputs[idx].value = orgObjectives[idx]?.title;
                return (
                  <GenericItemField
                    key={item.id}
                    name={item.name}
                    label={item.name}
                    methods={methods}
                    Wrapper={Item}
                    Element={Input}
                    onChange={(event) => onChangeInput(event, idx)}
                    placeholder={item.placeholder}
                    value={orgObjectives[idx]?.title}
                  />
                );
              })}
            </div>

            <div className={css(descriptionFooter)}>
              <Button onPress={() => setHistoryOpen(!isHistoryOpen)} styles={[historyBtn({ theme })]}>
                History of changes{' '}
                <span className={`${css(arrow)} ${!isHistoryOpen ? css(arrowRight) : css(arrowDown)}`} />
              </Button>
              <div className={css(publishBlock)}>
                <Button
                  isDisabled={isSaveBtnDisabled}
                  styles={
                    isSaveBtnDisabled ? [buttons, saveBtn({ theme }), saveBtnMargined] : [buttons, saveBtnMargined]
                  }
                  onPress={save}
                >
                  Save
                </Button>
                <Button
                  isDisabled={isPublishBtnDisabled}
                  styles={isPublishBtnDisabled ? [buttons, publishBtn({ theme })] : [buttons]}
                  onPress={publish}
                >
                  Publish
                </Button>
              </div>
            </div>
            <HistoryTable headers={historaTable.headers} items={auditLogs} isVisible={isHistoryOpen} />
          </DescriptionBlock>
        </div>
      </div>
    </div>
  );
};

const saveBtnMargined = {
  marginRight: '8px',
} as Rule;

const contentArea = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} as Rule;

const saveBtn: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    border: `2px solid ${theme.colors.tescoBlue}`,
    backgroundColor: `${theme.colors.white}`,
    color: `${theme.colors.tescoBlue}`,
    cursor: 'auto',
    ':disabled': {
      background: 'transparent',
    },
    '@media(max-width: 600px)': {
      marginBottom: '10px',
    },
  };
};

const publishBtn: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    border: `2px solid ${theme.colors.tescoBlue}`,
    backgroundColor: `${theme.colors.white}`,
    color: `${theme.colors.tescoBlue}`,
    cursor: 'auto',
    ':disabled': {
      background: 'transparent',
    },
    '@media(max-width: 600px)': {
      marginBottom: '10px',
    },
  };
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

const arrow = {
  marginLeft: '13.75px',
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '4px',
} as Rule;

const arrowRight = {
  transform: 'rotate(-45deg)',
  webkitTransform: 'rotate(-45deg)',
} as Rule;

const arrowDown = {
  marginTop: '-4px',
  transform: 'rotate(45deg)',
  webkitTransform: 'rotate(45deg)',
} as Rule;

const buttons = {
  width: '50%',
  cursor: 'pointer',
  '@media(max-width: 600px)': {
    width: '100%',
  },
} as Rule;

const publishBlock = {
  display: 'flex',
  width: '50%',
  '@media(max-width: 600px)': {
    flexDirection: 'column',
  },
} as Rule;

const descriptionFooter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px',
  '@media(max-width: 600px)': {
    flexDirection: 'column',
  },
} as Rule;

const descriptionText: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f16}`,
    lineHeight: '20px',
    paddingBottom: '32px',
  };
};

const decsriptionHeader: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f20}`,
    lineHeight: '24px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

const main = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
  overflow: 'auto',
  paddingRight: '20px',
  '@media(max-width: 600px)': {
    paddingRight: '0',
  },
} as Rule;

const page = {
  width: '100%',
  marginLeft: '15px',
  '@media(max-width: 600px)': {
    marginLeft: '0',
    paddingLeft: '15px',
  },
} as Rule;

export default CreateOrganizationObjectives;
