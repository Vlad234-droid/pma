import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import GeneralDocument from '../General';

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
  return (
    <GeneralDocument>
      <View style={styles.section}>
        {items.map((value, idx) => (
          <View key={value.uuid} style={[styles.wrapper, moreThanOne ? styles.border : {}]}>
            {moreThanOne && (
              <View style={styles.meta}>
                <Text style={styles.title}>Goal #{idx + 1}</Text>
              </View>
            )}

            <View style={styles.body}>
              {value.items.map((val, idx) => (
                <View key={idx} style={styles.block}>
                  <Text style={styles.subtitle}>{formItems[idx].label}:</Text>
                  <Text style={styles.description}>{val}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </GeneralDocument>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 10,
    paddingBottom: 25,
  },
  wrapper: {
    marginBottom: 20,
  },
  border: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  meta: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 22,
  },
  title: {
    fontSize: 18,
  },
  body: {
    marginTop: 10,
  },
  block: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#808080',
  },
});

export default PDPDocument;
