import Calendar from './components/calendar'

;(() => {
  Calendar('#app', [2022, 11, 21], (date: string): void => {
    console.log(date)
  })
})()
