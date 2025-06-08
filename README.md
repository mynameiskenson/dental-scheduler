# Dental Scheduler Application

## Project Overview  
Dental Scheduler is a system that enables users to:  
- View available time slots for dentists  
- Book, cancel, or reschedule appointments  
- Receive notifications via WhatsApp (Twilio) and Email (Nodemailer)  

---

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Backend       | Node.js, Prisma ORM               |
| Notifications | Twilio WhatsApp, Nodemailer       |
| Database      | PostgreSQL                        |
| Frontend      | React, Redux, Axios, TailwindCSS  |
| Deployment    | AWS EC2, AWS RDS, pm2, Serve      |

---

## ⚙️ Setup & Installation

### 📦 Prerequisites
- Node.js (v18+)  
- npm or pnpm  
- PostgreSQL  
- Git  

### 📁 Folder Structure
/dental-scheduler
│
├── client/ # React frontend
└── server/ # Node.js + Express + Prisma backend

---

### PostgreSQL Setup  
Create the database manually:  
sql:
CREATE DATABASE dental_scheduler;

---

### Backend Setup (/server)  
Create the database manually:  
- cd server
cp .env.example .env  # or create your own .env file

Example .env:
DATABASE_URL=postgres://user:password@localhost:5432/dental_scheduler
SECRET_KEY=your_secret_key_here

TWILIO_ACCOUNT_SID=xxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxx
TWILIO_WHATSAPP_FROM=+xxxxxx

SMTP_USER=xxxxx
SMTP_PASS=xxxxxx

Install dependencies and run migrations:
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev

---

### Frontend Setup (/client)
cp .env.example .env  # or create your own .env file
Example .env:
TZ=Asia/Singapore
VITE_API_URL=http://localhost:5000/api

Install dependencies and run dev:
npm install
npm run dev

---

## ⚙️ Backend Overview

### Database & ORM
- Uses Prisma ORM with PostgreSQL
- Key tables: User, Dentist, Appointment

Appointment:
- userId
- dentistId
- scheduledAt (stored in UTC)
- status (booked, cancelled, etc.)
- reason (optional text)

User:
- fullName
- email
- passwordHash
- phone
- createdAt
- updatedAt

Dentist:
- fullName
- specialty
- email
- phone
- createdAt

---

### Scheduling Logic
- Generates 30-minute slots from 9 AM to 5 PM (Philippines Time)
- Converts time to UTC for storage and filtering
- Filters out booked slots

### Notifications
Triiggered when appointments are:
- Booked
- Cancelled
- Rescheduled

Notifications are sent via:
- WhatsApp (Twilio) - I use WhatsApp due to no free trier of phone number between US and PH,
  need also verification from the recipient before receiving messages
- Email (Nodemailer)

Notifications are sent immediately (no queue as of the moment).

---

## ⚙️ Frontend Overview

### Frontend Overview
React Components:
- Built with React + Redux Toolkit for state management
- TailwindCSS for styling
- Axios for API calls

### Appointment Booking
- Fetches available time slots from backend
- UI buttons for selecting slots
- Calls booking API and updates state

### User Dashboard
- Displays upcoming appointments
- Buttons to cancel or reschedule appointments
- Auto-refreshes after updates

### Reschedule Modal
- Opens calendar and slot options
- Allows selecting a new slot and calls reschedule API
- Updates UI on success

---

## 🚀 Deployment

### AWS EC2 Instance
- Ubuntu Server 22.04 LTS
- t2.micro (for testing or small workloads)
- Create key pair (.pem file)

---

### Configure
Open ports in Security Group:
- 22 (SSH)
- 5000 (Backend API)
- 3000 (Frontend or serve)
- 5432 (optional: PostgreSQL remote access)

---

### SSH into EC2(Your Terminal)
run:
- ssh -i "C:\Users\<pcname>\Downloads\<SSH KEY>.pem" <Instance ID since its ubuntu It's "ubuntu">@ec2-3-106-117-252.ap-southeast-2.compute.amazonaws.com

### Install Node & NPM
#### Install via NodeSource (LTS version):
Update packages:
- sudo apt update
- sudo apt install curl -y

Add NodeSource repository for Node.js LTS (e.g., 20.x):
- curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  
Install Node.js and npm:
- sudo apt install -y nodejs

Verify installation
- node -v
- npm -v

---

#### Install Git:
sudo apt install git -y

---

#### Install PostgreSQL (to run the RDS needed the psql):
run:
- sudo apt update
- sudo apt install postgresql postgresql-contrib -y

Inside psql:
CREATE DATABASE dental_scheduler;
CREATE USER dental_user WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE dental_scheduler TO dental_user;
\q (disconnect in db)
exit (go back to shell)

---

#### Clone and Setup the Project
Clone Your Project:
- git clone https://github.com/your-username/dental-scheduler.git
- cd dental-scheduler

### Setup Backend (Node.js + Prisma + PostgreSQL):
cd server:
- npm install
- create and edit .env

Generate Prisma Client:
run:
(NOTE: Before running this make sure the schema.prisma is configure for the compiled project, 
this one of the reason I didn't pursue the containerization 
because it really takes me a lot of time to figured this out since it won't run.)

Before push to git for production make sure to change this:
cd server/prisma/schema.prisma:

generator client {
  provider = "prisma-client-js"
  output   = "../dist/generated/prisma"  <------ CHECK THIS! MAKE SURE ITS IN GENERATED TO THE BUILD/COMPILED(prod environment) PROJECT WHICH IS "dist".
                                                  IF YOU WANT TO GO BACK TO USE IT IN NON-COMPILED(dev environment) PROJECT BACK IT TO "src".
}

then run this:
- npx prisma generate

Build the Server:
(Use the actual build command, since I forgot to add this on the script. LOL)
- npx tsc

Run via PM2:
- sudo npm install -g pm2
- pm2 start dist/server.js --name backend
- pm2 save

---

### Setup Frontend (Node.js + Prisma + PostgreSQL):
Setup Frontend (React + Vite):
- cd ../client
- npm install

Create and edit .env and .env.production:
- nano .env.production
- type TZ=Asia/Singapore
VITE_API_URL=http://<public IP of the ec2>/api
- ctrl + o, press Enter (for saving)
- ctrl + x (exit and go back to shell)

Build Frontend:
- npm run build

Install Serve and use it then run it with PM2 for the Frontend:
- npm install -g serve
- pm2 start "serve -s dist -l 3000" --name frontend
- pm2 save

---

### Run Frontend and Backend
Check if they are in the PM2:
- pm2 list

When confirmed:
- pm2 startup
- pm2 save

There you go, you can now exit the ssh while your Frontend and Backend is running.
(NOTE: Please make sure your Ports are added in the Inbound Rule in Security Group in AWS EC2)
