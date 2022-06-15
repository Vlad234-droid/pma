import React, { FC, ComponentProps } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { TescoLogo } from '../../assets/img';
import { theme } from '@pma/dex-wrapper';

type Props = {
  documentProps?: ComponentProps<typeof Document>;
  pageProps?: ComponentProps<typeof Page>;
  title?: string;
  jobTitle?: string;
};

const GeneralDocument: FC<Props> = ({ documentProps = {}, pageProps = { size: 'A4' }, title, jobTitle, children }) => (
  <Document {...documentProps}>
    <Page {...pageProps} style={styles.page} wrap={true}>
      <View render={({ pageNumber }) => pageNumber > 1 && <Text style={styles.separator} />} fixed />
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} src={TescoLogo} />
      </View>
      <View>
        <Text style={[jobTitle ? styles.noBorderTitle : styles.title]}>
          {title}
          <span style={styles.dot}>.</span>
        </Text>
        {jobTitle && <Text style={styles.jobDescription}>{jobTitle}</Text>}
      </View>
      <View style={styles.section}>{children}</View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  separator: {
    display: 'flex',
    width: '100%',
    borderBottom: `1px solid ${theme.colors.tescoBlue}`,
    color: 'red',
  },
  dot: {
    color: 'red',
  },
  noBorderTitle: {
    fontSize: theme.font.fixed.f32.fontSize,
    color: theme.colors.tescoBlue,
    maxWidth: '70%',
    padding: '10px 0 10px',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: theme.font.fixed.f32.fontSize,
    color: theme.colors.tescoBlue,
    maxWidth: '70%',
    padding: '20px 0 10px',
    borderBottom: `1px solid ${theme.colors.tescoBlue}`,
    fontWeight: theme.font.weight.bold,
  },
  jobDescription: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f20.fontSize,
    color: theme.colors.tescoBlue,
    maxWidth: '70%',
    padding: '20px 0 10px',
    borderBottom: `1px solid ${theme.colors.tescoBlue}`,
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logo: {
    width: '120px',
    textAlign: 'right',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingBottom: 80,
    paddingTop: 45,
    paddingHorizontal: 35,
    position: 'relative',
  },
  section: {
    marginBottom: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    fontSize: 10,
    right: 30,
    color: '#333333',
  },
});

export default GeneralDocument;
