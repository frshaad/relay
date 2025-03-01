import { validateEnvironment } from './env';

try {
  validateEnvironment();
  console.log('✅ Environment variables are valid');
  process.exit(0);
} catch (error) {
  console.error('❌ Environment validation failed', error);
  process.exit(1);
}
