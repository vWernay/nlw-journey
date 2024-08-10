import { Plus } from "lucide-react"
import { useState } from "react"
import Activities from "./activities"
import CreateActivityModal from "./create-activity-modal"
import DestinationAndDateHeader from "./destination-and-date-header"
import Guests from "./guests"
import ImportantLinks from "./important-links"

export default function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

    function handleCreateActivityModal() {
        setIsCreateActivityModalOpen(!isCreateActivityModalOpen)
    }

    return <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
        <DestinationAndDateHeader />
        <main className="flex gap-16 px-4">
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Atividades</h2>
                    <button onClickCapture={handleCreateActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 transition-colors">
                        <Plus className="size-5" />
                        Cadastrar atividade
                    </button>
                </div>
                <Activities />
            </div>
            <div className="w-80 space-y-6">
                <ImportantLinks />
                <hr className="border-zinc-800" />
                <Guests />
            </div>
        </main>
        {isCreateActivityModalOpen && <CreateActivityModal onClose={handleCreateActivityModal} />}
    </div>
}