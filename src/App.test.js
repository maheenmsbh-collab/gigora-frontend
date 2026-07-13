import { render, screen } from '@testing-library/react';

// Mock AuthContext to avoid real async auth calls during tests
jest.mock('./contexts/AuthContext', () => ({
  __esModule: true,
  AuthProvider: ({ children }) => children,
  useAuth: () => ({ user: null, loading: false }),
}));

import App from './App';

test('renders login page', async () => {
  render(<App />);
  const heading = await screen.findByText(/Login to Gigora/i);
  expect(heading).toBeInTheDocument();
});
