<h1>Поздравляем с победой!</h1>
<p>Здравствуйте,
    <?= isset($data["winner_name"]) ? htmlspecialchars($data["winner_name"]) : "" ?>!</p>
<p>Ваша ставка для лота
    <a href="http://yeti/lot.php?lot_id=<?= isset($data["lot_id"]) ?
        htmlspecialchars($data["lot_id"]) : "" ?>">
        <?= isset($data["lot_title"]) ? htmlspecialchars($data["lot_title"]) : "" ?>
    </a>
    победила.
</p>
<p>
    Перейдите по ссылке
    <a href="http://yeti/my-bets.php">мои ставки</a>,
    чтобы связаться с автором объявления...
</p>
<small>Интернет Аукцион "YetiCave"</small>
