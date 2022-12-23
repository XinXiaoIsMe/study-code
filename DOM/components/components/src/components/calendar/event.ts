import { ALLOWED_FLAGS, DateMsg } from './types'
import { getFlag, setFlag } from './store'

let target: HTMLElement | null = null

export default (container: HTMLElement, handler: (...args: any[]) => any, dateInfo: DateMsg) => {
  container.addEventListener('click', handleClick.bind(null, handler, dateInfo, container), false)
}

function handleClick (handler: (...args: any[]) => any, dateInfo: DateMsg, container: HTMLElement, e: Event): void {
  const tar = e.target as HTMLElement
  const className = tar.className
  const flag = getFlag()

  if (className.includes('current-day')) {
    dateClick(tar, handler)
    return
  }

  if (className.includes('decade-year')) {
    yearClick(container, tar, dateInfo)
    return
  }

  if (className.includes('static-month')) {
    monthClick(container, tar, dateInfo)
    return
  }

  if (className === 'title-year') {
    titleYearClick(container, dateInfo)
    return
  }

  if (className === 'title-month') {
    titleMonthClick(container, dateInfo)
    return
  }

  switch (flag) {
    case ALLOWED_FLAGS.YEAR:
      yearControlClick(className, dateInfo)
      break
    case ALLOWED_FLAGS.MONTH:
      monthControlClick(className, dateInfo)
      break
    case ALLOWED_FLAGS.DATE:
      dateControlClick(className, dateInfo)
      break
    default:
      break
  }
}

function yearClick (container: HTMLElement, tar: HTMLElement, dateInfo: DateMsg): void {
  dateInfo.year = Number(tar.dataset.year)
  setFlag(ALLOWED_FLAGS.DATE, dateInfo, container)
}

function monthClick (container: HTMLElement, tar: HTMLElement, dateInfo: DateMsg): void {
  dateInfo.month = Number(tar.dataset.month)
  setFlag(ALLOWED_FLAGS.DATE, dateInfo, container)
}

function dateClick (tar: HTMLElement, handler: (...args: any[]) => any): void {
  if (target) {
    target.className = target.className.replace(' selected', '')
  }
  target = tar
  tar.className += ' selected'
  handler && handler(tar.dataset.date!)
}

function titleYearClick (container: HTMLElement, dateInfo: DateMsg): void {
  setFlag(ALLOWED_FLAGS.YEAR, dateInfo, container)
}

function titleMonthClick (container: HTMLElement, dateInfo: DateMsg): void {
  setFlag(ALLOWED_FLAGS.MONTH, dateInfo, container)
}

function yearControlClick (className: string, dateInfo: DateMsg): void {
  switch (className) {
    case 'year-control-btn btn-year-lt':
      dateInfo.year -= 10
      break
    case 'year-control-btn btn-year-gt':
      dateInfo.year += 10
      break
    default:
      break
  }
}

function monthControlClick (className: string, dateInfo: DateMsg): void {
  switch (className) {
    case 'month-control-btn btn-year-lt':
      dateInfo.year -= 1
      break
    case 'month-control-btn btn-year-gt':
      dateInfo.year += 1
      break
    default:
      break
  }
}

function dateControlClick (className: string, dateInfo: DateMsg) {
  switch (className) {
    case 'control-btn btn-year-lt':
      dateInfo.year -= 1
      break
    case 'control-btn btn-month-lt':
      dateInfo.month > 1 && (dateInfo.month -= 1)
      break
    case 'control-btn btn-year-gt':
      dateInfo.year += 1
      break
    case 'control-btn btn-month-gt':
      dateInfo.month < 12 && (dateInfo.month += 1)
      break
  }
}
