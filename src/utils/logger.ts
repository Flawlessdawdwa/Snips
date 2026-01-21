interface Logger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  display: (value: any, name?: string) => void;
}

const logger: Logger = {
  log: (...args: any[]) => {
    if (__DEV__) {
      console.log(...args);
      if (console.tron) {
        console.tron.log(...args);
      }
    }
  },
  warn: (...args: any[]) => {
    if (__DEV__) {
      console.warn(...args);
      if (console.tron) {
        console.tron.warn(...args);
      }
    }
  },
  error: (...args: any[]) => {
    if (__DEV__) {
      console.error(...args);
      if (console.tron) {
        console.tron.error(...args);
      }
    }
  },
  display: (value: any, name?: string) => {
    if (__DEV__ && console.tron) {
      console.tron.display({
        name: name || 'VALUE',
        value,
        preview: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value),
      });
    }
  },
};

export default logger;