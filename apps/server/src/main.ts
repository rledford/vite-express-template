import { initApp } from './app';

const main = async () => {
  const app = await initApp();

  await app.start();
};

main();
