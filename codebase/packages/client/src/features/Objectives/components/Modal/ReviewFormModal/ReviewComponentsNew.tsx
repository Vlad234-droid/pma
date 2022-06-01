import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateRule, Styles, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, ItemProps, Select, Text, Textarea } from 'components/Form';
import { Status } from 'config/enum';

type ReviewComponentsProps = {
  components: any[];
  review: Record<string, string>;
  methods: UseFormReturn;
  readonly: boolean;
  commentAllowed?: boolean;
  status?: Status;
};

const conditionalLogicDisplay = ({ conditional, componentValues = {} }): boolean => {
  const { show = null, when = null, eq = '' } = conditional;
  if (show === true) {
    if (when !== null) {
      return (componentValues?.[when] || '') === eq;
    }
  } else if (show === false) {
    if (when !== null) {
      return (componentValues?.[when] || '') !== eq;
    }
    return false;
  }
  return true;
};

const ComponentsTree = ({ components, methods, review, readonly, status, commentAllowed }): any => {
  const { css } = useStyle();

  return (
    <>
      {components.map((component) => {
        const { type, key } = component;
        const value = key && review[key] ? review[key] : '';
        let isReadonly = readonly;
        let isDisabled = component?.disabled;
        if (
          component?.properties?.['auth.permission.write'] &&
          status === Status.WAITING_FOR_APPROVAL &&
          commentAllowed
        ) {
          isReadonly = false;
        } else if (
          component?.properties?.['auth.permission.write'] &&
          [Status.DRAFT, Status.DECLINED].includes(status)
        ) {
          isReadonly = false;
          isDisabled = true;
        }

        const isComponentAvailable =
          commentAllowed ||
          conditionalLogicDisplay({
            conditional: component?.conditional || {},
            componentValues: review || {},
          });

        if (!isComponentAvailable) {
          return null;
        } else if (type === 'well') {
          return (
            <TileWrapper key={component.id} boarder={true} customStyle={{ marginTop: '12px' }}>
              <div className={css({ padding: '0 20px 20px' })}>
                <ComponentsTree
                  components={component?.components}
                  methods={methods}
                  review={review}
                  readonly={readonly}
                  status={status}
                  commentAllowed={commentAllowed}
                />
              </div>
            </TileWrapper>
          );
        } else if (type === 'htmlelement') {
          const { tag: CustomTag = 'p' } = component;
          const Tag = ({ children }) => {
            return <CustomTag className={css(markdownCustomStyle({ tag: CustomTag }))}>{children}</CustomTag>;
          };

          return <MarkdownRenderer key={component.id} components={{ p: Tag }} source={component?.content} />;
        } else if (type === 'textfield' && component.key) {
          return (
            <GenericItemField
              key={component.id}
              name={component.key}
              methods={methods}
              label={component?.label}
              Wrapper={Item}
              wrapperProps={
                (isReadonly
                  ? { marginBot: false, labelCustomStyle: { padding: 0 } }
                  : { marginBot: false, labelCustomStyle: { padding: '10px 0px 8px' } }) as ItemProps
              }
              //@ts-ignore
              Element={isReadonly ? Text : Input}
              placeholder={component?.placeholder}
              value={value}
              readonly={isDisabled || isReadonly}
            />
          );
        } else if (type === 'textarea' && component.key) {
          return (
            <GenericItemField
              key={component.id}
              name={component.key}
              methods={methods}
              label={component?.label}
              Wrapper={Item}
              wrapperProps={
                (isReadonly
                  ? { marginBot: false, labelCustomStyle: { padding: 0 } }
                  : { marginBot: false, labelCustomStyle: { padding: '10px 0px 8px' } }) as ItemProps
              }
              //@ts-ignore
              Element={isReadonly ? Text : Textarea}
              placeholder={component?.placeholder}
              value={value}
              readonly={isDisabled || isReadonly}
            />
          );
        } else if (type === 'select' && component.key) {
          return (
            <GenericItemField
              key={component.id}
              name={key}
              methods={methods}
              label={component?.label}
              Wrapper={Item}
              wrapperProps={
                (isReadonly
                  ? { marginBot: false, labelCustomStyle: { padding: 0 } }
                  : { marginBot: false, labelCustomStyle: { padding: '10px 0px 8px' } }) as ItemProps
              }
              //@ts-ignore
              Element={isReadonly ? Text : Select}
              options={component?.data?.values}
              placeholder={component?.placeholder}
              value={value}
              readonly={isReadonly}
            />
          );
        }

        return null;
      })}
    </>
  );
};
const ReviewComponents: FC<ReviewComponentsProps> = ({
  components,
  review,
  methods,
  readonly,
  status,
  commentAllowed = false,
}) => {
  return (
    <ComponentsTree
      components={components}
      methods={methods}
      review={review}
      readonly={readonly}
      status={status}
      commentAllowed={commentAllowed}
    />
  );
};

const markdownCustomStyle: CreateRule<{ tag: string }> =
  ({ tag = 'p' }) =>
  ({ theme }) => {
    const tags = {
      p: {
        padding: '16px 0 8px 0',
        margin: 0,
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fluid.f16.lineHeight,
        letterSpacing: '0px',
      },
      h2: {
        padding: '14px 0 8px 0',
        margin: 0,
        fontSize: theme.font.fixed.f18.fontSize,
        lineHeight: theme.font.fluid.f18.lineHeight,
        letterSpacing: '0px',
      },
    };
    return {
      padding: 0,
      ...(tags[tag] ? tags[tag] : {}),
    } as Styles;
  };

export default ReviewComponents;
