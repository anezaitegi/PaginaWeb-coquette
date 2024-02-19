<?php

header("Access-Control-Allow-Origin: *");
$servername = 'localhost';
$username = 'root';
$password = 'Sanm1919.';
$database = 'cinecoquettenodejs2';

// para ingresar al servidor
// $username = 'test'; // usuario del servidor
// $password = 'Yta12345678*'; // 
// $database = 'coquette';

// Crear conexión
$conn = mysqli_connect($servername, $username, $password, $database);

// Verificar conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

echo "Conexión exitosa";

// obtener dni y password del usuario desde los parametros

$dni = $_GET['dni'];
$password = $_GET['password'];

// preparar la consulta en mysql

$stmt = $conn->prepare("SELECT * FROM cliente WHERE DNI = ? AND Password = ?");
$stmt->bind_param("ss", $dni, $password);

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
