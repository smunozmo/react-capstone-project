import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../configureStore';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/home';

describe('React Capstone Project', () => {
  test('Renders title in Home page:', () => {
    render(<Provider store={store}><BrowserRouter><Home /></BrowserRouter></Provider>);
    expect(screen.getByText('Rick and Morty Characters App')).toBeInTheDocument();
  });

  test('Home snapshot test', () => {
    const myrender = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(myrender).toMatchSnapshot();
  });
});