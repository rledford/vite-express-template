import { initApp } from './app';
import { platformConfig } from './platform/config';

const main = async () => {
  const config = platformConfig();
  const app = await initApp({
    config: {
      app: config.forApp(),
      db: config.forDatabase()
    }
  });

  await app.start();
};

main();
