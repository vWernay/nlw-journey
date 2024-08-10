import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CircleCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"

interface Activity {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

export default function Activities() {
    const { tripId } = useParams()
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])


    return <div className="space-y-8">
        {activities.map((category) => (
            <div key={category.date} className="space-y-2.5">
                <div className="flex items-baseline gap-2">
                    <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
                    <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span>
                </div>
                {category.activities.length > 0 ? category.activities.map((activity) => (
                    <div key={activity.id} className="space-y-2.5">
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-start gap-3">
                            <CircleCheck className="size-5 text-lime-300" />
                            <span className="text-zinc-100">{activity.title}</span>
                            <span className="text-sm text-zinc-400 ml-auto">
                                {format(activity.occurs_at, "HH:mm'h'")}
                            </span>
                        </div>
                    </div>
                )) : <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>}
            </div>
        ))}
    </div>
}
