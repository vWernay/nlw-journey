import { Calendar, Tag, X } from "lucide-react"
import { FormEvent } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/button"
import { api } from "../../lib/axios"

interface CreateActivityModalProps {
    onClose: () => void
}

export default function CreateActivityModal({
    onClose
}: CreateActivityModalProps) {
    const { tripId } = useParams()
    async function createActivity(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs_at')?.toString()
        if (!title || !occurs_at) return

        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at
        })
        window.document.location.reload()
    }

    return <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                    <button onClick={onClose}>
                        <X className='size-5 text-zinc-400' />
                    </button>
                </div>
                <p className="text-sm text-zinc-400">
                    Todos convidados podem visualizar as atividades.
                </p>
            </div>
            <form onSubmit={createActivity} className='space-y-3'>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Tag className="text-zinc-400 size-5" />
                    <input name="title" placeholder="Qual a atividade?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                </div>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Calendar className="text-zinc-400 size-5" />
                    <input type="datetime-local" name="occurs_at" placeholder="Data e horário da atividade" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                </div>
                <Button variant="primary" size="full">
                    Salvar atividade
                </Button>
            </form>
        </div>
    </div>
}