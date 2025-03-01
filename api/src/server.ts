import app from './app';
import { connectDB } from './lib/db';
import { env } from './lib/env';
import { log } from './lib/logger';

app.listen(env.PORT, async () => {
  try {
    await connectDB();
  } catch (error) {
    log.error(`Couldn't connect to server: ${error}`);
  }
});
