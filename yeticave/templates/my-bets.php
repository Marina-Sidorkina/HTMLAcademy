<section class="rates container">
    <h2>Мои ставки</h2>
    <table class="rates__list">
        <?php foreach ($user_bets as $value): ?>
            <tr class="rates__item
    <?= (isset($value["expired_at"]) and isset($value["winner_id"])
                and check_bet_date_and_winner($value["expired_at"], $value["winner_id"])) ?
                "rates__item--win" : "" ?>">
                <td class="rates__info">
                    <div class="rates__img">
                        <img src="<?= isset($value["url"]) ? htmlspecialchars($value["url"]) : "" ?>" width="54"
                             height="40" alt="Сноуборд">
                    </div>
                    <div>
                        <h3 class="rates__title">
                            <a href="lot.php?lot_id=<?= htmlspecialchars($value["lot_id"]); ?>">
                                <?= isset($value["lot_title"]) ? htmlspecialchars($value["lot_title"]) : "" ?>
                            </a>
                        </h3>
                        <?php if (isset($value["expired_at"]) and isset($value["winner_id"])
                            and check_bet_date_and_winner($value["expired_at"], $value["winner_id"])) : ?>
                            <p><?= isset($value["contacts"]) ? htmlspecialchars($value["contacts"]) : "" ?></p>
                        <?php endif; ?>
                    </div>
                </td>
                <td class="rates__category">
                    <?= isset($value["category"]) ? htmlspecialchars($value["category"]) : "" ?>
                </td>
                <td class="rates__timer">
                    <?php if (isset($value["expired_at"]) and isset($value["winner_id"])
                        and strtotime(htmlspecialchars($value["expired_at"])) > time()
                        and htmlspecialchars($value["winner_id"]) !== $_SESSION["user"]["id"]) : ?>
                        <div
                            class="timer <?= get_time_params(htmlspecialchars($value["expired_at"]))["expiration_mark"]; ?>">
                            <?= get_time_params(htmlspecialchars($value["expired_at"]))["hours_left"]; ?> :
                            <?= get_time_params(htmlspecialchars($value["expired_at"]))["minutes_left"]; ?> :
                            <?= get_time_params(htmlspecialchars($value["expired_at"]))["seconds_left"]; ?>
                        </div>
                    <?php elseif (isset($value["expired_at"]) and isset($value["winner_id"])
                        and check_bet_date_and_winner($value["expired_at"], $value["winner_id"])) : ?>
                        <div class="timer timer--win">
                            Ставка выиграла
                        </div>
                    <?php else : ?>
                        <div class="timer timer--end">
                            Торги окончены
                        </div>
                    <?php endif; ?>
                </td>
                <td class="rates__price">
                    <?= isset($value["price"]) ? format_price($value["price"]) : "" ?> р
                </td>
                <td class="rates__time">
                    <?= isset($value["bet_date"]) ? get_formatted_time(htmlspecialchars($value["bet_date"])) : "" ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</section>
