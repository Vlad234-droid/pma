import React from 'react';
import { CreateRule, Rule, useStyle, Styles, IconButton } from '@pma/dex-wrapper';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';

import { getCards } from './utils';
import { paramsReplacer } from '../../utils';
import { buildPath } from 'features/Routes';

const PreviousRatingsTiles = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  return (
    <>
      <div className={css(backStyle)}>
        <IconButton onPress={() => navigate(-1)} graphic='backwardLink' />
      </div>
      <div className={css(ratingWrapper)}>
        {getCards(t).map((item, i) => (
          <div key={i} className={css(cardStyle({ mobileScreen }))}>
            <Link
              to={buildPath(paramsReplacer(item.page, { ':uuid': uuid as string }))}
              //TODO: temporary solution in future remove this until 4 tiles be ready
              className={css(linkStyle({ page: item.page }))}
            >
              <TileWrapper>
                <div className={css(wrapperBlock({ mobileScreen }))}>
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
const linkStyle: CreateRule<{ page: string }> = ({ page }) => {
  return {
    pointerEvents: page ? 'all' : 'none',
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
      padding: !mobileScreen ? '24px 24px 34px 24px' : '20px',
      height: '166px',
      '& > h2': {
        margin: 0,
        color: theme.colors.tescoBlue,
        fontWeight: theme.font.weight.bold,
        fontSize: theme.font.fixed.f24.fontSize,
        marginBottom: '8px',
      },
      '& > p': {
        margin: 0,
        fontSize: theme.font.fixed.f18.fontSize,
        color: theme.colors.base,
      },
    } as Styles);

const cardStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flexGrow: 1,
  flexBasis: mobileScreen ? '100%' : '45%',
});
export default PreviousRatingsTiles;
