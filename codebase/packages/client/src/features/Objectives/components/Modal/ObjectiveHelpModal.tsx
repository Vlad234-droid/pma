import React, { FC, HTMLProps } from 'react';
import { useStyle, useBreakpoints } from '@dex-ddl/core';
import { Trans } from 'components/Translation';

export type ObjectiveHelpModal = {};

type Props = HTMLProps<HTMLInputElement> & ObjectiveHelpModal;

const ObjectiveHelpModal: FC<Props> = () => {
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
            <Trans i18nKey={'need_help_with_objectives'}>Need help with writing your objectives?</Trans>
          </div>
          <div
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
            })}
          >
            <Trans i18nKey={'need_help_with_objectives_description'}>
              Here are some resources to help you write relevant and meaningful objectives.
            </Trans>
          </div>
        </div>

        <div
          className={css({
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: 'bold',
            paddingTop: '32px',
            paddingBottom: '16px',
          })}
        >
          <Trans i18nKey={'learn'}>Learn</Trans>
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
          })}
        >
          <Trans i18nKey={'learn_objectives'}>
            This self-led eLearning will help you set objectives that are aligned, ambitious and assessable. Visit Click
            and Learn HERE or Learning at Tesco HERE (15 mins)
          </Trans>
        </div>
        <div
          className={css({
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: 'bold',
            paddingTop: '32px',
            paddingBottom: '16px',
          })}
        >
          <Trans i18nKey={'read'}>Read</Trans>
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
          })}
        >
          <Trans i18nKey={'read_description'}>
            Explore how the 3 A s model can help you write great strategic objectives with real examples to bring it to
            life.
          </Trans>
        </div>

        <div
          className={css({
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: 'bold',
            paddingTop: '32px',
            paddingBottom: '16px',
          })}
        >
          <Trans i18nKey={'watch'}>Watch</Trans>
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
          })}
        >
          <Trans i18nKey={'watch_description'}>
            Understand the 3 A s model and how this approach can help you write strong objectives (3 mins).
          </Trans>
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

export default ObjectiveHelpModal;
