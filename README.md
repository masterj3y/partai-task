# Event Processing Microservice

This repository contains the implementation of two microservices: `Agent` and `Process`. The `Agent` service sends events to the `Process` service, where events are processed and stored. This is a simplified implementation with no database, focusing on the event processing logic.

## Important Note

### Please ensure that the Processor service is running before starting instances of the Agent service.

## Installation
`docker compose up docker compose up mongo rabbitmq processor redis`
`docker compose up -d --scale event-agent=3`

## Overview

1. **Agent Service**:
   - Each `Agent` has a unique identifier.
   - The primary responsibility of the `Agent` is to generate events and send them to the `Process` service using RabbitMQ.
   - Events are generated at a rate (e.g., 5 events per second) with random data such as temperature, pressure, voltage, noise, light intensity, etc.
   - The generated events have only two fields: `name` and `value`.
   - The service doesn't have a database and is designed to be simple.

2. **Process Service**:
   - The `Process` service is responsible for receiving events from `Agent`, storing them, and performing operations on them.
   - The service uses **Redis** for fast storage and **MongoDB** for persistent storage.
   - If a rule matches, the event and rule are stored in a separate collection along with the Agent identifier.
   - The service ensures that after the deletion or update of a rule, the corresponding documents in the collection remain valid and are accessible for reporting.

### Features

- **Event Validation**: The `Process` service validates events according to predefined rules.
- **Database**: Redis for caching and MongoDB for persistence.
- **Rule CRUD**: CRUD operations for defining rules based on event data.
- **API for Rules**:
   - An API that returns the occurrence times of a rule for each agent within a given timeframe (up to 1 day).
   - An API that returns a list of agents with their rule occurrence history, sorted by the count of occurrences from the beginning to the present.

### Swagger API Documentation

The API documentation for the service is available via Swagger at the following endpoint:

- **Swagger UI**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

You can use the Swagger interface to explore and test the API endpoints.

### Requirements

- **Node.js**: Ensure that Node.js is installed.
- **Redis**: Used for temporary storage of events.
- **MongoDB**: Used for persistent storage of events and rules.
