import React, { FC, HTMLProps } from 'react';
import { useStyle, useBreakpoints } from '@dex-ddl/core';
import { Trans } from 'components/Translation';

export type ObjectiveHelpModal = {};

type Props = HTMLProps<HTMLInputElement> & ObjectiveHelpModal;

const MidYearHelpModal: FC<Props> = () => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <div
      className={css({
        height: '100%',
      })}
    >
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? '0 16px' : '0 40px',
        })}
      >
        <div>
          <div
            className={css({
              fontSize: '24px',
              lineHeight: '28px',
              fontWeight: 'bold',
              paddingBottom: '32px',
            })}
          >
            <Trans i18nKey={'need_help_with_comment'}>Need help with what to write in the comment boxes?</Trans>
          </div>
          <div
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
              paddingTop: '20px',
            })}
          >
            <Trans i18nKey={'need_help_with_objectives_description'}>
              Here are some examples of the types of things you could write.
            </Trans>
          </div>
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
            paddingTop: '20px',
          })}
        >
          List out some of the strengths your colleague has, what makes them a good colleague to work with?
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
            paddingTop: '20px',
          })}
        >
          Can you provide further detail on what they should keep doing or what they improve on?
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
            paddingTop: '20px',
          })}
        >
          <Trans i18nKey={'watch_video_explanation'}>Watch video explanation</Trans>
        </div>

        <div
          className={css({
            paddingTop: '32px',
          })}
        >
          <img
            className={css({
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: '10px',
            })}
            src='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
          />
        </div>
      </div>
    </div>
  );
};

export default MidYearHelpModal;
