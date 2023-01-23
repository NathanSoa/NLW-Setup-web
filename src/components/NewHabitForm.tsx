import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'

const availableWeekdays = ['Domingo', 'Seguna-feira', 'Terça-feira', "Quarta-feira", 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabitForm() {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if(!title || weekDays.length === 0) {
            return
        }

        api.post('habits', {
            title,
            weekDays
        }).then(() => alert('Hábito criado com sucesso'))

        setTitle('')
        setWeekDays([])
    }

    // Function to handle the array input and output if user unchecked a day that was previously checked
    function handleToggleWeekday(weekDay:number) {
        if(weekDays.includes(weekDay)){
            const updatedWeekDays = weekDays.filter(eachWeekDay => eachWeekDay !== weekDay)
            setWeekDays(updatedWeekDays)
        } else {
            setWeekDays([...weekDays, weekDay])
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu novo hábito?
            </label>

            <input 
                type="text" 
                id="title" 
                placeholder="Exemplos: Execícios, dormir bem, etc..." 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência? 
            </label>
            
            <div className="mt-3 flex flex-col gap-2">
                {
                    availableWeekdays.map((eachWeekday, index) => {
                        return (
                            <Checkbox.Root 
                                key={eachWeekday} 
                                className='flex items-center gap-3 group focus:outline-none'
                                checked={weekDays.includes(index)}
                                onCheckedChange={() => handleToggleWeekday(index)}    
                            >

                                {/* Checkbox Indicator disapper when not checked, this div exists for style purpose */}
                                <div className='h-8 w-8 rounded-xl flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-600 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                                    <Checkbox.Indicator>
                                        <Check size={20} className="text-white"/>
                                    </Checkbox.Indicator>
                                </div>

                                <span className='text-white leading-tight'>
                                    {eachWeekday}
                                </span>

                            </Checkbox.Root>
                        )
                    })
                }
            </div>

            <button 
                type="submit" 
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}