import { Heart, HouseLine, MapPin, ShieldCheck } from '@phosphor-icons/react'
import { trustItems } from '../../constants/homepage.js'

const icons = {
  map: MapPin,
  house: HouseLine,
  shield: ShieldCheck,
  heart: Heart,
}

export function TrustStrip() {
  return (
    <section className="trust-strip luxury-trust-strip" aria-label="KareBraids trust highlights">
      {trustItems.map((item, index) => {
        const Icon = icons[item.icon]

        return (
          <article data-reveal key={item.title} style={{ '--index': index }}>
            <Icon aria-hidden="true" size={24} weight="duotone" />
            <h2>{item.title}</h2>
          </article>
        )
      })}
    </section>
  )
}
