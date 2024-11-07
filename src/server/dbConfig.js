// server/dbConfig.js
export const dbConfig = {
  user: process.env.DB_USER || "system",
  password: process.env.DB_PASSWORD || "oracle",
  connectString: process.env.DB_CONNECT_STRING || "localhost:1521/xe"
};


