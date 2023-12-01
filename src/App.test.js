import { render, screen } from '@testing-library/react';
import './App.css';

test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/learn react/i);
  expect(headerElement).toBeInTheDocument();
});
