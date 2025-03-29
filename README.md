# 🚀 Hacktralize
Hacktralize is a decentralized, hackathon-themed platform designed to help users generate product ideas, explore and create hackathons, find teams, and manage project resources. With AI-powered idea generation and a suite of collaborative tools, Hacktrilize streamlines the hackathon experience for both organizers and participants while embracing decentralization for enhanced security and transparency.

## Overview
Name: Hacktralize

Type: Blockhain AI-Powered Hackathon Platform

Track: Track 1 - Decentralized AI (this app uses AI to generate Hackathon ideas on-chain)

Built for: ICP 12

Focus: Quick Hackathon Ideas using AI, Secure Login Info, Seamless Team Collaboration

Source of Income:
  Every hackathon promoted in our website will be taxed up to 5% for development cost
  
Modules:
  - Hackathon Management Dashboard – Create, manage, and explore hackathons with event details.
  - AI-Powered Idea Generator – Generate and rate innovative hackathon ideas using AI.
  - Team Collaboration Hub – Find or recruit teammates, share updates, and engage with the community.
  - ICP-Based Wallet System – Securely manage team funds, transactions, and withdrawals.
  

## 🌟 Core Features
### 🔐 1. Authentication

Secure login using ICP Internet Identity, enabling decentralized authentication and enhanced security.

Users can manage their identity seamlessly across the platform without needing traditional usernames and passwords.

### 🏡 2. Home Page

Browse general hackathons happening worldwide.

Introduction to Hacktrilize and its features.

Testimonials from the community.

### 🎯 3. Hackathon Management

Create Hackathon: Organizers can set up their own hackathons with customized details.

Explore Hackathons: Users can discover and join various hackathons, viewing detailed event information.

### 📝 4. Profile Page

View your created hackathons and posts.

Manage your ICP-linked profile and track your participation history.

### 🛠️ 5. Tools

#### 🤖 AI Idea Generator: Generate hackathon project ideas using AI, with a built-in rating system.

#### 👥 Team Finder: Connect with teams looking for members for upcoming hackathons.

#### 📜 Code Template Library: Access general coding templates to accelerate project development.

#### 💳 Team Wallet Manager: Manage your team’s wallet for hackathons, including:

- Wallet overview
- Member management
- Transaction history
- Fund withdrawal
- ICP-based transactions for secure and decentralized financial management.

🌐 6. Community

📢 User Feed: View and post updates related to hackathons.

#### 🔎 Team Recruitment: Users can announce that they are looking for team members.

#### 📆 Hackathon Announcements: Stay updated on new and upcoming events.

#### 🔗 Blockchain Solutions: Share and discover innovations in blockchain development, leveraging ICP’s decentralized ecosystem.

## 💡 Problem Solved
Hackathons are fast-paced events that require rapid ideation, team formation, and resource management. Hacktrilize addresses these challenges by:

- Automating idea generation with AI to help teams quickly find innovative concepts.
- Providing a centralized platform to explore, create, and manage hackathons efficiently while ensuring decentralization for security.
- Offering tools to streamline team coordination, financial management, and project execution.
- Integrating ICP Internet Identity for enhanced security and decentralized user authentication.
- Utilizing ICP blockchain for seamless and decentralized transactions.
- Building a community-driven space for collaboration and knowledge sharing.
- With Hacktrilize, hackathon participants and organizers can focus on what truly matters: creating and innovating. 🚀

## 🤝 How to Contribute
1. Fork the repository
2. Clone the repository
3. Create a new branch
4. Make your changes
5. Push your changes
6. Create a pull request
7. Wait for the pull request to be reviewed

## 💻 How to Run Locally
> For windows, run the following commands in WSL2

### 1. Install `dfx` with the following command:
You can install the developer tools natively or use Dev Containers.

#### Option 1: Natively install developer tools

> Installing `dfx` natively is currently only supported on macOS and Linux systems. On Windows, it is recommended to use the Dev Containers option.

1. Install `dfx` with the following command:

```

sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

```

> On Apple Silicon (e.g., Apple M1 chip), make sure you have Rosetta installed (`softwareupdate --install-rosetta`).

2. [Install NodeJS](https://nodejs.org/en/download/package-manager).

3. For Motoko projects, you will also need to:

- Install the Motoko package manager [Mops](https://docs.mops.one/quick-start#2-install-mops-cli): `npm i -g ic-mops`

### 2. Run the following commands to setup, deploy to ICP playground, and start the project

```bash
chmod +x setup.sh
./setup.sh
npm run dev
```
