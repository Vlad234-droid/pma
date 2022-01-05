import React, { ReactElement, ComponentProps } from 'react';
import { Response } from 'express';
import { Document, renderToStream } from '@react-pdf/renderer';

const pipePdfToResponse = async (res: Response, document: ReactElement<ComponentProps<typeof Document>>) => {
  const pdfStream = await renderToStream(document);
  res.setHeader('Content-Type', 'application/pdf');
  pdfStream.pipe(res);
  pdfStream.on('end', () => console.log('Done streaming, response sent.'));
};

export { pipePdfToResponse };
