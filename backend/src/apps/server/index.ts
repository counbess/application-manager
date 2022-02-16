import { InMemoryFactory } from '~/core/adapters/factory/InMemoryFactory';
import { Server } from './server';

const factory = new InMemoryFactory();
const server = new Server(factory, 3000);

async function main() {
  await server.boot();

  server.start();
}

main();
