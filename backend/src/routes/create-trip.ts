import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { env } from "../env"
import { ClientError } from "../errors/client-error"
import dayjs from "../lib/dayjs"
import { getMailClient } from "../lib/mail"
import { prisma } from "../lib/prisma"

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips', {
        schema: {
            body: z.object({
                owner_name: z.string(),
                owner_email: z.string().email(),
                destination: z.string().min(4),
                emails_to_invite: z.array(z.string().email()),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date()
            })
        }
    }, async (req) => {
        const { owner_name, owner_email, destination, starts_at, ends_at, emails_to_invite } = req.body

        if (dayjs(starts_at).isBefore(new Date())) {
            throw new ClientError('Invalid Trip start date provided.')
        }
        if (dayjs(ends_at).isBefore(ends_at)) {
            throw new ClientError('Invalid Trip end date provided.')
        }

        const trip = await prisma.trip.create({
            data: {
                destination: destination,
                starts_at: starts_at,
                ends_at: ends_at,
                participants: {
                    createMany: {
                        data: [
                            {
                                name: owner_name,
                                email: owner_email,
                                is_confirmed: true,
                                is_owner: true
                            },
                            ...emails_to_invite.map(email => {
                                return { email }
                            })
                        ]
                    }
                }
            }
        })

        const formattedStartDate = dayjs(starts_at).format('LL')
        const formattedEndDate = dayjs(ends_at).format('LL')

        const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`

        const mail = await getMailClient()
        const message = await mail.sendMail({
            from: {
                name: 'Equipe Plann.er',
                address: 'oi@plann.er'
            },
            to: {
                name: owner_name,
                address: owner_email
            },
            subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
            html: `
                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                    <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
                    <p></p>
                    <p>Para confirmar sua viagem clique no link abaixo:</p>
                    <p></p>
                    <p>
                        <a href="${confirmationLink}">Confirmar viagem</a>
                    </p>
                    <p></p>
                    <p>Caso você não saiba do que se trata esse e-mail, apenas ignore-o.</p>
                </div>
            `.trim()
        })

        return { tripId: trip.id }
    })
}
