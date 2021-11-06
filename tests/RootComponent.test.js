import { render, screen } from '@testing-library/react';
import RootComponent from '../src/RootComponent';

test('renders title', () => {
  render(<RootComponent />);
  const linkElement = screen.getByText(/GitToKnowEachOther/i);
  expect(linkElement).toBeInTheDocument();
});
