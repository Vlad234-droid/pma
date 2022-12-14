import React, { FC } from 'react';
import { ColleagueSimple } from '@pma/openapi';
import { useStyle, Rule, Styles, CreateRule } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Trans } from 'components/Translation';

import defaultImg from 'images/default.png';

export const TILE_WRAPPER = 'tile-wrapper';
export const NAME = 'name';

export type Props = {
  colleague: ColleagueSimple;
  onClick: (uuid: string) => void;
  title?: string;
  properties?: { [key: string]: string };
  viewCustomStyles?: Rule | Styles;
};

const ViewColleagueProfile: FC<Props> = ({ colleague, onClick, title, properties, viewCustomStyles = {} }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <TileWrapper customStyle={wrapperStyles}>
      <div className={css(sectionStyle)}>
        <div className={css(blockInfo)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(imgStyle)} src={defaultImg} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3 className={css(namesStyle)} data-test-id={NAME}>{`${colleague?.firstName || ''} ${
              colleague?.lastName || ''
            }`}</h3>
            <p className={css(industryStyle)}>{`${colleague?.jobName || ''} ${colleague?.businessType || ''}`}</p>
          </div>
        </div>

        {(properties?.what_rating || properties?.how_rating) && (
          <div className={css(ratingContainer({ mobileScreen }))}>
            {properties?.what_rating && (
              <div className={css(ratingType)}>
                <span>{properties?.what_rating}</span>
                <span>
                  <Trans i18nKey={'what'} />
                </span>
              </div>
            )}
            {properties?.how_rating && (
              <div className={css(ratingType)}>
                <span>{properties?.how_rating}</span>
                <span>
                  <Trans i18nKey={'how'} />
                </span>
              </div>
            )}
          </div>
        )}

        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
          <div className={css({ display: 'flex', alignItems: 'center' })}>
            <span className={css(viewStyle, viewCustomStyles)} onClick={() => onClick(colleague.uuid as string)}>
              <Trans i18nKey={title ? title : 'view_profile'} />
            </span>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

const industryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};
const ratingContainer: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '5%',
  flexWrap: 'wrap',
  flexBasis: mobileScreen ? '0px' : '300px',
  margin: '0 20px',
});

const ratingType: Rule = (theme) =>
  ({
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    '& > span:first-child': {
      whiteSpace: 'nowrap',
      fontWeight: theme.font.weight.bold,
      fontSize: theme.font.fixed.f18.fontSize,
    },
    '& > span:last-child': {
      whiteSpace: 'nowrap',
      fontSize: theme.font.fixed.f16.fontSize,
      marginTop: '4px',
    },
  } as Styles);

const viewStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  color: theme.colors.link,
  cursor: 'pointer',
  padding: '2px',
  whiteSpace: 'nowrap',
});

const wrapperStyles: Rule = {
  padding: '24px 24px 24px 24px',
};

const sectionStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const blockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
  //@ts-ignore
  width: 'min(100%, 220px)',
};

const imgStyle: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};
const namesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  margin: '0px',
  color: '#00539F',
  minWidth: '50px',
};

export default ViewColleagueProfile;
