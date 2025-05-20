# ThinkAndSelect-Online Quiz & Learning Platform

## Overview

This project is an innovative quiz application designed to support both practice and exam modes, allowing users to test their knowledge and receive certificates upon successful completion. The application integrates essential learning tools, including a Notes Section, Tutorial Section, and an Online Compiler supporting multiple programming languages.

## Features

- **Practice & Exam Modes** – Users can choose between practice mode for self-assessment and exam mode for certification.
- **Certificate Generation** – Automatically generates certificates upon successful exam completion.
- **Notes Section** – Users can manage study notes within the application.
- **Tutorial Section** – Provides interactive tutorials to help users grasp concepts more effectively.
- **Online Compiler** – Integrated with third-party APIs to support multiple programming languages.
- **Seamless User Experience** – Optimized for performance and responsiveness.

## Demo
https://youtu.be/QJccMRBPc_U

## Tech Stack

### Frontend:
- **React.js** – Provides a dynamic and interactive UI.
- **Tailwind CSS** – Ensures a modern and responsive design.

### Backend:
- **Spring Boot** – Manages business logic and API endpoints.
- **MySQL** – Stores user data, quiz results, and generated certificates.
- **Third-Party APIs** – Used for online code compilation.

## System Workflow

1. Users register and log in to access quiz modules.
2. They select either practice mode or exam mode.
3. Upon successful completion of an exam, a certificate is generated.
4. Users can take notes and access tutorials for better understanding.
5. The online compiler allows users to write and test code in multiple languages.
6. Data is stored in MySQL for persistence and performance.

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/ManishPatidar806/ThinkAndSelect.git


# Set up the backend
cd backend
mvn clean install
mvn spring-boot:run

# Set up the frontend
cd frontend
npm install
npm start
```


## License

This project is open-source and available under the MIT License.
