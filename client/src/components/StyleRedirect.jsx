import { Navigate, useParams } from 'react-router-dom'

export function StyleRedirect() {
  const { slug } = useParams()
  return <Navigate replace to={`/services/${slug}`} />
}
