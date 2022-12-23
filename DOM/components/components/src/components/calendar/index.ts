import './index.scss'

import { render } from './date/render'
import eventRegister from './event'
import { reactive } from './store'
import { getDateInfo } from './utils'
import { DateInfo, CalendarOptions } from './types'

export default (...args: CalendarOptions): void => {
  if (args.length === 2) {
    const [el, handler] = args
    const date = getDateInfo()
    init(el, date, handler)
  } else if (args.length === 3) {
    const [ el, date, handler ] = args
    init(el, date, handler)
  }
}

function init (el: string, date: DateInfo, handler: (...args: any[]) => any): void {
  const oEl = document.querySelector(el)!
  const oContainer: HTMLElement = document.createElement('div')
  oContainer.className = 'calendar'

  render(oContainer, date)
  eventRegister(oContainer, handler, reactive(date))
  oEl.appendChild(oContainer)
}
