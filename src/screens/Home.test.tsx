import React from 'react';
import {render} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import Home from './Home';
import {GET_CHARACTERS} from '../apollo/query';

const mocks: any = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {page: 6, filter: {name: 'u'}},
    },
    results: {
      data: {
        characters: {
          result: [
            {
              id: '123',
              name: 'Mark',
              status: 'Alive',
              gender: 'Male',
              origin: {id: '11', name: 'Earth'},
              created: 'string',
              type: 'Pluto',
            },
          ],
        },
      },
    },
  },
];

describe('Home', () => {
  it('renders Home correctly', () => {
    const {toJSON, getByTestId} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('loader')).toBeTruthy();
  });
});
