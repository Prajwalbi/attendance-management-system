# Attendance Management System

## Overview

This Attendance Management System is a web application built with **Next.js**, **React**, and **Tailwind CSS**. It allows educators to manage student attendance efficiently, send notifications, and generate reports.

### Key Features

- **Student Management**: Add, update, and delete student records.
- **Attendance Tracking**: Mark attendance and view attendance history.
- **Notifications**: Send WhatsApp messages to parents for absent students using the Ultramsg API.
- **Data Visualization**: View attendance statistics through charts.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
  - Recharts (for charts)

- **Backend**:
  - Drizzle ORM (for database interactions)
  - Firebase Firestore (for data storage)

- **APIs**:
  - Ultramsg API (for sending messages)

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or Yarn
- A Firebase project with Firestore enabled
- Ultramsg account for messaging

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/attendance-management-system.git
   cd attendance-management-system


2. Install dependencies:

npm install
# or
yarn install

3. Environment Variables: Create a .env.local file in the root of the project and add your environment variables:

NEXT_PUBLIC_ULTRAMSG_TOKEN=your_ultramsg_token
NEXT_PUBLIC_ULTRAMSG_INSTANCE_ID=your_ultramsg_instance_id
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id


4. Run the development server:

npm run dev
# or
yarn dev

5. Open your browser and go to http://localhost:3000

Usage
Dashboard: Overview of attendance and student statistics.
Students: Manage student details.
Attendance: Mark and view attendance records.
Settings: Configure application settings.
API Endpoints
GET /api/students: Retrieve a list of students.
POST /api/students: Add a new student.
DELETE /api/students?id=studentId: Delete a student by ID.
POST /api/messaging: Send a message to parents of absent students.

