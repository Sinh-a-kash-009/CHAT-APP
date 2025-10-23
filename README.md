# StudySync

A modern study management application built with React frontend and Node.js backend.

## Project Structure

```
studysync/
├── client/         ← React frontend
├── server/         ← Node.js + Express backend
└── README.md       ← Project info
```

## Features

- **Study Session Management**: Track and manage your study sessions
- **Progress Tracking**: Monitor your learning progress over time
- **Task Organization**: Create and organize study tasks and goals
- **Real-time Updates**: Get instant feedback on your study activities
- **Responsive Design**: Works seamlessly across all devices

## Tech Stack

### Frontend (client/)
- React.js
- Modern JavaScript (ES6+)
- CSS3 with responsive design
- State management with React Hooks

### Backend (server/)
- Node.js
- Express.js framework
- RESTful API design
- Database integration (to be configured)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studysync
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Development

### Backend Development
- API endpoints are defined in the server directory
- Database models and controllers are organized in separate folders
- Environment variables are managed through .env files

### Frontend Development
- React components are organized by feature
- Styling uses modern CSS with responsive design
- State management is handled with React Hooks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue in the repository. 