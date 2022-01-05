import React, { FC, ComponentProps } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

type Props = {} & ComponentProps<typeof PDFViewer>;

const DocumentPreview: FC<Props> = ({ children, ...viewProps }) => <PDFViewer {...viewProps}>{children}</PDFViewer>;

export default DocumentPreview;
