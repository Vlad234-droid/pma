enum Variant {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}

type ToastPayload = {
  id: string;
  variant: Variant;
  title: string;
  description: string;
  timeout?: number;
};

export { Variant };

export type { ToastPayload };
