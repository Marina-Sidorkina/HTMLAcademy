<form class="form container" action="" method="post"
      autocomplete="off" enctype="multipart/form-data">
    <h2>Регистрация нового аккаунта</h2>
    <div class="form__item <?= isset($errors["email"]) ? "form__item--invalid" : "" ?>">
        <label for="email">E-mail <sup>*</sup></label>
        <input id="email" type="text" name="email"
               placeholder="Введите e-mail"
               value="<?= isset($form["email"]) ? htmlspecialchars($form["email"]) : "" ?>">
        <span class="form__error">
      <?= isset($errors["email"]) ? htmlspecialchars($errors["email"]) : "" ?>
    </span>
    </div>
    <div class="form__item <?= isset($errors["password"]) ? "form__item--invalid" : "" ?>">
        <label for="password">Пароль <sup>*</sup></label>
        <input id="password" type="password" name="password"
               placeholder="Введите пароль"
               value="<?= isset($form["password"]) ? htmlspecialchars($form["password"]) : "" ?>">
        <span class="form__error">
      <?= isset($errors["password"]) ? htmlspecialchars($errors["password"]) : "" ?>
    </span>
    </div>
    <div class="form__item <?= isset($errors["name"]) ? "form__item--invalid" : "" ?>">
        <label for="name">Имя <sup>*</sup></label>
        <input id="name" type="text" name="name"
               placeholder="Введите имя"
               value="<?= isset($form["name"]) ? htmlspecialchars($form["name"]) : "" ?>">
        <span class="form__error">
      <?= isset($errors["name"]) ? htmlspecialchars($errors["name"]) : "" ?>
    </span>
    </div>
    <div class="form__item <?= isset($errors["message"]) ? "form__item--invalid" : "" ?>">
        <label for="message">Контактные данные <sup>*</sup></label>
        <textarea id="message" name="message"
                  placeholder="Напишите как с вами связаться"><?= isset($form["message"]) ? htmlspecialchars($form["message"]) : "" ?></textarea>
        <span class="form__error">
      <?= isset($errors["message"]) ? htmlspecialchars($errors["message"]) : "" ?>
    </span>
    </div>
    <div class="form__item form__item--file">
        <label>Аватар <sup>*</sup></label>
        <div class="form__input-file">
            <input class="visually-hidden" type="file" id="user-img"
                   value="<?= isset($form["user-img"]) ? htmlspecialchars($form["user-img"]) : "" ?>"
                   name="user-img">
            <label for="user-img" <?= isset($errors["user-img"]) ? "style='border: 1px dashed red'" : "" ?>>
                Добавить
            </label>
        </div>
        <span class="form__error" style="display: block">
      <?= isset($errors["user-img"]) ? htmlspecialchars($errors["user-img"]) : "" ?>
    </span>
    </div>
    <span class="form__error form__error--bottom">Пожалуйста, исправьте ошибки в форме.</span>
    <button type="submit" class="button">Зарегистрироваться</button>
    <a class="text-link" href="login.php">Уже есть аккаунт</a>
</form>
