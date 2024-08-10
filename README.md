# Plann.er

**Plann.er** is a desktop application designed to help you and your friends plan trips, record activities, and save useful links. The project was developed during the NLW Journey by [Rocketseat](https://app.rocketseat.com.br/) in July 2024.

## Project Structure

The repository is divided into two main folders:

- [**frontend**](/frontend/): Contains the client-side(frontend) code.
- [**backend**](/backend/): Contains the server-side(backend) code.

## Frontend

The frontend of the Plann.er application was built using:

- **TypeScript**: A typed superset of JavaScript.
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **Vite**: A fast build tool for modern web projects.
- **Axios**: A promise-based HTTP client for making requests.
- **ESLint**: A tool for identifying and fixing problems in JavaScript/TypeScript code.

## Backend

The backend of the Plann.er application was built using:

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Prisma**: An open-source database toolkit.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Fastify**: A web framework highly focused on providing the best developer experience with the least overhead.
- **TypeScript**: Ensuring type safety and code clarity.
- **Nodemailer**: A module for Node.js applications to send emails.

## Figma Design

The design for Plann.er can be found on Figma:
[Plann.er Figma Design](<https://www.figma.com/design/ZFhUsJrTxrYih2aOPkWqnB/NLW-Journey-%E2%80%A2-Planejador-de-viagem-(Community)?node-id=3-376&t=etKlSBp4HmcluAnI-1>)

## To-Do List

- [ ] Finalize the implementation of the API communication between the frontend and backend.
- [ ] Deploy the API (backend).
- [ ] Deploy the frontend.
- [ ] Create build scripts.

## Getting Started

To get started with the project, clone this repository and navigate into the appropriate folder (`backend` or `frontend`) to install the necessary dependencies and run the application.

```bash
# Clone the repository
git clone https://github.com/vWernay/nlw-journey.git

# Navigate to the frontend
cd frontend
pnpm install
pnpm run dev

# Navigate to the backend
cd backend
pnpm install

# Copy the environment variables example file and set your own values
cp .env.example .env

# Run the backend server
pnpm run dev
```
