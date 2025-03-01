import app from './app';
import { connectDB } from './lib/db';
import env from './lib/env';

const PORT = env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  connectDB();
});
