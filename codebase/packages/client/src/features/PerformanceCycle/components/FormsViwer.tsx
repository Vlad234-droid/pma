import React, { FC, useState } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Radio } from 'components/Form';
import { ObjectiveModal } from 'features/Objectives/components/ObjectiveModal';
import { useTranslation } from 'components/Translation';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

type Props = {
  forms: Array<any>;
  isActive: Boolean;
};

const FormsViewer: FC<Props> = ({ forms, isActive }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [activeFormIndex, setActiveFormIndex] = useState<number | undefined>();

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
  });

  const activeForm = activeFormIndex !== undefined && JSON.parse(forms[activeFormIndex].json);

  return (
    <TileWrapper
      customStyle={{
        margin: '8px',
        padding: '25px',
        maxWidth: '1300px',
        ...(!isActive ? { color: '#E5E5E5' } : {}),
      }}
    >
      <div
        className={css({
          fontWeight: 'bold',
          fontSize: '20px',
        })}
      >
        4. {t('forms', 'Forms')}
      </div>
      <div className={`${isActive ? css(visibleContainerStyle) : css(containerStyle)}`}>
        <div className={css({ display: 'flex', marginTop: '8px' })}>
          {forms.filter(Boolean).map((form, idx) => {
            return (
              <div key={idx} className={css({ padding: '0px 10px' })}>
                <label
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                  })}
                >
                  <Radio name='status' checked={activeFormIndex === idx} onChange={() => setActiveFormIndex(idx)} />
                  <span
                    className={css({
                      fontSize: '16px',
                      lineHeight: '20px',
                      padding: '0px 5px',
                    })}
                  >
                    {form?.code}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
        {activeFormIndex !== undefined && (
          <ObjectiveModal
            formValues={{}}
            schemaComponents={activeForm?.components}
            methods={methods}
            currentObjectiveNumber={1}
            useSingleStep={false}
            submitForm={false}
            setPrevObjectiveNumber={() => console.log}
            onSaveDraft={() => console.log}
            onSubmit={() => console.log}
            setNextObjectiveNumber={() => console.log}
            onClose={() => console.log}
            skipFooter={true}
            skipHelp={true}
          />
        )}
      </div>
    </TileWrapper>
  );
};

export default FormsViewer;

const containerStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'none',
};

const visibleContainerStyle: Rule = () => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '16px 8px',
});
