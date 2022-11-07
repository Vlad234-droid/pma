import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import removeMD from 'remove-markdown';

import GeneralDocument from '../General';
import { theme } from '@pma/dex-wrapper';

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
  return (
    <GeneralDocument title={'Objectives'}>
      <View>
        {items.map(({ id, title, subTitle, description, explanations }) => (
          <View key={id}>
            <View>
              <View style={styles.subtitleWrapper}>
                <Text style={styles.subtitle}>{title}</Text>
              </View>
              <View>
                <Text style={styles.question}>{subTitle.trim()}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.answer}>{description.trim()}</Text>
              {explanations.map(({ description, title }, idx) => (
                <View key={idx}>
                  <Text style={styles.question}>{removeMD(title)}</Text>
                  <Text style={styles.answer}>{description?.trim()}</Text>
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

export default ObjectiveDocument;
