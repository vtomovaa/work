<?php
header('Content-Type: application/json');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode([
    'success' => false,
    'error' => 'Invalid request method. Only POST requests are allowed.'
  ]);
  exit;
}

// Get raw POST data
$input = file_get_contents('php://input');
$client_data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
  http_response_code(400);
  echo json_encode([
    'success' => false,
    'error' => 'Invalid JSON in request body.'
  ]);
  exit;
}

// Hardcode trackbox data
$data = [
  "userip" => $_SERVER['REMOTE_ADDR'],
  "ai" => 2958352,
  "gi" => 549,
  "ci" => 1,
  "MPC_11" => 1,
  "MPC_12" => 4,
  "ad" => 306748,
  "so" => 'Trading',
];

// Merge client data with trackbox data
// $client_data is comign from the frontend form submission 
$data = array_merge($data, $client_data);

// Prepare cURL request to external API
$ch = curl_init('https://it.internovustrackbox.com/api/signup/procform');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'x-trackbox-username: Vaniana',
  'x-trackbox-password: Vaniana2025@',
  'x-api-key: 2643889w34df345676ssdas323tgc738',
  'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute cURL request
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
  http_response_code(502);
  echo json_encode([
    'success' => false,
    'error' => curl_error($ch)
  ]);
} else {
  http_response_code($httpcode);
  echo $response;
}

curl_close($ch);
