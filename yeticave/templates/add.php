<form class="form form--add-lot container
  <?= isset($errors) ? "form--invalid" : "" ?>"
      action="../add.php" method="post"
      enctype="multipart/form-data">
    <h2>Добавление лота</h2>
    <div class="form__container-two">
        <div class="form__item <?= isset($errors["lot-name"]) ? "form__item--invalid" : "" ?>">
            <label for="lot-name">Наименование <sup>*</sup></label>
            <input id="lot-name" type="text" name="lot-name"
                   placeholder="Введите наименование лота"
                   value="<?= isset($lot["lot-name"]) ? htmlspecialchars($lot["lot-name"]) : "" ?>">
            <span class="form__error">
        <?= isset($errors["lot-name"]) ? htmlspecialchars($errors["lot-name"]) : "" ?>
      </span>
        </div>
        <div class="form__item <?= isset($errors["category"]) ? "form__item--invalid" : "" ?>">
            <label for="category">Категория <sup>*</sup></label>
            <select id="category" name="category">
                <option>Выберите категорию</option>
                <?php foreach ($categories as $value): ?>
                    <option <?= (isset($lot) and isset($value["title"])
                        and ($category_field === $value["title"])) ? "selected" : "" ?>>
                        <?= isset($value["title"]) ? htmlspecialchars($value["title"]) : "" ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <span class="form__error">
        <?= isset($errors["category"]) ? htmlspecialchars($errors["category"]) : "" ?>
      </span>
        </div>
    </div>
    <div class="form__item form__item--wide
    <?= isset($errors["message"]) ? "form__item--invalid" : "" ?>">
        <label for="message">Описание <sup>*</sup></label>
        <textarea id="message" name="message"
                  placeholder="Напишите описание лота"><?= isset($lot["message"]) ? htmlspecialchars($lot["message"]) : "" ?></textarea>
        <span class="form__error">
      <?= isset($errors["message"]) ? htmlspecialchars($errors["message"]) : "" ?>
    </span>
    </div>
    <div class="form__item form__item--file">
        <label>Изображение <sup>*</sup></label>
        <div class="form__input-file">
            <input class="visually-hidden" type="file" id="lot-img"
                   value="<?= isset($lot["lot-img"]) ? htmlspecialchars($lot["lot-img"]) : "" ?>"
                   name="lot-img">
            <label for="lot-img" <?= isset($errors["lot-img"]) ? "style='border: 1px dashed red'" : "" ?>>
                Добавить
            </label>
        </div>
        <span class="form__error" style="display: block">
      <?= isset($errors["lot-img"]) ? htmlspecialchars($errors["lot-img"]) : "" ?>
    </span>
    </div>
    <div class="form__container-three">
        <div class="form__item form__item--small
      <?= isset($errors["lot-rate"]) ? "form__item--invalid" : "" ?>">
            <label for="lot-rate">Начальная цена <sup>*</sup></label>
            <input id="lot-rate" type="text" name="lot-rate"
                   placeholder="0"
                   value="<?= isset($lot["lot-rate"]) ? htmlspecialchars($lot["lot-rate"]) : "" ?>">
            <span class="form__error">
        <?= isset($errors["lot-rate"]) ? htmlspecialchars($errors["lot-rate"]) : "" ?>
      </span>
        </div>
        <div class="form__item form__item--small
      <?= isset($errors["lot-step"]) ? "form__item--invalid" : "" ?>">
            <label for="lot-step">Шаг ставки <sup>*</sup></label>
            <input id="lot-step" type="text" name="lot-step"
                   placeholder="0"
                   value="<?= isset($lot["lot-rate"]) ? htmlspecialchars($lot["lot-step"]) : "" ?>">
            <span class="form__error">
        <?= isset($errors["lot-step"]) ? htmlspecialchars($errors["lot-step"]) : "" ?>
      </span>
        </div>
        <div class="form__item <?= isset($errors["lot-date"]) ? "form__item--invalid" : "" ?>">
            <label for="lot-date">Дата окончания торгов <sup>*</sup></label>
            <input class="form__input-date" id="lot-date" type="text"
                   name="lot-date" placeholder="Введите дату в формате ГГГГ-ММ-ДД"
                   value="<?= isset($lot["lot-date"]) ? htmlspecialchars($lot["lot-date"]) : "" ?>">
            <span class="form__error">
        <?= isset($errors["lot-date"]) ? htmlspecialchars($errors["lot-date"]) : "" ?>
      </span>
        </div>
    </div>
    <span class="form__error form__error--bottom">Пожалуйста, исправьте ошибки в форме.</span>
    <button type="submit" class="button">Добавить лот</button>
</form>
