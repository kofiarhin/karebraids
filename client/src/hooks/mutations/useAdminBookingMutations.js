import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createAdminBooking,
  deleteAdminBooking,
  loginAdmin,
  updateAdminBooking,
  updateAdminBookingStatus,
} from '../../services/adminService.js'

export function useAdminLogin() {
  return useMutation({
    mutationFn: (credentials) => loginAdmin(credentials),
  })
}

export function useCreateAdminBooking(token) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createAdminBooking(token, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })
}

export function useUpdateAdminBooking(token) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => updateAdminBooking(token, id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })
}

export function useUpdateAdminBookingStatus(token) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }) => updateAdminBookingStatus(token, id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })
}

export function useDeleteAdminBooking(token) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deleteAdminBooking(token, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })
}
