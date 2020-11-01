import { config } from 'dotenv';

config();
export class Env {
  public static PORT = Number(process.env.PORT);

  public static TOKEN = process.env.TOKEN;
}
