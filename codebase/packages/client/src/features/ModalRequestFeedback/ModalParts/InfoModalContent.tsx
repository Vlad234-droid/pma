import React, { FC, Dispatch, SetStateAction } from 'react';
import { useStyle, Rule, Styles, useBreakpoints } from '@dex-ddl/core';
import requestInfoModal from '../../../../public/requestInfoModal.png';
import { IconButton } from 'components/IconButton';

type InfoModalProps = {
  setInfoModal: Dispatch<SetStateAction<boolean>>;
};

const InfoModalContent: FC<InfoModalProps> = ({ setInfoModal }) => {
  const { css } = useStyle();
  return (
    <div className={css(WrapperInfo)}>
      <p className={css(PreTitle)}>
        When you request feedback from you colleagues, follow these steps to guide your colleague to give you great
        feedback. <br />
      </p>
      <ol className={css(orderedList)}>
        <li>
          Make your good intentions clear. This builds trust and lets the receiver know that your words come from a
          positive place. This means they&apos;ll be more likely to listen and reflect on what you&apos;ve shared. An
          example of this would be starting your feedback with something like &quot;I&apos;m sharing this feedback with
          you so we can work better together&quot;.
        </li>
        <li>
          Describe the situation. It&apos;s important to be specific about the time, place, and situation you want to
          give feedback on. Being specific helps provide context for the receiver and ensures your feedback is clear. An
          example of this could be &quot;on Monday when we were working on the customer service desk&quot; or &quot;in
          last week&apos;s team meeting&quot;.
          <li>
            Give great examples. Describe what you observed, assumptions aren&apos;t helpful. For example, &quot;I
            noticed you&apos;ve been late twice this week&quot; is more helpful than &quot;you&apos;re never on
            time&quot;.
          </li>
          <li>
            Explain the impact. Sharing the impact your examples had gives the receiver an opportunity to reflect and
            think about specific actions they could take going forward. An example of impact &quot;this meant the
            customer received great service&quot; or &quot; this meant the rest of the team stayed late&quot;.
          </li>
        </li>
      </ol>
      <div className={css({ marginTop: '22px' })}>
        <img
          className={css({ width: '100%', height: '100%', objectFit: 'contain' })}
          src={requestInfoModal}
          alt='Learn more about how to request great feedback'
        />
      </div>
      <span className={css(iconStyle)}>
        <IconButton graphic='arrowLeft' onPress={() => setInfoModal(() => false)} iconProps={{ invertColors: true }} />
      </span>
    </div>
  );
};
const WrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const iconStyle: Rule = (theme) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const PreTitle: Rule = {
  margin: '0px 0px 0px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

const orderedList: Rule = {
  paddingLeft: '24px',
  '& li': {
    marginTop: '8px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  },
} as Styles;

export default InfoModalContent;
