const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
module.exports = {
  // mongoConnectionString: 'mongodb://localhost:27017/testDb',
  // mongoConnectionString:
  "mongodb+srv://admin:chabaa20@cluster0-pqzf1.mongodb.net/travel?retryWrites=true&w=majority",
  // mongoConnectionString: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.8snuq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  salt: 3,
  privateKey: "navi",
};
