const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Usar el middleware cors
app.use(cors());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sanm1919.',
  database: 'cinecoquettenodejs2'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Manejar la solicitud de inicio de sesión
app.get('/login', (req, res) => {
    const dni = req.query.dni;
    const password = req.query.password;
  
    // Preparar la consulta SQL
    const sql = 'SELECT * FROM cliente WHERE DNI = ? AND Password = ?';
  
    // Ejecutar la consulta
    connection.query(sql, [dni, password], (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error en el servidor');
        return;
      }
  
      // Enviar los resultados como un objeto con la clave 'datos'
      res.json({datos:results });
    });
  });
  
  // Escuchar en el puerto 3000
  app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
  });
  

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
