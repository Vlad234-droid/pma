import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useTranslation, Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import MarkdownRenderer from 'components/MarkdownRenderer';

type Props = {
  components: any[];
  objectives: Record<string, string>[];
  methods: UseFormReturn;
};

const mockObjectives = [
  {
    uuid: '18413165-c949-4b91-b8db-282ca5ad4d9a',
    type: 'OBJECTIVE',
    status: 'DRAFT',
    number: 1,
    colleagueUuid: 'df5202ac-1bf4-41b8-9717-f36798bc4123',
    tlPointUuid: '3467a739-53f0-4546-b64e-c2e5dfad26c4',
    properties: {
      title: 'title',
      description: 'description',
    },
    lastUpdatedTime: '2022-06-09T10:56:40.121Z',
  },
  {
    uuid: '18413165-c949-4b91-b8db-282ca5ad4d9d',
    type: 'OBJECTIVE',
    status: 'DRAFT',
    number: 2,
    colleagueUuid: 'df5202ac-1bf4-41b8-9717-f36798bc4123',
    tlPointUuid: '3467a739-53f0-4546-b64e-c2e5dfad26c4',
    properties: {
      title: 'title',
      description: 'description',
    },
    lastUpdatedTime: '2022-06-09T10:56:40.121Z',
  },
];

const Preview: FC<Props> = ({ components, objectives, methods }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  return (
    <>
      <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
        <div className={css(headerStyle)}>
          <Trans i18nKey={'please_review_your_priorities'}>Please review your priorities</Trans>
        </div>
        {mockObjectives.map((objective) => {
          return (
            <TileWrapper key={objective.uuid} boarder={true} customStyle={{ marginTop: '12px' }}>
              <div className={css({ padding: '20px' })}>
                <div className={css(headerTileStyle)}>Priority {objective.number}</div>
                {components.map((component) => {
                  if (component.key === 'title') {
                    return (
                      <div key={component.key} className={css(titleTileStyle)}>
                        {objective.properties.title}
                      </div>
                    );
                  }
                  if (component.key === 'description') {
                    return (
                      <div key={component.key} className={css(descriptionTileStyle)}>
                        {objective.properties.description}
                      </div>
                    );
                  }
                  return (
                    <div key={component.key}>
                      <MarkdownRenderer source={component.label} />
                      <div>{objective?.properties[component.key]}</div>
                    </div>
                  );
                })}
              </div>
            </TileWrapper>
          );
        })}
      </div>
    </>
  );
};

const headerStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f20,
  fontWeight: theme.font.weight.bold,
});
const headerTileStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f18,
  fontWeight: theme.font.weight.bold,
  color: theme.colors.tescoBlue,
});
const titleTileStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
});
const descriptionTileStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
});

export default Preview;
