import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import GeneralDocument from '../General';
import { theme } from '@pma/dex-wrapper';

type PDPGoal = {
  uuid: string;
  number: number;
  items: any[];
};

type Props = {
  items: PDPGoal[];
  formItems: any[];
};

const PDPDocument: FC<Props> = ({ formItems, items }) => {
  const moreThanOne = items && items?.length > 1;

  // console.log(formItems, items);

  return (
    <GeneralDocument title={'Personal Development plan'}>
      <View style={styles.section}>
        <View style={styles.main}>
          {items.map((value, idx) => (
            <View key={value.uuid}>
              {moreThanOne && (
                <View style={styles.subtitleWrapper}>
                  <Text style={styles.subtitle}>Goal {idx + 1}</Text>
                </View>
              )}

              <View>
                {value.items.map((val, idx) => (
                  <View key={idx}>
                    <Text style={styles.question}>
                      <b>{formItems[idx].label}</b>
                    </Text>
                    <Text style={styles.answer}>{val}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </GeneralDocument>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: theme.font.fixed.f14.fontSize,
    color: theme.colors.black,
    fontFamily: 'Helvetica-Bold',
    fontWeight: theme.font.weight.bold,
    padding: '10px 0',
  },
  answer: {
    fontSize: theme.font.fixed.f12.fontSize,
    color: theme.colors.black,
    fontFamily: 'Helvetica',
    fontWeight: theme.font.weight.light,
    fontStyle: 'regular',
  },
  subtitleWrapper: {
    paddingBottom: 10,
    boxSizing: 'border-box',
  },
  subtitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: theme.font.fixed.f16.fontSize,
    color: theme.colors.tescoBlue,
    fontWeight: theme.font.weight.bold,
    padding: '30px 0 0',
  },
  main: {
    width: '80%',
    boxSizing: 'border-box',
  },
  section: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrapper: {
    marginBottom: 20,
  },
});

export default PDPDocument;
