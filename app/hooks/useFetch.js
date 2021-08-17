import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Notification } from 'components';

const paginationInit = {
  current: 1,
  next: 2,
  prev: 0,
  take: 10,
  total: 0,
};

const useFetch = ({
  selector,
  action,
  query = {},
  initValue = [],
  deps = [],
}) => {
  const dispatch = useDispatch();

  const data = useSelector(selector);
  const [pagination, setPagination] = useState(paginationInit);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!query) {
          return;
        }

        const actionResult = await dispatch(action(query));
        const { pagination: paginationResult } = unwrapResult(actionResult);

        if (isMounted) {
          setPagination(paginationResult);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          Notification('error', 'Tải dữ liệu thất bại', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { isLoading, error, data: [...initValue, ...data], pagination };
};

export default useFetch;
