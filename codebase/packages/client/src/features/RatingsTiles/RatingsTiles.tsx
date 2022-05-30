import React from 'react';
import { CreateRule, Rule, useStyle, Styles, IconButton } from '@pma/dex-wrapper';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { colleagueInfo } from '@pma/store';

import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { buildPath } from 'features/Routes';

import { getCards } from './utils';
import { paramsReplacer } from 'utils';
import { useFetchColleague } from './hooks/useFetchColleague';

const RatingsTiles = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  useFetchColleague(uuid);

  const { firstName, lastName, job, department } = useSelector(colleagueInfo);

  return (
    <>
      <div className={css(backStyle)}>
        <IconButton onPress={() => navigate(-1)} graphic='backwardLink' />
      </div>
      <p className={css(titleStyle)}>{firstName && lastName && `${firstName} ${lastName} | ${job} ${department}`}</p>
      <div className={css(ratingWrapper)}>
        {getCards(t).map((item, i) => (
          <div key={i} className={css(cardStyle({ mobileScreen }))}>
            <Link to={buildPath(paramsReplacer(item.page, { ':uuid': uuid as string }))}>
              <TileWrapper>
                <div className={css(wrapperBlock({ mobileScreen }))}>
                  <Icon graphic={item.graphic} viewBox={'0 0 32 32'} size={'32px'} />
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </TileWrapper>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

const titleStyle: Rule = ({ theme }) => ({
  marginBottom: 0,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f18.fontSize,
  height: '22px',
});

const backStyle: Rule = () => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: '16px',
  };
};

const ratingWrapper: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: '16px',
};

const wrapperBlock: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) =>
    ({
      padding: !mobileScreen ? '20px 4px 34px' : '16px',
      height: '146px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > h2': {
        margin: 0,
        color: theme.colors.tescoBlue,
        fontWeight: theme.font.weight.bold,
        fontSize: theme.font.fixed.f20.fontSize,
        textAlign: 'center',
        marginTop: '4px',
      },
      '& > p': {
        margin: 0,
        fontSize: theme.font.fixed.f16.fontSize,
        color: theme.colors.base,
        textAlign: 'center',
      },
    } as Styles);

const cardStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flexGrow: 1,
  flexBasis: mobileScreen ? '100%' : '45%',
});
export default RatingsTiles;
