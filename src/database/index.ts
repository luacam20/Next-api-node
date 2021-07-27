import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

createConnection();
