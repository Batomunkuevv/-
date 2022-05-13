<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
// $mail->isSMTP();
// $mail->Host = 'smtp.yandex.ru';
// $mail->SMTPAuth = true;
// $mail->Username = '';
// $mail->Password = '';
// $mail->SMTPSecure = 'ssl';
// $mail->Port = 465;
$mail->setFrom('kolxic@gmail.com', 'От пользователя');
// Кому отправить
$mail->addAddress('feedback@rackovica.ru');
// Тема
$mail->Subject = 'Данные c формы Racovica';

//Тело письма

$body = '<h1>Письмо</h1>';


if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Телефон:</strong>' . $_POST['phone'] . '</p>';
}

$mail->Body = $body;

// Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);