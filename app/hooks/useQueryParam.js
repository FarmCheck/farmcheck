import queryString from 'query-string';
import { flatten, unflatten } from 'flat';
import pick from 'object.pick';

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useQueryParam = ({ query = {}, option = {}, deps = [] }) => {
  const history = useHistory();

  useEffect(() => {
    const standardQuery = unflatten(query);

    const { isVisible, whiteList } = option;

    if (isVisible) {
      history.push(
        `?${queryString.stringify(flatten(pick(standardQuery, whiteList)), {
          skipEmptyString: true,
          skipNull: true,
          allowDots: true,
        })}`,
      );
    }
  }, deps);
};

export default useQueryParam;
