import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

// Set up a request mocking server
export const server = setupServer(...handlers);

beforeAll(() => {
  // Start the server before all tests
  server.listen();
});

afterEach(() => {
  // Reset handlers between tests
  server.resetHandlers();
});

afterAll(() => {
  // Clean up after all tests are done
  server.close();
});