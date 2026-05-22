import { useQuery } from '@tanstack/react-query'
import { getAvailability } from '../../services/bookingService.js'

export function useAvailability(service, date, enabled) {
  return useQuery({
    queryKey: ['booking-availability', service, date],
    queryFn: () => getAvailability({ service, date }),
    enabled: Boolean(enabled && service && date),
  })
}
