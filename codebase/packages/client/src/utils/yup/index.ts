import * as Yup from 'yup';

import { VALIDATION_RULE, VALIDATION_RULE_MODELER } from './types';

export const createYupSchema = (schema: Yup.AnyObjectSchema, config: any) => {
  const { key, validationType = 'string', validate = {} } = config;
  let validator = Yup[validationType]();

  if (validate[VALIDATION_RULE_MODELER.REQUIRED] && validate[VALIDATION_RULE_MODELER.REQUIRED]) {
    validator = validator[VALIDATION_RULE.REQUIRED](validate[VALIDATION_RULE_MODELER.REQUIRED]);
  }
  if (validate[VALIDATION_RULE_MODELER.MIN_LENGTH]) {
    validator = validator[VALIDATION_RULE.MIN_LENGTH](validate[VALIDATION_RULE_MODELER.MIN_LENGTH]);
  }
  if (validate[VALIDATION_RULE_MODELER.MAX_LENGTH]) {
    validator = validator[VALIDATION_RULE.MAX_LENGTH](validate[VALIDATION_RULE_MODELER.MAX_LENGTH]);
  }

  schema[key] = validator;
  return schema;
};
