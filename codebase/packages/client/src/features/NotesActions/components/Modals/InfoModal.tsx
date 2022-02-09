import React, { FC } from 'react';
import { IconButton } from 'components/IconButton';
import { Rule, useBreakpoints, useStyle } from '@dex-ddl/core';

type Props = {
  closeInfoModal: () => void;
  TEAM: boolean;
};

export const MODAL_WRAPPER = 'modal_wrapper';

const InfoModal: FC<Props> = ({ closeInfoModal, TEAM }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(wrapperInfo)} data-test-id={MODAL_WRAPPER}>
      {!TEAM ? (
        <p className={css(preTitle)}>
          My Notes can be used to create and store notes about Your Contribution throughout the year. Use this space to
          record achievements, thoughts on objectives or subjects to raise with your line manager during your 1:1s.
          Although these notes are private, in limited circumstances, they may need to be shared with others (for
          example as part of an investigation or Data Protection request) so they should be kept professional.
        </p>
      ) : (
        <p className={css(preTitle)}>
          My Notes can be used to create and store notes about Your Contribution and that of your direct reports
          throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with
          your line manager or direct reports during your 1:1s. Team notes can be used to help keep track of your direct
          reports work, achievements or conversations to refer back to at a later date. Although these notes are
          private, in limited circumstances, they may need to be shared with others (for example as part of an
          investigation or Data Protection request) so they should be kept professional.
        </p>
      )}
      <span
        className={css({
          position: 'fixed',
          top: theme.spacing.s5,
          left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
        })}
      >
        <IconButton graphic='arrowLeft' onPress={closeInfoModal} iconProps={{ invertColors: true }} />
      </span>
    </div>
  );
};

const wrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const preTitle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

export default InfoModal;
