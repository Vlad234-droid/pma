import { FC, HTMLProps } from 'react';
import { SubmitHandler } from 'react-hook-form';

// type for testing purpose
type TestProps = {
  testID?: string;
};

type FormField<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element: FC<any>;
  Wrapper?: FC<any>;
  name: T;
  value?: any;
  labels?: Array<string>;
  options?: Array<Record<string, number | string | boolean>>;
} & TestProps &
  HTMLProps<HTMLInputElement | HTMLSelectElement>;

interface RowField<T> {
  Element?;
  data: Array<FormField<T>>;
}

type Elementable = {
  Element?: unknown;
};

type Handler<T> = SubmitHandler<T>;

function isRowField<T>(obj: Elementable): obj is RowField<T> {
  return obj.Element == undefined;
}

function isFormField<T>(obj: Elementable): obj is FormField<T> {
  return obj.Element !== undefined;
}

export type { FormField, RowField, Elementable, Handler };

export { isRowField, isFormField };
