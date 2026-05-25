import { useQuery } from '@tanstack/react-query'
import { getAdminBookings } from '../../services/adminService.js'

export function useAdminBookings(token) {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => getAdminBookings(token),
    enabled: Boolean(token),
  })
}
