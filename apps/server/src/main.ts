import { initApp } from './app';
import { configModule } from './modules/config';

const main = async () => {
  const config = configModule().get();
  const app = await initApp({ config });

  await app.start();
};

main();
