import React, { FC } from 'react';
import { ColleagueSimple } from '@pma/openapi';
import { useStyle, Rule, Styles, CreateRule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Line } from 'components/Line';
import { Icon } from 'components/Icon';

import defaultImg from 'images/default.png';

export const TILE_WRAPPER = 'tile-wrapper';
export const NAME = 'name';

export type Props = {
  colleague: ColleagueSimple;
  onClick: (uuid: string) => void;
  title?: string;
  properties?: { [key: string]: string };
  viewCustomStyles?: Rule | Styles;
  withIcon?: boolean;
  isCollapsed?: boolean;
};

const ViewColleagueProfile: FC<Props> = ({
  colleague,
  onClick,
  title,
  properties,
  viewCustomStyles = {},
  withIcon = false,
  isCollapsed = true,
}) => {
  const { css, matchMedia, theme } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const isRatingExist = properties?.what_rating || properties?.how_rating;

  const discuss = (
    <div className={css({ marginRight: '10px', opacity: withIcon ? '1' : '0' })}>
      <Icon graphic={'roundChat'} fill={theme.colors.pending} />
    </div>
  );
  const ratings = (
    <div className={css(ratingContainer({ mobileScreen }))}>
      {properties?.what_rating && (
        <div className={css(ratingType({ mobileScreen }))}>
          <span>{properties?.what_rating}</span>
          <span>
            <Trans i18nKey={'what'} />
          </span>
        </div>
      )}
      {properties?.how_rating && (
        <div className={css(ratingType({ mobileScreen }))}>
          <span>{properties?.how_rating}</span>
          <span>
            <Trans i18nKey={'how'} />
          </span>
        </div>
      )}
      {mobileScreen && discuss}
    </div>
  );

  return (
    <TileWrapper customStyle={wrapperStyles({ mobileScreen, isCollapsed })}>
      <div className={css(sectionStyle)}>
        <div className={css(blockInfo({ isCollapsed }))}>
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

        {!mobileScreen && isRatingExist && ratings}

        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
          {!mobileScreen && discuss}
          <div className={css({ display: 'flex', alignItems: 'center' })}>
            <span className={css(viewStyle, viewCustomStyles)} onClick={() => onClick(colleague.uuid as string)}>
              <Trans i18nKey={title ? title : 'view_profile'} />
            </span>
          </div>
        </div>
      </div>
      {mobileScreen && isRatingExist && (
        <>
          <Line styles={lineStyles} />
          <div className={css(ratingsContainer)}>{ratings}</div>
        </>
      )}
    </TileWrapper>
  );
};

const lineStyles: Rule = {
  margin: '16px -100px 0px -100px',
};

const ratingsContainer: Rule = {
  paddingTop: '16px',
};

const industryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const ratingContainer: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '10%',
  flexWrap: mobileScreen ? 'nowrap' : 'wrap',
  flexBasis: mobileScreen ? '0px' : '360px',
  margin: '0 20px',
  ...(mobileScreen && { alignItems: 'center' }),
});

const ratingType: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  (theme) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      ...(!mobileScreen && { minWidth: '150px' }),
      alignSelf: 'center',
      '& > span:first-child': {
        whiteSpace: 'nowrap',
        fontWeight: theme.font.weight.bold,
        fontSize: !mobileScreen ? theme.font.fixed.f18.fontSize : theme.font.fixed.f16.fontSize,
      },
      '& > span:last-child': {
        whiteSpace: 'nowrap',
        fontSize: !mobileScreen ? theme.font.fixed.f16.fontSize : theme.font.fixed.f14.fontSize,
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

const wrapperStyles: CreateRule<{ mobileScreen: boolean; isCollapsed: boolean }> = ({ mobileScreen, isCollapsed }) => ({
  padding: mobileScreen ? '16px' : '24px 10px',
  ...(!isCollapsed && { minHeight: mobileScreen ? '100px' : '116px' }),
});

const sectionStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const blockInfo: CreateRule<{ isCollapsed }> = ({ isCollapsed }) =>
  ({
    display: 'inline-flex',
    alignItems: 'center',
    //@ts-ignore
    ...(isCollapsed && { width: 'min(100%, 220px)' }),
  } as Styles);

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
