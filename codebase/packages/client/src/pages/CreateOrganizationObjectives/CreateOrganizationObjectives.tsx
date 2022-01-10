import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { useForm } from 'react-hook-form';
import { Button, CreateRule, Rule, Theme, useStyle } from '@dex-ddl/core';
import DescriptionBlock from 'components/DescriptionBlock';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item } from 'components/Form';
import HistoryTable from 'components/HistoryTable/HistoryTable';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, orgObjectivesSelector, auditLogsSelector } from '@pma/store';

export type CreateUpdateObjectiveModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectiveModalProps;

const historyTable = { headers: ['Name', 'Action Type', 'Time'] };

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
  const [orgObjectivesData, setOrgObjectivesData] = useState<Array<any>>(initialObjectivesData);

  const orgObjectives = useSelector(orgObjectivesSelector) || [];

  const methods = useForm({
    mode: 'onChange',
  });

  const save = () => {
    if (isSaveBtnDisabled) return;

    dispatch(
      OrgObjectiveActions.createOrgObjective({
        data: orgObjectivesData,
      }),
    );
  };

  const publish = () => {
    if (isPublishBtnDisabled) return;

    dispatch(
      OrgObjectiveActions.createAndPublishOrgObjective({
        data: orgObjectivesData,
      }),
    );

    setTimeout(_ => dispatch(OrgObjectiveActions.getOrgAuditLogs({ start: 1, limit: 3 })), 100);
  };

  const checkInputData = () => {
    const isValidInputs = orgObjectivesData.some((el) => el.title && el.title.length > 20);
    const hasChanges = orgObjectivesData.some((el, idx) => el.title !== orgObjectives[idx]?.title);

    if (isValidInputs && hasChanges) {
      setSaveBtnDisabled(false);
      setPublishBtnDisabled(false);
    } else {
      setSaveBtnDisabled(true);
      setPublishBtnDisabled(true);
    }
  };

  const callCheckValidation = debounce(checkInputData);

  const onChangeInput = (value, idx) => {
    const newData = orgObjectivesData.map((item, index) => (index === idx ? { ...item, title: value } : { ...item }));

    setOrgObjectivesData(newData);
  };

  useEffect(() => {
    if (orgObjectives.length) {
      setOrgObjectivesData([...orgObjectives]);
    }
  }, [orgObjectives]);

  useEffect(() => {
    callCheckValidation();
  }, [orgObjectivesData]);

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
        <div className={css(contentArea)}>
          <DescriptionBlock>
            <div className={css(descriptionHeader({ theme }))}>Strategic drivers</div>

            <div className={css(descriptionText({ theme }))}>
              Create titles for Strategic drivers. Click “Save” button to keep the changes. Or “Publish” to cascade them
              on the colleagues.
            </div>
            <div>
              {orgObjectivesData.map((item, idx) => {
                return (
                  <GenericItemField
                    key={idx}
                    name={`strategic_driver_${idx + 1}`}
                    label={`Strategic Driver ${idx + 1}`}
                    methods={methods}
                    Wrapper={Item}
                    Element={Input}
                    onChange={(event) => onChangeInput(event, idx)}
                    placeholder={'Enter title for this Strategic Driver'}
                    value={item?.title || ''}
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
                  Save as draft
                </Button>
                <Button
                  isDisabled={isPublishBtnDisabled}
                  styles={isPublishBtnDisabled ? [buttons, publishBtn] : [buttons]}
                  onPress={publish}
                >
                  Submit
                </Button>
              </div>
            </div>
            <HistoryTable headers={historyTable.headers} items={auditLogs} isVisible={isHistoryOpen} />
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
    opacity: '0.5',
    cursor: 'auto',
    ':disabled': {
      background: 'transparent',
    },
    '@media(max-width: 600px)': {
      marginBottom: '10px',
    },
  };
};

const publishBtn: Rule = ({ theme }) => {
  return {
    // border: `2px solid ${theme.colors.tescoBlue}`,
    backgroundColor: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    opacity: '0.5',
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
