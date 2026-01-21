import Reactotron, { networking, openInEditor, asyncStorage } from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

const reactotron = Reactotron
  .configure({
    name: 'Snips',
    host: 'localhost',
    port: 9090,
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
    editor: false,
    errors: true,
    overlay: true,
  })
  .use(networking())
  .use(openInEditor())
  .use(asyncStorage({}))
  .use(apisaucePlugin({
    ignoreContentTypes: /^(image)\/.*$/i,
  }))
  .connect();

console.tron = reactotron;

reactotron.clear();

export default reactotron;