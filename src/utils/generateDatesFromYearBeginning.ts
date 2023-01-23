import dayjs from "dayjs";

/**
 * Function that generate an array of Dates object, it will generate element started by january 1st, 
 * example, if we're in january 16th, it will generate 16 dates in the array
 */
export function generateDatesFromYearBeginning() {
    const firstDateOfTheYear = dayjs().startOf('year')
    const today = new Date()
    const dates: Date[] = new Array()

    let compareDate = firstDateOfTheYear

    while(compareDate.isBefore(today)) {
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}