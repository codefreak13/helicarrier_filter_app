import {gql} from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        status
        type
        gender
        origin {
          id
          name
        }
        created
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  status: string;
  gender: string;
  origin: {name: string};
  created: string;
  type: string;
}

interface FilterCharacter {
  name?: string;
  status?: string;
  type?: string;
  gender?: string;
}

export interface CharacterVars {
  filter?: FilterCharacter;
  page?: number;
}

export interface CharacterData {
  characters: {
    results: Character[];
  };
}
