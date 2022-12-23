/**
 * 获取某月的第一天是星期几
 * @param year 年
 * @param month 月
 * @returns 1号是星期几
 */
export function getFirstWeekDay (year: number, month: number): number {
  const date = new Date(year, month - 1, 1)
  return date.getDay()
}

/**
 * 获取某月的天数
 * @param year 年
 * @param month 月
 * @returns 某月有多少天
 */
export function getMonthDayCount (year: number, month: number): number {
  const date = new Date(year, month, 0)
  return date.getDate()
}

/**
 * 获取上个月未展示的日期
 * @param year 年
 * @param month 月
 * @returns 上个月剩余的未展示的日期
 */
export function getLastMonthRestDays (year: number, month: number): number[] {
  const days = getFirstWeekDay(year, month)
  let lastDate = getMonthDayCount(year, month - 1)
  const restDays: number[] = []

  while (restDays.length < days) {
    restDays.push(lastDate --)
  }

  return restDays.reverse()
}

export function getNextMonthRestDays (year: number, month: number): number[] {
  const lastMonthRestDayCount: number = getFirstWeekDay(year, month)
  const currentMonthDayCount: number = getMonthDayCount(year, month)
  const nextMonthRestDayCount: number = 42 - lastMonthRestDayCount - currentMonthDayCount
  const restDays: number[] = []

  for (let i = 1; i <= nextMonthRestDayCount; i ++) {
    restDays.push(i)
  }

  return restDays
}

export function getFormatDate (year: number, month: number, date: number): string {
  const dateArr: (number | string)[] = [ year, month, date ]
  for (let i = 1; i < dateArr.length; i ++) {
    dateArr[i] = dateArr[i] < 10 ? `0${ dateArr[i] }` : dateArr[i]
  }
  return dateArr.join('-')
}
