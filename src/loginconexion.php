<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$servername = 'localhost';
// para ingresar al servidor
$username = 'test'; // usuario del servidor
$password = 'Yta12345678*'; 
$database = 'coquettecines';

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error());
}

// obtener dni y password del usuario desde los parametros

$dni = $_GET['dni'];
$encryptedPassword = $_GET['password'];

// preparar la consulta en mysql

$stmt = $conn->prepare("SELECT * FROM cliente WHERE DNI = ? AND Password = ?");
$stmt->bind_param("ss", $dni, $encryptedPassword);

// ejecutar la consulta en mysql

$stmt->execute();

// obtener los resultados

$result = $stmt->get_result();

// crear un array con los datos

$data = array();

// añadir cada fila de los resultados al array

while ($row = $result->fetch_assoc()){
  $data[] = $row;
}

// convertir el array a json

$json = json_encode($data);

// imprimir el json

echo $json;

// cerrar conexiones

$stmt->close();
$conn->close();

?>
