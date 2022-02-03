import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { UseFormReturn } from 'react-hook-form';
import { PeopleTypes } from './type';
import { FoldersWithNotesTypesTEAM } from 'features/NotesActions/type';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import defaultImg from 'images/default.png';

type SubmitPartProps = {
  selectedPerson: PeopleTypes;
  teamMethods: UseFormReturn;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
  createFolder: boolean;
};

export const SubmitPart: FC<SubmitPartProps> = ({
  selectedPerson,
  teamMethods,
  foldersWithNotesTEAM,
  createFolder,
}) => {
  const { css } = useStyle();
  const { trigger, getValues, setValue } = teamMethods;
  const notes: any = {
    require: [
      {
        id: '1',
        type: 'input',
        title: 'Title',
        placeholder: 'Enter a title for your note',
      },
      {
        id: '2',
        type: 'textarea',
        title: 'Note',
        placeholder: 'Write your note here',
      },
      {
        id: '3',
        type: 'select',
        title: 'Folder (optional)',
        placeholder: 'Select a folder',

        field_options: [
          ...foldersWithNotesTEAM?.map((item) => ({ value: `${item.id}`, label: item.title })),
          { value: 'id_001', label: '+ Add new folder' },
        ],
      },
    ],
    option: {
      id: '4',
      type: 'input',
      title: 'Folder name',
      placeholder: 'Enter a name for your new folder',
    },
  };

  const folder = [
    {
      id: '1',
      type: 'input',
      title: 'Folder name',
      placeholder: 'Enter a name for your new folder',
    },
  ];

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
        {!createFolder
          ? notes.require.map((item) => {
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
              if (item.type === 'select') {
                const { field_options } = item;
                return (
                  <GenericItemField
                    key={item.id}
                    name={`folder`}
                    methods={teamMethods}
                    label={item.title}
                    Wrapper={({ children }) => (
                      <Item withIcon={false} label={item.title}>
                        {children}
                      </Item>
                    )}
                    Element={Select}
                    options={field_options}
                    placeholder={item.placeholder}
                    onChange={(value) => {
                      setValue('folder', value);
                      trigger('folder');
                    }}
                  />
                );
              }
            })
          : folder.map((item) => {
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
        {values.folder !== '' && values.folder === 'id_001' && (
          <GenericItemField
            key={notes.option.id}
            name={`folderTitle`}
            methods={teamMethods}
            Wrapper={Item}
            Element={Input}
            placeholder={notes.option.placeholder}
            value={values.folderTitle}
            label={notes.option.title}
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
