# Express Backend

This is a simple Express backend server for handling data requests and saving data to your preferred database.

## Prerequisites

Before running this backend, ensure you have the following:

- Node.js installed on your machine
- `.env` file configured with the required environment variables (`PORT`, etc.)

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.

## Usage

To start the server, run:

```bash
npm start
```

The server will start listening on the specified port (default is 5000).

## Endpoints

### GET Data

- `/versions`: Retrieve versions data.
- `/psform/:sex`: Retrieve PS form data based on gender.
- `/apptext/:sex`: Retrieve application text data based on gender.
- `/inituserdata/:version`: Retrieve initial user data based on version.
- `/hotels`: Retrieve list of hotels.
- `/hotels-tutorial`: Retrieve hotel tutorial data.
- `/hotels-rev`: Retrieve hotel review data.

### Save Data

- `/psform`: Save PS form data.
- `/auctionbids`: Save auction bids data.
- `/visualpattern`: Save visual pattern data.
- `/userinfo`: Save user information.
- `/userlogtime`: Save user log time data.
- `/usergeneraldata`: Save user general data.
