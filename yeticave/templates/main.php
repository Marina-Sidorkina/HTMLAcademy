<section class="promo">
    <h2 class="promo__title">Нужен стафф для катки?</h2>
    <p class="promo__text">
        На нашем интернет-аукционе ты найдёшь самое эксклюзивное
        сноубордическое и горнолыжное снаряжение.
    </p>
    <ul class="promo__list">
        <?php foreach ($categories as $value): ?>
            <li class="promo__item promo__item--<?= isset($value["char_code"]) ?
                htmlspecialchars($value["char_code"]) : "" ?>">
                <a class="promo__link"
                   href="all-lots.php?category=<?= isset($value["id"]) ? htmlspecialchars($value["id"]) : "" ?>">
                    <?= isset($value["title"]) ? htmlspecialchars($value["title"]) : "" ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</section>
<section class="lots">
    <div class="lots__header">
        <h2>Открытые лоты</h2>
    </div>
    <ul class="lots__list">
        <?php foreach ($lots as $value): ?>
            <li class="lots__item lot">
                <div class="lot__image">
                    <img src="<?= isset($value["url"]) ? htmlspecialchars($value["url"]) : "" ?>" width="350"
                         height="260" alt="">
                </div>
                <div class="lot__info">
        <span class="lot__category">
          <?= isset($value["category"]) ? htmlspecialchars($value["category"]) : "" ?>
        </span>
                    <h3 class="lot__title">
                        <a class="text-link"
                           href="lot.php?lot_id=<?= isset($value["id"]) ? htmlspecialchars($value["id"]) : "" ?>">
                            <?= isset($value["title"]) ? htmlspecialchars($value["title"]) : "" ?>
                        </a>
                    </h3>
                    <div class="lot__state">
                        <div class="lot__rate">
            <span class="lot__amount">
              <?= isset($value["id"]) ? get_lot_amount_block_text($value["id"]) : "" ?>
            </span>
                            <span class="lot__cost">
              <?= isset($value["price"]) ? htmlspecialchars(format_price($value["price"])) : "" ?><b class='rub'>р</b>
            </span>
                        </div>
                        <div class="lot__timer timer
            <?= isset($value["expirationDate"]) ?
                            get_time_params(htmlspecialchars($value["expirationDate"]))["expiration_mark"] : "" ?>">
                            <?= isset($value["expirationDate"]) ?
                                get_time_params(htmlspecialchars($value["expirationDate"]))["hours_left"] : "" ?> ч
                            <?= isset($value["expirationDate"]) ?
                                get_time_params(htmlspecialchars($value["expirationDate"]))["minutes_left"] : "" ?> мин
                        </div>
                    </div>
                </div>
            </li>
        <?php endforeach; ?>
    </ul>
</section>
