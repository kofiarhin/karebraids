import { Navigate, useParams } from 'react-router-dom'
import { styleProfileBySlug } from '../constants/styles.js'

export function StyleRedirect() {
  const { slug } = useParams()
  return <Navigate replace to={styleProfileBySlug[slug] ? `/services/${slug}` : '/services'} />
}
