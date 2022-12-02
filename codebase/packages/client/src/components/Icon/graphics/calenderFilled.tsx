import React from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { invertColor } from '../utils';

import { FCGraphicProps } from './types';

export const CalenderFilled: FCGraphicProps = ({ invertColors }) => {
  const { theme } = useStyle();

  const color = invertColor(theme.colors.link, invertColors, theme);

  return (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.72515 13.1043V11.4307C3.72515 11.1804 3.92638 10.9791 4.17669 10.9791H5.85031C6.10061 10.9791 6.30184 11.1804 6.30184 11.4307V13.1043C6.30184 13.3546 6.10061 13.5558 5.85031 13.5558H4.17669C3.92638 13.5509 3.72515 13.3497 3.72515 13.1043ZM7.67607 13.5509H9.34969C9.6 13.5509 9.80123 13.3497 9.80123 13.0994V11.4258C9.80123 11.1755 9.6 10.9742 9.34969 10.9742H7.67607C7.42577 10.9742 7.22454 11.1755 7.22454 11.4258V13.0994C7.22945 13.3497 7.43068 13.5509 7.67607 13.5509ZM11.1755 13.5509H12.8491C13.0994 13.5509 13.3006 13.3497 13.3006 13.0994V11.4258C13.3006 11.1755 13.0994 10.9742 12.8491 10.9742H11.1755C10.9252 10.9742 10.7239 11.1755 10.7239 11.4258V13.0994C10.7288 13.3497 10.9301 13.5509 11.1755 13.5509ZM7.67607 16.962H9.34969C9.6 16.962 9.80123 16.7607 9.80123 16.5104V14.8368C9.80123 14.5865 9.6 14.3853 9.34969 14.3853H7.67607C7.42577 14.3853 7.22454 14.5865 7.22454 14.8368V16.5104C7.22945 16.7607 7.43068 16.962 7.67607 16.962ZM11.1755 16.962H12.8491C13.0994 16.962 13.3006 16.7607 13.3006 16.5104V14.8368C13.3006 14.5865 13.0994 14.3853 12.8491 14.3853H11.1755C10.9252 14.3853 10.7239 14.5865 10.7239 14.8368V16.5104C10.7288 16.7607 10.9301 16.962 11.1755 16.962ZM14.6798 16.962H16.3534C16.6037 16.962 16.8049 16.7607 16.8049 16.5104V14.8368C16.8049 14.5865 16.6037 14.3853 16.3534 14.3853H14.6798C14.4294 14.3853 14.2282 14.5865 14.2282 14.8368V16.5104C14.2282 16.7607 14.4294 16.962 14.6798 16.962ZM4.17669 16.962H5.85031C6.10061 16.962 6.30184 16.7607 6.30184 16.5104V14.8368C6.30184 14.5865 6.10061 14.3853 5.85031 14.3853H4.17669C3.92638 14.3853 3.72515 14.5865 3.72515 14.8368V16.5104C3.72515 16.7607 3.92638 16.962 4.17669 16.962ZM11.1755 20.3681H12.8491C13.0994 20.3681 13.3006 20.1669 13.3006 19.9166V18.2429C13.3006 17.9926 13.0994 17.7914 12.8491 17.7914H11.1755C10.9252 17.7914 10.7239 17.9926 10.7239 18.2429V19.9166C10.7288 20.1669 10.9301 20.3681 11.1755 20.3681ZM7.67607 20.3681H9.34969C9.6 20.3681 9.80123 20.1669 9.80123 19.9166V18.2429C9.80123 17.9926 9.6 17.7914 9.34969 17.7914H7.67607C7.42577 17.7914 7.22454 17.9926 7.22454 18.2429V19.9166C7.22945 20.1669 7.43068 20.3681 7.67607 20.3681ZM14.6798 13.5509H16.3534C16.6037 13.5509 16.8049 13.3497 16.8049 13.0994V11.4258C16.8049 11.1755 16.6037 10.9742 16.3534 10.9742H14.6798C14.4294 10.9742 14.2282 11.1755 14.2282 11.4258V13.0994C14.2282 13.3497 14.4294 13.5509 14.6798 13.5509ZM18.1791 16.962H19.8528C20.1031 16.962 20.3043 16.7607 20.3043 16.5104V14.8368C20.3043 14.5865 20.1031 14.3853 19.8528 14.3853H18.1791C17.9288 14.3853 17.7276 14.5865 17.7276 14.8368V16.5104C17.7325 16.7607 17.9337 16.962 18.1791 16.962ZM14.6798 20.3681H16.3534C16.6037 20.3681 16.8049 20.1669 16.8049 19.9166V18.2429C16.8049 17.9926 16.6037 17.7914 16.3534 17.7914H14.6798C14.4294 17.7914 14.2282 17.9926 14.2282 18.2429V19.9166C14.2282 20.1669 14.4294 20.3681 14.6798 20.3681ZM0 21.3742V5.21227C0 3.76442 1.17791 2.5865 2.62577 2.5865H5.57055V0.957055C5.57055 0.426994 5.99755 0 6.52761 0H8.02454C8.5546 0 8.9816 0.426994 8.9816 0.957055V2.5816H15.0184V0.957055C15.0184 0.426994 15.4454 0 15.9755 0H17.4724C18.0025 0 18.4294 0.426994 18.4294 0.957055V2.5816H21.3742C22.8221 2.5816 24 3.75951 24 5.20736V21.3742C24 22.8221 22.8221 24 21.3742 24H2.62577C1.17791 24 0 22.8221 0 21.3742ZM2.0319 21.3742C2.0319 21.7031 2.30184 21.973 2.63067 21.973H21.3742C21.7031 21.973 21.973 21.7031 21.973 21.3742V9.40368H2.0319V21.3742Z'
      fill={color}
    />
  );
};
