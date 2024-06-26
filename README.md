# Activity Log

A full-stack application that provides an activity log for monitoring team activities. This project features:

- Backend: Node.js, TypeScript, Prisma, PostgreSQL
- Frontend: Next.js, React, TailwindCSS
- Real-time updates with SWR
- Filter and search functionality
- Export logs to CSV
- Detailed views of user activities

## Features

- **Real-time Updates:** Use a toggle button to enable or disable real-time updates.
- **Search and Filter:** Filter events based on actor, target, and action, with a search bar for more refined searches.
- **Pagination:** Efficiently navigate through the logs with pagination.
- **Detailed Views:** Click on an event to see more detailed information.
- **Export to CSV:** Easily export the events data to a CSV file for external use.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedadel56/activity-log.git
   cd activity-log

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up the database:**
   Create a .env file in the root of your project and add your database URL:
   ```bash
    DATABASE_URL="postgresql://activity-log_owner:L5aV6tXOqIez@ep-late-glitter-a40m669e.us-east-1.aws.neon.tech/activity-log?sslmode=require"

4. **Start the development server:**
   ```bash
   npm run dev


5. **Start the development server:**
    Navigate to `http://localhost:3000`

## Usage

### EventList Component

The EventList component displays a list of events with the following features:

- **Search Bar:** Search events by name, email, or action.
- **Filters:** Filter events by actor, target, and action.
- **Live Updates:** Enable real-time updates to see new events as they happen.
- **Export to CSV:** Download the events data in CSV format.
- **Pagination:** Navigate through multiple pages of events.

### ScreenShots
![image](https://github.com/ahmedadel56/activity-log/assets/43178495/a0568d40-c1d7-4867-a4ab-920ea5e49706)
![image](https://github.com/ahmedadel56/activity-log/assets/43178495/f21b57c7-78ac-4d29-976b-87e59ee49ed3)
![image](https://github.com/ahmedadel56/activity-log/assets/43178495/b070510f-d81c-4508-94fe-1b85ef5b161d)

### Backend API

The backend API provides endpoints to create and retrieve events.

- **POST /api/events:** Create a new event.
- **GET /api/events:** Retrieve events with optional pagination, search, and filters.

## Live Deployment

You can view the live deployment of this project [here](https://activity-log-tau.vercel.app/).


## Contributing

Contributions are welcome! Please fork this repository and submit pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgements

Thanks to the contributors of Prisma, Next.js, and TailwindCSS for their amazing tools.
