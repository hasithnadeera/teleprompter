# Teleprompter App

A real-time teleprompter application built with Next.js and Socket.IO.

## Features

- Script writing and editing
- Real-time teleprompter display
- Socket.IO for real-time updates
- Mobile-responsive design

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Instructions

### 1. Deploy on Vercel (Recommended)

The easiest way to deploy this app is using Vercel:

1. First, push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repository and push your code:
   ```bash
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

3. Go to [Vercel](https://vercel.com)
4. Sign up/Login with your GitHub account
5. Click "New Project"
6. Import your GitHub repository
7. Click "Deploy"

Vercel will automatically detect that it's a Next.js project and configure the build settings.

### 2. Deploy on a Custom Server

If you want to deploy on your own server:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. The app will run on port 3000 by default. Use a process manager like PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "teleprompter" -- start
   ```

4. Set up a reverse proxy (like Nginx) to forward traffic to your app:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SOCKET_URL=your-domain.com
```

Replace `your-domain.com` with your actual domain name after deployment.
