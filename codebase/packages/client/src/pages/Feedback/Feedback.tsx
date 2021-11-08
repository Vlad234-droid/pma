import React, { FC, useEffect, useRef } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { Header } from '../../components/Header';
import { FeedbackActions } from '../../features/Feedback';
import { useDispatch } from 'react-redux';
import { TestActions } from '../../../../store';
//
import Html2Canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const FEED_BACK_PAGE = 'feed_back_page';

const FeedBack: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TestActions.addTest({ id: 'id', title: 'title', description: 'description' }));
  }, []);

  const screenHTMLElementToPDF = ({ input, callback, paddingX = 100, paddingY = 100 }) => {
    Html2Canvas(input).then((canvas) => {
      const { clientWidth, clientHeight } = input;
      console.log('input', input);

      const imgData = canvas.toDataURL('pdf');
      const orientation = clientWidth > clientHeight ? 'landscape ' : 'portrait ';
      const k = window.devicePixelRatio;
      //@ts-ignore
      const pdf = new jsPDF({
        format: [(clientWidth + paddingX * 2) * k, (clientHeight + paddingY * 2) * k],
        unit: 'px',
        hotfixes: ['px_scaling'],
        orientation,
      });
      pdf.addImage(imgData, 'jpeg ', paddingX * k, paddingY * k, clientWidth * k, clientHeight * k);
      const fileName = 'report';
      //pdf.save(`${fileName}_${new Date().toISOString()}.${'pdf'}`);
      callback();
    });
  };

  function useMyCustomHook<T extends HTMLElement>() {
    const myRef = useRef<T>(null);
    return { ref: myRef };
  }

  const { ref: myElementRef } = useMyCustomHook<HTMLDivElement>();

  const finish = () => {
    console.log('finish');
  };

  const handleClick = () => {
    screenHTMLElementToPDF({
      input: myElementRef.current,
      callback: finish,
    });
  };

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={FEED_BACK_PAGE}>
      {/* <div ref={myElementRef}>hello</div><button onClick={() => handleClick()}>Button</button> */}
      <Header title='Feedback' styles={titleStyle} customSize={true} />

      <FeedbackActions />
    </div>
  );
};

const titleStyle: Rule = {
  fontSize: '24px',
};

export default FeedBack;
