import { of, concat, Observable } from 'rxjs';
import { addToastFabric, ToastFabricPayload } from '../entities/toast/actions';

type ErrorPayload = {
  code: string;
  message: string;
};

const concatWithErrorToast = <T>(action: Observable<T>, payload: ToastFabricPayload) => {
  //console.log('payload', payload);
  return concat(action, of(addToastFabric(payload).error));
};

const errorPayloadConverter = ({
  code,
  message,
  ...rest
}: ErrorPayload & Partial<ToastFabricPayload>): ToastFabricPayload => {
  return {
    id: code,
    autoClose: false,
    description: message,
    ...rest,
  };
};

export { concatWithErrorToast, errorPayloadConverter };
