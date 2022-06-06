import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import GeneralDocument from '../General';
import { colors, theme } from '@pma/dex-wrapper';

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
    <GeneralDocument>
      <View style={styles.section}>
        {items.map((feedback, idx) => (
          <View key={feedback.uuid} style={[styles.wrapper, moreThanOne ? styles.border : {}]}>
            {moreThanOne && (
              <View style={styles.meta}>
                <Text style={styles.title}>Feedback #{idx + 1}</Text>
              </View>
            )}
            <View style={styles.header}>
              <View style={styles.leftContent}>
                <Text style={styles.username}>
                  {feedback.firstName} {feedback.lastName}
                </Text>
                <Text style={styles.department}>
                  {feedback?.jobName}, {feedback?.departmentName}
                </Text>
              </View>
              <View style={styles.rightContent}>
                <View>
                  <Text style={styles.updatedTime}>{feedback.updatedTime}</Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              {feedback.feedbackItems.map((val) => (
                <View key={val.code} style={styles.questions}>
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
  section: {
    padding: 10,
    marginBottom: 30,
  },
  wrapper: {
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  meta: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 22,
  },
  header: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 40,
  },
  title: {
    fontSize: 18,
  },
  leftContent: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: '#00539f',
    fontSize: 18,
  },
  department: {
    fontSize: 16,
    marginTop: 20,
  },
  updatedTime: {
    fontSize: 16,
  },
  body: {
    marginTop: 10,
  },
  questions: {
    marginTop: 20,
    paddingLeft: 20,
  },
  question: {
    fontSize: 14,
    fontWeight: 900,
    color: theme.colors.active,
    maxHeight: 100,
  },
  answer: {
    fontSize: 14,
    marginTop: 20,
  },
});

export default FeedbackDocument;
