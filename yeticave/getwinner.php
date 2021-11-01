<?php
require_once "vendor/autoload.php";
require_once "helpers.php";
require_once "mysql/requests.php";

$data = get_winner_data($link) ?? [];

if (count($data)) {
    $transport = new Swift_SmtpTransport("phpdemo.ru", 25);
    $transport->setUsername("keks@phpdemo.ru");
    $transport->setPassword("htmlacademy");

    $mailer = new Swift_Mailer($transport);
    $logger = new Swift_Plugins_Loggers_ArrayLogger();
    $mailer->registerPlugin(new Swift_Plugins_LoggerPlugin($logger));

    $message = new Swift_Message();
    $message->setSubject("Ваша ставка победила");
    $message->setFrom(["keks@phpdemo.ru" => "YetiCave"]);

    foreach ($data as $item) {
        set_winner($link, $item["winner_id"], $item["lot_id"]);
        $recipient[$item["winner_email"]] = $item["winner_name"];
        $message->setBcc($recipient);
        $msg_content = include_template("email.php", ["data" => $item]);
        $message->setBody($msg_content, "text/html");
        $mailer->send($message);
    }
}
