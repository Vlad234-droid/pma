import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';

import { Accordion, BaseAccordion, Section } from 'components/Accordion';
import { TileWrapper } from 'components/Tile';
import { buildPath } from 'features/Routes';
import { Trans } from 'components/Translation';

import defaultImg from 'images/default.png';
import { ColleagueProfileProps as Props } from '../../config/type';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export const TILE_WRAPPER = 'tile-wrapper';
export const NAME = 'name';

const ColleagueProfile: FC<Props> = ({ colleague }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const viewProfile = (uuid: string): void => {
    navigate(buildPath(paramsReplacer(`${Page.USER_OBJECTIVES}`, { ':uuid': uuid })));
  };
  return (
    <TileWrapper customStyle={wrapperStyles}>
      <Accordion
        id={`colleague-accordion-${colleague.uuid}`}
        customStyle={{
          borderBottom: 'none',
          marginTop: 0,
        }}
      >
        <BaseAccordion id={`colleague-base-accordion-${colleague.uuid}`}>
          {() => (
            <Section>
              <div className={css(sectionStyle)}>
                <div className={css(blockInfo)}>
                  <div className={css({ alignSelf: 'flex-start' })}>
                    <img className={css(imgStyle)} src={defaultImg} alt='photo' />
                  </div>
                  <div className={css({ marginLeft: '16px' })}>
                    <h3
                      className={css(namesStyle)}
                      data-test-id={NAME}
                    >{`${colleague.firstName} ${colleague.lastName}`}</h3>
                    <p className={css(industryStyle)}>{`${colleague.jobName || ''}, ${
                      colleague.businessType || ''
                    }`}</p>
                  </div>
                </div>

                <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
                  <div className={css({ display: 'flex', alignItems: 'center', marginRight: '26px' })}>
                    <span className={css(viewStyle)} onClick={() => viewProfile(colleague.uuid)}>
                      <Trans i18nKey='view_profile'>View profile</Trans>
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          )}
        </BaseAccordion>
      </Accordion>
    </TileWrapper>
  );
};

const industryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const viewStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  color: `${theme.colors.link}`,
  marginRight: '24px',
  cursor: 'pointer',
  padding: '2px',
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
};

export default ColleagueProfile;
