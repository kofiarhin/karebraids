import { useMutation } from '@tanstack/react-query'
import { createContactMessage } from '../../services/contactService.js'

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: createContactMessage,
  })
}
