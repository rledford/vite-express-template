import { initApp } from './app';
import { configuration } from './platform/configuration';

const main = async () => {
  const config = configuration();

  const app = await initApp({ config });

  await app.start();
};

main();
