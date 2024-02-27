import { render, screen } from '@testing-library/react';
import App from './App';
import { SearchBar } from '../src/componentes/searchbar/Searchbar'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<SearchBar />);

  
  const inputElement = screen.getByPlaceholderText('Search...');
  expect(inputElement).toBeInTheDocument();
});

test('updates search input value', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText('Search...');
  fireEvent.change(inputElement, { target: { value: 'Pikachu' } }); 
  expect(inputElement.value).toBe('Pikachu');
});
