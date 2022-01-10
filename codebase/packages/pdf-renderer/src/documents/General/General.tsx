import React, { FC, ComponentProps } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type Props = {
  documentProps?: ComponentProps<typeof Document>;
  pageProps?: ComponentProps<typeof Page>;
};

const GeneralDocument: FC<Props> = ({ documentProps = {}, pageProps = { size: 'A4' }, children }) => (
  <Document {...documentProps}>
    <Page {...pageProps} style={styles.page}>
      <View style={styles.section}>{children}</View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 15,
    paddingHorizontal: 35,
    position: 'relative',
  },
  section: {
    marginBottom: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default GeneralDocument;
