import { Transform, TransformFnParams } from 'class-transformer';

const toBoolean = (value: unknown) => {
  if (value === undefined || value === null) return 'Failure';
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

export const ToBoolean = () =>
  Transform((value: TransformFnParams) => toBoolean(value));
