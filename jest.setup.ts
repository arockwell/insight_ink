import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder in Node.js environment for tests
// These are needed by MSW
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock next/navigation to avoid errors
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => '',
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    forEach: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    toString: jest.fn(),
  }),
}));

// Mock for environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
};

// Global timeout config
jest.setTimeout(30000);