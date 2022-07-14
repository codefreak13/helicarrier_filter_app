import {useQuery} from '@apollo/client';
import {useState, useCallback, useEffect} from 'react';
import {CharacterData, CharacterVars, GET_CHARACTERS} from '../apollo/query';
import {debounce} from 'lodash';
import {ItemProps} from '../types';

const useBiodata = () => {
  const {loading, data, error} = useQuery<CharacterData, CharacterVars>(
    GET_CHARACTERS,
    {variables: {page: 6, filter: {name: 'u'}}},
  );

  //gets data path from the Apollo data
  const getDataFromApi = data?.characters?.results;
  //container for search param
  const [searchParam, setSearchParam] = useState<string>('');
  //container for data rendered on the screen
  const [renderedData, setRenderedData] = useState<ItemProps[]>([]);

  //picker values
  const [form, setForm] = useState({
    status: '',
    gender: '',
    origin: '',
    type: '',
  });

  const {status, gender, origin, type} = form;

  //function that takes in the filter options from the filter bar and filters
  const filterDataWithParams = () => {
    const selectedData = getDataFromApi
      ?.filter((item: ItemProps) => {
        return status ? status === item.status : item.name;
      })
      .filter((item: ItemProps) => {
        return gender ? gender === item.gender : item.name;
      })
      .filter((item: ItemProps) => {
        return origin ? origin == item.origin.name : item.name;
      })
      .filter((item: ItemProps) => {
        return type ? type === item.type : item.name;
      });
    return selectedData;
  };

  //memoized function that gets data from a single source and searches for pattern match
  const searchMatchingPatterns = useCallback(
    (searchText: string) => {
      const matcher = new RegExp(searchText, 'ig');
      const selectedData = filterDataWithParams()?.filter((item: ItemProps) => {
        const {name, status, gender, origin, type} = item;
        return (
          matcher.test(name) ||
          matcher.test(status) ||
          matcher.test(gender) ||
          matcher.test(origin.name) ||
          matcher.test(type)
        );
      });
      setRenderedData(selectedData ?? []);
    },
    [status, gender, origin, type, searchParam],
  );

  //delays data entry for a period and memoizes the search function
  const debouncedSave = useCallback(
    debounce((nextValue: string) => searchMatchingPatterns(nextValue), 1000),
    [searchParam],
  );

  //handles data entry to searchbar and also calls the search function
  const onChangeText = (searchParam: string) => {
    setSearchParam(searchParam);
    debouncedSave(searchParam);
  };

  //handles the data inputted to the multiple picker selects
  const onChangeFormValue = (field: string) => (value: string) => {
    setForm(prevState => ({...prevState, [field]: value}));
  };

  //clears filter options
  const clearSelection = () => {
    setForm({
      status: '',
      gender: '',
      origin: '',
      type: '',
    });
  };

  //clears the search text
  const onClearText = () => {
    setSearchParam('');
  };

  //calls the memoized function to search the data when the filter options are selected
  useEffect(() => {
    searchMatchingPatterns(searchParam);
  }, [searchMatchingPatterns]);

  //renders the data from the API when the app renders for the first time
  useEffect(() => {
    setRenderedData(getDataFromApi ?? []);
  }, [data]);

  return {
    onChangeFormValue,
    clearSelection,
    renderedData,
    onChangeText,
    onClearText,
    searchParam,
    loading,
    gender,
    status,
    origin,
    type,
    error,
  };
};

export default useBiodata;
