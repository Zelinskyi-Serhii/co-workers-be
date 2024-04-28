# CO-Workers Backend Part

## Overview

Welcome to CO-Workers, a platform designed to empower your company's potential
by providing seamless employee management and engagement features.

CO-Workers is a Nest.js-based. The platform offers key features such as:

- **Company Profile Customization:** Easily create and customize company
  profiles with essential details.
- **Effortless Employee Management:** Add, update, or remove employees with
  ease, capturing vital information.
- **Public URL Sharing:** Generate public URLs to share company rosters with
  team members.

  ## Technologies Used

- **Nest.js**: A progressive Node.js framework for building efficient, reliable,
  and scalable server-side applications.
- **Swagger**: Used for API documentation and testing purposes, providing a
  clear and interactive API documentation.
- **Nodemailer**: Used for sending emails from the backend to users or
  administrators.
- **Cloudinary**: Utilized for storing and managing images in the cloud.

## Project Structure

The project structure follows the standard Nest.js architecture, with the
following main directories:

- `src/`: Contains the source code for the backend application.
  - `controllers/`: Contains the controller classes responsible for handling
    incoming requests and returning responses.
  - `services/`: Contains the service classes responsible for business logic and
    interacting with databases or external services.
  - `modules/`: Contains the modules that encapsulate related functionality,
    such as authentication, user management, etc.
  - `dto/`: Contains Data Transfer Object (DTO) classes used for data validation
    and transformation.
  - `config/`: Contains configuration files for different environments
    (development, production, etc.).
  - `app.module.ts`: The main module file where all modules, controllers, and
    services are imported and configured.

## Installation

To get started project, follow these steps:

1. Clone the repository to your local machine.
2. Install all dependencies using your preferred package manager:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Start server

```bash
npm run start
# or
yarn run start
# or
pnpm run start
# or
bun run start
```

After starting the server is running on http://localhost:5555/api/v1 url.
