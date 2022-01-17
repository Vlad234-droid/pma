import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { UseFormReturn } from 'react-hook-form';
import { PeopleTypes } from './type';
import { FoldersWithNotesTypesTEAM } from 'features/NotesActions/type';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import defaultImg from '../../../../../../public/default.png';

type SubmitPartProps = {
  selectedPerson: PeopleTypes;
  teamMethods: UseFormReturn;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
};

export const SubmitPart: FC<SubmitPartProps> = ({ selectedPerson, teamMethods, foldersWithNotesTEAM }) => {
  const { css } = useStyle();
  const { trigger, getValues, setValue } = teamMethods;
  const notes: any = {
    require: [
      {
        field_id: '1',
        field_type: 'input',
        field_title: 'Title',
        field_placeholder: 'Enter a title for your note',
      },
      {
        field_id: '2',
        field_type: 'textarea',
        field_title: 'Note',
        field_placeholder: 'Write your note here',
      },
      {
        field_id: '3',
        field_type: 'select',
        field_title: 'Folder (optional)',
        field_placeholder: 'Select a folder',

        field_options: [
          ...foldersWithNotesTEAM?.map((item) => ({ value: `${item.id}`, label: item.title })),
          { value: 'id_001', label: '+ Add new folder' },
        ],
      },
    ],
    option: {
      field_id: '4',
      field_type: 'input',
      field_title: 'Folder name',
      field_placeholder: 'Enter a name for your new folder',
    },
  };

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
            {`${selectedPerson?.workRelationships[0].job?.name}, ${selectedPerson?.workRelationships[0].department?.name}`}
          </p>
        </div>
      </div>

      <div className={css({ marginTop: '28px' })}>
        {notes.require.map((item) => {
          if (item.field_type === 'input') {
            return (
              <GenericItemField
                key={item.field_id}
                name={`noteTitle`}
                methods={teamMethods}
                label={item.field_title}
                Wrapper={Item}
                Element={Input}
                placeholder={item.field_placeholder}
              />
            );
          }
          if (item.field_type === 'textarea') {
            return (
              <GenericItemField
                key={item.field_id}
                name={`noteText`}
                methods={teamMethods}
                label={item.field_title}
                Wrapper={Item}
                Element={Textarea}
                placeholder={item.field_placeholder}
              />
            );
          }
          if (item.field_type === 'select') {
            const { field_options } = item;
            return (
              <GenericItemField
                key={item.field_id}
                name={`folder`}
                methods={teamMethods}
                label={item.field_title}
                Wrapper={({ children }) => (
                  <Item withIcon={false} label={item.field_title}>
                    {children}
                  </Item>
                )}
                Element={Select}
                options={field_options}
                placeholder={item.field_placeholder}
                onChange={(value) => {
                  setValue('folder', value);
                  trigger('folder');
                }}
              />
            );
          }
        })}
        {values.folder !== '' && values.folder === 'id_001' && (
          <GenericItemField
            key={notes.option.field_id}
            name={`folderTitle`}
            methods={teamMethods}
            Wrapper={Item}
            Element={Input}
            placeholder={notes.option.field_placeholder}
            value={values.folderTitle}
            label={notes.option.field_title}
          />
        )}
      </div>
    </div>
  );
};

const lineStyle: Rule = {
  background: '#E5E5E5',
  height: '1px',
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
const namesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px',
};

const industryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const treatmentStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};
