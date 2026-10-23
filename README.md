# Baginy API

**Live:** [baginy.kr](https://baginy.kr) · **Frontend:** [baginy-react](https://github.com/gaspiralli97/baginy-react)

Backend for [baginy.kr](https://baginy.kr), a luggage and travel-bag store. Express and MongoDB, with a
server-rendered admin panel and a Socket.IO channel for live chat.

<img src="docs/screenshots/storefront.jpg" alt="The Baginy storefront this API serves" width="100%" />

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express |
| Database | MongoDB + Mongoose |
| Auth | JWT for the API, express-session for the admin panel |
| Real-time | Socket.IO |
| Views | EJS (admin panel) |
| Uploads | Multer |
| Process | PM2 |

## Data model

| Collection | Holds |
|---|---|
| `Member` | Shoppers and admins, with bcrypt-hashed passwords |
| `Product` | Items: collection, size, colour, bundle, stock count, status |
| `Order` | An order and its lifecycle state |
| `OrderItem` | Line items, kept separate so quantities survive price changes |
| `View` | Product view counts, one row per member per product |

Products are typed by collection (travel, sport, business, special), size
(20 or 28 inch), colour, and whether they are sold singly or as a set.

## Getting Started

```bash
git clone https://github.com/gaspiralli97/baginy.git
cd baginy
npm install
cp .env.example .env
npm run start:dev
```

Needs a MongoDB instance. Sessions are stored in the same database through
`connect-mongodb-session`, so no separate session store is required.

## Scripts

| Command | What it does |
|---|---|
| `npm run start:dev` | Development server with reload |
| `npm run build` | TypeScript build |
| `npm run start:prod` | Build, then run under PM2 |

## Project Layout

```
src/
  controllers/  route handlers, split by resource
  models/       business logic over the schemas
  schema/       Mongoose schemas
  libs/
    enums/      shared enums
    types/      request and response types
  views/        EJS templates for the admin panel
  public/       static assets and uploads
```
