import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmTripModal from './confirm-trip-modal'
import InviteGuestModal from './invite-guest-modal'
import DestinationAndDateStep from './steps/destination-and-date-step'
import InviteGuestsStep from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export default function CreateTripPage() {
    const navigate = useNavigate()

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

    function handleGuestsInput() {
        setIsGuestsInputOpen(!isGuestsInputOpen)
    }
    function handleGuestsModal() {
        setIsGuestsModalOpen(!isGuestsModalOpen)
    }

    function handleConfirmTripModal() {
        setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
    }

    function addNewEmailToInvite(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const email = data.get('email')?.toString()
        if (!email) return

        if (emailsToInvite.includes(email)) return
        setEmailsToInvite([...emailsToInvite, email])

        e.currentTarget.reset()
    }
    function removeEmailFromInvite(email: string) {
        setEmailsToInvite(emailsToInvite.filter((e) => e !== email))
    }

    async function createTrip(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!destination) return
        if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return
        if (emailsToInvite.length === 0) return
        if (!ownerName || !ownerEmail) return

        const response = await api.post('/trips', {
            destination,
            owner_name: ownerName,
            owner_email: ownerEmail,
            starts_at: eventStartAndEndDates?.from,
            ends_at: eventStartAndEndDates?.to,
            emails_to_invite: emailsToInvite
        })
        const { tripId } = response.data

        navigate(`/trips/${tripId}`)
    }

    return <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
            <div className="flex flex-col items-center gap-3">
                <img src="./logo.svg" alt="plann.er" />
                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
            </div>
            <div className="space-y-4">
                <DestinationAndDateStep
                    isGuestsInputOpen={isGuestsInputOpen}
                    handleGuestsInput={handleGuestsInput}
                    setDestination={setDestination}
                    setEventStartAndEndDates={setEventStartAndEndDates}
                    eventStartAndEndDates={eventStartAndEndDates}
                />
                {isGuestsInputOpen && <InviteGuestsStep
                    openGuestsModal={handleGuestsModal}
                    handleConfirmTripModal={handleConfirmTripModal}
                    emailsToInvite={emailsToInvite}
                />}
            </div>
            <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
            </p>
        </div>
        {isGuestsModalOpen && <InviteGuestModal
            onClose={handleGuestsModal}
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvite={removeEmailFromInvite}
        />}
        {isConfirmTripModalOpen && <ConfirmTripModal
            onClose={handleConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
        />}
    </div>
}