import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning"
import { HabitDay } from "./HabitDay"
import { api } from "../lib/axios"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

const summaryDates = generateDatesFromYearBeginning()  

// 18 weeks * 7 days
const minimumSummaryDatesSize = 18 * 7 

// how much squares I need to generate if summary dates size is less than the minimum
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length 

type Summary = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get("summary").then(response => setSummary(response.data))
    }, [])

    return (
        <div className="w-full flex">

            {/* generate days index column */}
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekDays.map((weekDay, index) => {
                        return (
                            <div key={`${weekDay} - ${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                                {weekDay}
                            </div>
                        )
                    })
                }
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">

            {/* generate the square for past days, it will only generate after the API return */}
                {
                    summary.length > 0 && summaryDates.map(eachDate => {
                        const dayInSummary = summary.find(day => {
                            return dayjs(eachDate).isSame(day.date, 'day')
                        })

                        return (
                            <HabitDay 
                                key={eachDate.toString()} 
                                amount={dayInSummary?.amount} 
                                defaultCompleted={dayInSummary?.completed}
                                date={eachDate} 
                            />
                        )
                    })
                }

                {/* generate the unused squares, it's just for visual matters, user cannot interact with */}
                {
                    amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((eachValue, index) => {
                        return (
                            <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
                        )
                    })
                }
            </div>
        </div>
    )
}