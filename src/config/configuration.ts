export default () => ({
  currencyExchangeApiKey: process.env.CURRENCY_EXCHANGE_API_KEY,
  database: {
    type: 'mysql',
    synchronize: false,
    host: process.env.MYSQLDB_HOST,
    port: process.env.MYSQLDB_PORT,
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
  },
});
