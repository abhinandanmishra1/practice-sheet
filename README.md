# Practice Sheet - Problem Management System

A full-stack application to manage coding practice problems across different platforms, organize them into sheets, and track progress.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- [Clerk Account](https://clerk.dev/) for authentication
- Git

### Environment Setup

1. **Server Environment (.env)**
   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/practice-sheet  # you can use the cloud mongodb uri
   CLIENT_URL=http://localhost:5173
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

2. **Client Environment (.env)**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:5001
   ```

### Setting Up the Development Environment

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/practice-sheet.git
   cd practice-sheet
   ```

2. **Set Up MongoDB**
   ```bash
   # Start MongoDB service
   mongod

   # In a new terminal, connect to MongoDB
   mongosh

   # Create and use the database
   use practice-sheet
   ```

3. **Initialize Database with Sample Data**
   ```bash
   # From the project root
   cd server
   npm run init-db
   ```

4. **Set Up Server**
   ```bash
   # From the project root
   cd server
   npm install
   npm run dev
   ```

5. **Set Up Client**
   ```bash
   # From the project root
   cd client
   npm install
   npm run dev
   ```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## 📚 Database Structure

### Collections

1. **Problems**
   - Name
   - Problem ID (platform-specific)
   - Problem Link
   - Platform

2. **Sheets**
   - Name
   - Description

3. **ProblemSheet** (Join Collection)
   - Problem ID (ref: Problems)
   - Sheet ID (ref: Sheets)

4. **ProblemFeedback**
   - Problem ID (ref: Problems)
   - User ID
   - Bookmarked
   - Rating
   - Hint
   - Best Time Complexity

5. **SolvedProblems**
   - Problem ID
   - User ID

## 🛠 Development

### Project Structure

```
practice-sheet/
├── server/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   └── server.js
└── client/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   └── types/
    └── vite.config.ts
```

### Key Features

1. **Problem Management**
   - Add/View problems
   - Mark problems as solved
   - Add feedback and hints

2. **Sheet Management**
   - Create practice sheets
   - Add problems to multiple sheets
   - Track progress per sheet

3. **User Features**
   - Authentication via Clerk
   - Problem feedback
   - Progress tracking

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
