import mssql from 'mssql';

const sqlConfig = {
  user: "Anderson",
  password: "administrador",
  server: "ANDERSON-PC",
  database: "T_Publico",
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