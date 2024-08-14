import mssql from 'mssql';

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.SERVER,
  database: process.env.DB_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    }
}

async function getConnection() {
  try {
    const pool = await mssql.connect(sqlConfig);
    if (pool) {
      console.log('DB is connected');
    } 
    return pool;
  } catch (error) {
    console.log(error);
    
  }
}

export {getConnection, mssql}