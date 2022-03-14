import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import removeMD from 'remove-markdown';

import GeneralDocument from '../General';

type Explanation = {
  title: string;
  description?: string;
};

type Objective = {
  id: number;
  title: string;
  description: string;
  subTitle: string;
  explanations: Explanation[];
};

type Props = {
  items: Objective[];
};

const ObjectiveDocument: FC<Props> = ({ items }) => {
  const moreThanOne = items.length > 1;
  return (
    <GeneralDocument>
      <View style={styles.section}>
        {items.map(({ id, title, subTitle, description, explanations }) => (
          <View key={id} style={[styles.wrapper, moreThanOne ? styles.border : {}]} wrap={false}>
            <View style={styles.header}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.subTitleWrapper}>
                <Text style={styles.subTitle}>{subTitle}</Text>
              </View>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.body}>
              {explanations.map(({ description, title }, idx) => (
                <View key={idx} style={styles.explanations}>
                  <Text style={styles.explanationTitle}>{removeMD(title)}</Text>
                  <Text style={styles.step}>{description}</Text>
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
  },
  wrapper: {
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 2,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 50,
    paddingBottom: 100,
  },
  titleWrapper: {
    marginBottom: 10,
  },
  title: {
    color: '#00539f',
    lineHeight: 22,
    fontSize: 18,
  },
  subTitleWrapper: {
    marginBottom: 10,
    maxHeight: 500,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    maxHeight: 500,
  },
  description: {
    fontSize: 14,
    color: '#808080',
    marginTop: 20,
    maxHeight: 800,
  },
  body: {
    maxHeight: 1500,
  },
  longBody: {
    marginTop: 100,
  },
  explanations: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 900,
    marginTop: 20,
  },
  step: {
    fontSize: 14,
  },
});

export default ObjectiveDocument;
