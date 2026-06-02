import { CalendarCheck, CurrencyGbp, Heart, HouseLine, ShieldCheck, Sparkle } from '@phosphor-icons/react'
import { valueItems } from '../../constants/homepage.js'
import { SectionHeading } from './SectionHeading.jsx'

const icons = { sparkle: Sparkle, shield: ShieldCheck, calendar: CalendarCheck, price: CurrencyGbp, house: HouseLine, heart: Heart }
export function WhyChoose() {
  return <section className="why-choose-section" aria-labelledby="why-choose-title"><SectionHeading eyebrow="Why Choose KareBraids" heading="Professional braiding without the uncertainty." /><div className="value-row">{valueItems.map((item, index) => { const Icon = icons[item.icon]; return <article data-reveal key={item.title} style={{ '--index': index }}><Icon aria-hidden="true" size={26} weight="duotone" /><h3>{item.title}</h3><p>{item.text}</p></article> })}</div></section>
}
