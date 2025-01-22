# JobApp

Welcome to the JobApp repository! This project is a full-stack application designed to help users manage job applications. It includes a frontend built with Vite and a backend powered by Spring Boot.

## Project Structure

The project is organized as follows:

- **frontend**: Contains the frontend code built with React & Vite.
- **springboot-rest**: Contains the backend code built with Spring Boot.
- **Jobapp**: Contains the main application logic and integration code.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for the frontend)
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (for the backend)
- [Git](https://git-scm.com/)

# Getting Started

To get a local copy up and running, follow these steps.

## Clone the Repository

```bash
git clone https://github.com/milindkedare/JobApp.git
cd JobApp

Frontend Setup
Navigate to the frontend directory:
cd frontend

Install the dependencies:
npm install

Start the development server:
npm run dev


Backend Setup
Navigate to the springboot-rest directory:
cd ../springboot-rest

Build the project using Maven:
./mvnw clean install

Run the Spring Boot application:
./mvnw spring-boot:run
