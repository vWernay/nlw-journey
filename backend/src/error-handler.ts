import { FastifyInstance } from "fastify"
import { ClientError } from "./errors/client-error"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, req, rep) => {
    if (error instanceof ZodError) {
        rep.status(400).send({
            message: 'Invalid input',
            errors: error.flatten().fieldErrors
        })
    }

    if (error instanceof ClientError) {
        rep.status(400).send({
            message: error.message
        })
    }
}
