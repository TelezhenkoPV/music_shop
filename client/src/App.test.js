import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Final project text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Final project/i);
  expect(linkElement).toBeInTheDocument();
});
