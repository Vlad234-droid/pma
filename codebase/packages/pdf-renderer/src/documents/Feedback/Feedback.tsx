import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import GeneralDocument from '../General';
import { theme } from '@pma/dex-wrapper';

type QuestionItem = {
  code: string;
  content: string;
  feedbackUuid: string;
  question: string;
  uuid: string;
};

type Feedback = {
  uuid: string;
  firstName: string;
  lastName: string;
  jobName: string;
  departmentName: string;
  updatedTime: string;
  feedbackItems: QuestionItem[];
};

type Props = {
  items: Feedback[];
};

const FeedbackDocument: FC<Props> = ({ items }) => {
  const moreThanOne = items.length > 1;
  return (
    <GeneralDocument
      title={`Feedback from ${items[0]?.firstName} ${items[0]?.lastName}`}
      jobTitle={`${items[0]?.jobName}, ${items[0]?.departmentName}`}
    >
      <View style={styles.section}>
        {items.map((feedback, idx) => (
          <View key={feedback.uuid}>
            {moreThanOne && (
              <View>
                <Text style={styles.subtitle}>Feedback {idx + 1}</Text>
              </View>
            )}
            <View>
              <View>
                <Text style={styles.updatePeriod}>{feedback.updatedTime}</Text>
              </View>
            </View>
            <View>
              {feedback.feedbackItems.map((val) => (
                <View key={val.code}>
                  <Text style={styles.question}>{val.question}</Text>
                  <Text style={styles.answer}>{val.content}</Text>
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
  updatePeriod: {
    fontSize: theme.font.fixed.f14.fontSize,
    color: theme.colors.black,
    fontWeight: theme.font.weight.bold,
    padding: '10px 0',
  },
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
    fontStyle: 'normal',
  },
  subtitleWrapper: {
    paddingBottom: 10,
    boxSizing: 'border-box',
  },
  subtitle: {
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
    flexDirection: 'column',
  },
  wrapper: {
    marginBottom: 20,
  },
});

export default FeedbackDocument;
