import { bootstrap, start } from './app';

const main = async () => {
  await bootstrap();
  start();
};

main();
