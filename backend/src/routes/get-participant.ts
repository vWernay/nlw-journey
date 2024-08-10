import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { ClientError } from "../errors/client-error"
import { prisma } from "../lib/prisma"

export async function getParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/participants/:participantId', {
        schema: {
            params: z.object({
                participantId: z.string().uuid()
            }),
        }
    }, async (req) => {
        const { participantId } = req.params

        const participant = await prisma.participant.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                is_confirmed: true
            },
            where: { id: participantId }
        })
        if (!participant) {
            throw new ClientError('Participant not found.')
        }

        return { participant }
    })
}
