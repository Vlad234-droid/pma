import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { UseFormReturn } from 'react-hook-form';
import get from 'lodash.get';

import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import { useTranslation } from 'components/Translation';

import { PeopleTypes } from '../type';
import { FoldersWithNotesTypesTEAM } from 'features/NotesActions/type';
import { Option } from 'components/Form/types';
import { addNewFolderId, getFolder, getNotes } from 'utils';
import defaultImg from 'images/default.png';

type SubmitPartProps = {
  selectedPerson: PeopleTypes;
  teamMethods: UseFormReturn;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
  createFolder: boolean;
};

const SubmitPart: FC<SubmitPartProps> = ({ selectedPerson, teamMethods, foldersWithNotesTEAM, createFolder }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const { trigger, getValues, setValue } = teamMethods;

  const values = getValues();

  return (
    <div>
      <div className={css(lineStyle)} />

      <div className={css(blockInfo)}>
        <div className={css({ alignSelf: 'flex-start' })}>
          <img className={css(imgStyle)} src={defaultImg} alt='photo' />
        </div>
        <div className={css({ marginLeft: '16px' })}>
          <h3
            className={css(namesStyle)}
          >{`${selectedPerson?.profile?.firstName} ${selectedPerson?.profile?.lastName}`}</h3>
          <p className={css(industryStyle)}>
            {`${selectedPerson?.workRelationships?.[0]?.job?.name}, ${selectedPerson?.workRelationships?.[0]?.department?.name}`}
          </p>
        </div>
      </div>

      <div className={css({ marginTop: '28px' })}>
        {!createFolder
          ? getNotes(foldersWithNotesTEAM, t)?.require.map((item) => {
              if (item.type === 'input') {
                return (
                  <GenericItemField
                    key={item.id}
                    name={`noteTitle`}
                    methods={teamMethods}
                    label={item.title}
                    Wrapper={Item}
                    Element={Input}
                    placeholder={item.placeholder}
                  />
                );
              }
              if (item.type === 'textarea') {
                return (
                  <GenericItemField
                    key={item.id}
                    name={`noteText`}
                    methods={teamMethods}
                    label={item.title}
                    Wrapper={Item}
                    Element={Textarea}
                    placeholder={item.placeholder}
                  />
                );
              }
              // TODO: Extract duplicate 6
              if (item.type === 'select') {
                const { field_options } = item;
                return (
                  <Item withIcon={false} label={item.title} key={item.id}>
                    <Select
                      options={field_options as Option[]}
                      name={'targetType'}
                      placeholder={item.placeholder}
                      //@ts-ignore
                      onChange={({ target }) => {
                        const { value } = target;
                        if (get(values, 'folderTitle')) setValue('folderTitle', '', { shouldValidate: false });
                        setValue('folder', value, { shouldValidate: true });
                      }}
                    />
                  </Item>
                );
              }
            })
          : getFolder(t)?.map((item) => {
              return (
                <GenericItemField
                  key={item.id}
                  name={`folderTitle`}
                  methods={teamMethods}
                  label={item.title}
                  Wrapper={Item}
                  Element={Input}
                  placeholder={item.placeholder}
                  onChange={() => {
                    trigger('folderTitle');
                  }}
                  value={values.folderTitle}
                />
              );
            })}
        {get(values, 'folder') === addNewFolderId && (
          <GenericItemField
            key={getNotes(foldersWithNotesTEAM, t)?.option.id}
            name={`folderTitle`}
            methods={teamMethods}
            Wrapper={Item}
            Element={Input}
            placeholder={getNotes(foldersWithNotesTEAM, t)?.option.placeholder}
            value={values.folderTitle}
            label={getNotes(foldersWithNotesTEAM, t)?.option.title}
          />
        )}
      </div>
    </div>
  );
};

const lineStyle: Rule = {
  background: '#E5E5E5',
  height: '2px',
  marginBottom: '16px',
};

const blockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const imgStyle: Rule = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
};
// TODO: Extract duplicate 15
const namesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px',
};

// TODO: Extract duplicate 16
const industryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

export default SubmitPart;
