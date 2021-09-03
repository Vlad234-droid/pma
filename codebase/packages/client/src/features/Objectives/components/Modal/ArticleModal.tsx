import React, { FC, HTMLProps } from 'react';
import { useStyle, useBreakpoints } from 'styles';
import { Icon as IconComponent } from 'components/Icon';

export type ArticleModal = {};

type Props = HTMLProps<HTMLInputElement> & ArticleModal;

const ArticleModal: FC<Props> = () => {
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
        <span
          className={css({
            position: 'fixed',
            top: '22px',
            left: mobileScreen ? '20px' : '40px',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
        >
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <div>
          <div
            className={css({
              fontSize: '24px',
              lineHeight: '28px',
              fontWeight: 'bold',
              paddingBottom: '32px',
            })}
          >
            Need help with writing your objectives?
          </div>
          <div
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
            })}
          >
            Below we have listed some resources to help you write objectives that are meaningful and relevant to your
            role.
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
          What to write in your objectives
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua view.
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
          How to write your objectives
        </div>
        <div
          className={css({
            fontSize: '16px',
            lineHeight: '20px',
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua view.
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

export default ArticleModal;
