# Movie Search App

Застосунок для пошуку фільмів за назвою з використанням TMDB API. Проєкт побудований на `React`, `TypeScript` і `TanStack Query`, підтримує пагінацію результатів, сповіщення про помилки та модальне вікно з детальною інформацією про фільм.

## Демо

Онлайн-версія: https://04-react-query-kohl-psi.vercel.app/

## Можливості

- пошук фільмів за ключовим словом
- завантаження даних через TMDB API
- кешування та керування станом запитів через TanStack Query
- пагінація результатів пошуку
- модальне вікно з детальною інформацією про фільм
- сповіщення через `react-hot-toast`
- адаптивний інтерфейс на CSS Modules

## Технології

- React 19
- TypeScript
- Vite
- TanStack Query
- Axios
- React Hot Toast
- CSS Modules
- modern-normalize

## Структура проєкту

```text
src/
  components/
    App/
    ErrorMessage/
    Loader/
    MovieGrid/
    MovieModal/
    SearchBar/
  services/
    movieService.ts
  types/
    movie.ts
  main.tsx
  style.css
```

## Запуск проєкту

### 1. Встановлення залежностей

```bash
npm install
```

### 2. Налаштування змінних середовища

Створіть файл `.env.local` у корені проєкту:

```env
VITE_TMDB_TOKEN=your_tmdb_bearer_token
```

Як отримати токен TMDB:

1. Увійдіть в акаунт на https://www.themoviedb.org/
2. Відкрийте `Settings -> API`
3. Скопіюйте `Bearer Token`

### 3. Локальний запуск

```bash
npm run dev
```

За замовчуванням застосунок буде доступний за адресою `http://localhost:5173`.

## Доступні команди

```bash
npm run dev
npm run build
npm run preview
```

## Як влаштований застосунок

- `SearchBar` надсилає пошуковий запит
- `App` зберігає поточний запит, активну сторінку та вибраний фільм
- `movieService.ts` виконує запити до TMDB API через `axios`
- `TanStack Query` керує завантаженням, помилками та кешуванням даних
- `MovieGrid` відображає список знайдених фільмів
- `MovieModal` показує детальну інформацію про вибраний фільм

## API

У проєкті використовується такий endpoint:

```text
GET https://api.themoviedb.org/3/search/movie
```

Параметри запиту:

- `query` - рядок пошуку
- `page` - номер сторінки результатів
- `language` - мова відповіді
- `include_adult` - прапорець включення контенту для дорослих

Авторизація виконується через Bearer Token у заголовку `Authorization`.

## Примітки

- токен TMDB повинен зберігатися лише у змінних середовища
- стилізація компонентів реалізована через CSS Modules
- production-збірка створюється за допомогою Vite

## Ліцензія

Проєкт створений у навчальних цілях.
