import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV === 'development ';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!envFilePath) {
        // tslint:disable-next-line:no-console
        console.log('.env does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
