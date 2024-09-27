# 🛒 Meta-Shop: Интернет-магазин фермерских продуктов 🌿

![GitHub repo size](https://img.shields.io/github/repo-size/Max7774/Meta-shop)
![GitHub stars](https://img.shields.io/github/stars/Max7774/Meta-shop?style=social)
![GitHub forks](https://img.shields.io/github/forks/Max7774/Meta-shop?style=social)
![GitHub license](https://img.shields.io/github/license/Max7774/Meta-shop)

Добро пожаловать в **Meta-Shop** — современный интернет-магазин, предлагающий свежие и натуральные фермерские продукты напрямую от производителей к вашему столу! 🥕🍎🥛

- [Ссылка на проект](https://i-forvard.kz)

## 📖 О проекте

**Meta-Shop** — это платформа, созданная для соединения потребителей с местными фермерами и производителями натуральных продуктов. Мы верим в качество, свежесть и пользу натуральных продуктов, поэтому наша цель — сделать их доступными для каждого.

## 🚀 Функционал

- 🔍 **Поиск и фильтрация товаров**: Легко находите нужные продукты с помощью удобного поиска и фильтров.
- 🛒 **Корзина и оформление заказа**: Добавляйте товары в корзину и оформляйте заказ в несколько кликов.
- 👤 **Личный кабинет**: Управляйте своими данными, адресами доставки и историей заказов.
- 📱 **Адаптивный дизайн**: Пользуйтесь сайтом с любого устройства — компьютер, планшет или смартфон.

## 📷 Скриншоты

<!-- Замените ссылки на скриншоты вашего проекта -->

![Главная страница](https://i-forvard.kz/images/main_page.png)
![Карточка товара](https://i-forvard.kz/images/product_page.png)

## 🛠 Технологии

- **Frontend**:
  - React.js
  - Vite
  - Redux Toolkit
  - SCSS / CSS Modules
- **Backend**:
  - Node.js
  - NestJS
  - PostgreSQL
  - Prisma ORM
- **DevOps**:
  - Docker & Docker Compose
  - Nginx
  - GitHub Actions

## 💻 Установка и запуск

### Предварительные требования

- Node.js >= 14.x
- Docker и Docker Compose
- Git

### Шаги установки

1. **Клонируйте репозиторий**

   ```bash
   git clone https://github.com/Max7774/Meta-shop.git

   ```

2. **Настройте переменные окружения**

Backend: В директории /backend создайте файл .env и укажите необходимые переменные:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
JWT_SECRET="your_jwt_secret"
Frontend: В директории /frontend создайте файл .env и укажите URL сервера:

VITE_SERVER_URL="http://localhost:3000/api"
```

3. **Запустите приложение**

Перейдите в директорию /backend и запустите Docker Compose:

```bash
cd backend
docker-compose up -d --build
```

Перейдите в директорию /frontend и установите зависимости:

```bash
cd ../frontend
yarn
```

Запустите приложение:

```bash
yarn dev
```

Откройте приложение в браузере

Перейдите по адресу: http://localhost:4200

## 🤝 Содействие

Мы приветствуем вклад сообщества! Если вы хотите помочь в развитии проекта, пожалуйста, следуйте следующим шагам:

Форкните репозиторий
Создайте ветку для вашей функции (feature) или исправления (bugfix) (git checkout -b feature/YourFeature)
Сделайте коммит ваших изменений (git commit -m 'Добавлена новая функция')
Запушьте вашу ветку (git push origin feature/YourFeature)
Откройте Pull Request

## 📞 Контакты

Если у вас есть вопросы или предложения, свяжитесь с нами:

# Email: agrozakupkz@gmail.com

Спасибо, что посетили Meta-Shop! Мы надеемся, что вам понравится наш проект так же, как и нам понравилось его создавать. Желаем приятных покупок! 🌟
