<div class="container">
    <section class="lots">
        <h2>Все лоты в категории «<span><?= htmlspecialchars($category_name); ?></span>»</h2>
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
              <?= isset($value["expirationDate"]) ? get_time_params($value["expirationDate"])["expiration_mark"] : "" ?>">
                                <?= isset($value["expirationDate"]) ? get_time_params($value["expirationDate"])["hours_left"] : "" ?>
                                ч
                                <?= isset($value["expirationDate"]) ? get_time_params($value["expirationDate"])["minutes_left"] : "" ?>
                                мин
                            </div>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </section>
    <?php if ($pages_count > 1): ?>
        <ul class="pagination-list">
            <li class="pagination-item pagination-item-prev">
                <?php if ($cur_page > 1) : ?>
                    <a href="all-lots.php?category=<?= $category_id; ?>&page=<?= $cur_page - 1; ?>">Назад</a>
                <?php endif; ?>
            </li>
            <?php foreach ($pages as $page) : ?>
                <li class="pagination-item
      <?php if (intval($page) === intval($cur_page)) : ?>
      pagination-item-active
      <?php endif; ?>">
                    <a href="all-lots.php?category=<?= $category_id; ?>&page=<?= $page; ?>"><?= $page; ?></a>
                </li>
            <?php endforeach; ?>
            <li class="pagination-item pagination-item-next">
                <?php if ($cur_page < $pages_count) : ?>
                    <a href="all-lots.php?category=<?= $category_id; ?>&page=<?= $cur_page + 1; ?>">Вперед</a>
                <?php endif; ?>
            </li>
        </ul>
    <?php endif; ?>
</div>
