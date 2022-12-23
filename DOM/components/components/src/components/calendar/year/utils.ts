export function createDecadeYears (year: number): number[] {
  const str = year.toString().slice(0, 3)
  const yearArr: number[] = []

  for (let i = 0; i < 10; i ++) {
    yearArr.push(Number(str + i))
  }

  return yearArr
}

export function getStartAndEndYear (year: number): [ number, number ] {
  const str = year.toString().slice(0, 3)
  return [ Number(str + 0), Number(str + 9) ]
}
