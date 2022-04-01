import React, { FC } from 'react';
import { useStyle, Rule, Theme, CreateRule, Styles } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation/Translation';
import { IconButton } from 'components/IconButton';

export const INFO_TABLE_WRAPPER = 'info_table_wrapper';

type Obj = {
  percent: number;
  quantity: number;
  title: string;
};

type InfoTableProps = {
  mainTitle: string;
  data: Array<Obj>;
  preTitle?: string;
};

const InfoTable: FC<InfoTableProps> = ({ mainTitle, data, preTitle = '' }) => {
  const { css, theme } = useStyle();

  return (
    <div className={css(infoTableWrapper)} data-test-id={INFO_TABLE_WRAPPER}>
      <h2 className={css(titleStyle({ preTitle, theme }))}>{mainTitle}</h2>
      {preTitle !== '' && (
        <div className={css(flexStyle)}>
          <IconButton
            graphic='information'
            iconStyles={iconStyle}
            onPress={() => {
              console.log();
            }}
          />
          <p className={css(preTitleStyle)}>{preTitle}</p>
        </div>
      )}
      <div className={css(blockWrapper)}>
        {data?.map((block, i) => {
          const percent = block.percent || 0;
          const quantity = block.quantity || 0;
          return (
            <div key={i} className={css({ display: 'flex', flexDirection: 'column' })}>
              <span className={css(percentStyle)}>{percent}%</span>
              <span className={css(quantityStyle)}>
                <Trans i18nKey='people'>People</Trans> {quantity}
              </span>
              <p className={css(blockTitleStyle)}>{block.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const infoTableWrapper: Rule = ({ theme }) => ({
  padding: '24px',
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  width: '100%',
});
const titleStyle: CreateRule<{ preTitle: string; theme: Theme }> = ({ preTitle, theme }) => ({
  color: theme.colors.link,
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  textAlign: 'center',
  margin: !preTitle ? '0px 0px 32px 0px' : '0px 0px 12px 0px',
});

const percentStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '32px',
  marginBottom: '4px',
});
const blockTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  marginTop: '18.5px',
});

const quantityStyle: Rule = ({ theme }) =>
  ({
    color: theme.colors.link,
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    position: 'relative',
    alignSelf: 'flex-start',
    ':after': {
      content: "''",
      width: '100%',
      height: '1px',
      position: 'absolute',
      bottom: '-8px',
      left: '0px',
      background: theme.colors.backgroundDarkest,
    },
  } as Styles);

const iconStyle: Rule = {
  marginRight: '10px',
};
const blockWrapper: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px',
};

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const preTitleStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '22px',
});

export default InfoTable;
