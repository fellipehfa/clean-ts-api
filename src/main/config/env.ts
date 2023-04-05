export default {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  SERVER_HOST: process.env.SERVER_HOST || 'http://localhost',
  SERVER_PORT: process.env.MONGO_PORT || 5050,
  JWT_SECRET: process.env.JWT_SECRET || 'as@42rs0E'
}
