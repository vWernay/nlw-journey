import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import Button from "../../../components/button"

import "react-day-picker/dist/style.css"

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    handleGuestsInput: () => void
    setDestination: (destination: string) => void
    eventStartAndEndDates: DateRange | undefined
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export default function DestinationAndDateStep({
    isGuestsInputOpen,
    handleGuestsInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function handleToggleDatePicker() {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        && format(eventStartAndEndDates.from, "d ' de ' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d ' de ' LLL"))

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" onChange={(e) => setDestination(e.target.value)} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <button onClick={handleToggleDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 outline-none text-left w-60">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg placeholder-zinc-400 w-40 flex-1">
                    {displayedDate || 'Quando?'}
                </span>
            </button>
            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data</h2>
                                <button onClick={handleToggleDatePicker}>
                                    <X className='size-5 text-zinc-400' />
                                </button>
                            </div>
                        </div>
                        <DayPicker mode="range" fromDate={new Date()} selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                    </div>
                </div>
            )}

            <hr className="bg-zinc-800 w-px h-6 border-none" />

            {isGuestsInputOpen ? (
                <Button onClick={handleGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={handleGuestsInput} variant="primary">
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )}
        </div>
    )
}