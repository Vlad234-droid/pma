import React, { FC, ComponentProps } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

type Props = { loadingText?: string; linkText?: string } & ComponentProps<typeof PDFDownloadLink>;

const DownloadLink: FC<Props> = ({ loadingText = 'Loading...', linkText = 'Download', ...downloadLinkProps }) => (
  <PDFDownloadLink {...downloadLinkProps}>{({ loading }) => (loading ? loadingText : linkText)}</PDFDownloadLink>
);

export default DownloadLink;
