import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filteredValue = searchParams.get('status') || 'all';
  const filter =
    filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue, method: 'eq' };

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isPending, error, bookings };
}
