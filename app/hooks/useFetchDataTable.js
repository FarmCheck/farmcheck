import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { unflatten } from 'flat';

import { Notification } from 'components';
// TODO: circle import
import useQueryParam from 'hooks/useQueryParam';

const paginationInit = {
  current: 1,
  next: 2,
  prev: 0,
  take: 10,
  total: 0,
};

const useFetchDataTable = ({
  selector,
  action,
  query = {},
  option = {},
  deps = [],
}) => {
  const dispatch = useDispatch();

  const data = useSelector(selector);
  const [pagination, setPagination] = useState(paginationInit);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useQueryParam({ query, option, deps });

  useEffect(() => {
    let isMounted = true;

    const orderQuery = {};
    orderQuery[query.order.name] = query.order.value;

    const standardQuery = unflatten({ ...query, order: orderQuery });

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!query) {
          return;
        }

        const actionResult = await dispatch(action(standardQuery));
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

  return { isLoading, error, data, pagination };
};

export default useFetchDataTable;
