# Тестовое задание для вакансии backend разработчик в Helper 
> Задача: Описать методы  API в любом удобном тебе формате. Можно простым текстом, markdown, а можно и в Свагере.

# Стэк технологий
<ul>
  <li>NodeJS 16.20.2</li>
  <li>Express 4.18.2</li>
  <li>TypeScript 5.3.3</li>
  <li>SQLite3 5.1.7</li>
</ul>
<a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,typescript,sqlite" />
</a>

# Руководство запуска проекта:
## Порядок запуска:
1. Установка зависимостей:
```npm i```
2. Сборка проекта
```npm run build```
3. Запуск сервера
```npm run dev```

# Описание компонентов проекта:

- ```app.ts``` - основной файл приложения, запускает сервер Express.
- ```Database.ts``` - класс, который управляет всеми взаимодействиями с бд.
- ```jwtUtils.ts``` - утилита для работы с JWT.
- ```authMiddleware.ts``` - middleware для аутентификации пользователя.
- ```authRoutes.ts``` - роутер, связанный с аутентификацией пользователя.
- ```authController.ts``` - контроллер для обработки запросов аутентификации.
- ```accountRoutes.ts``` - роутер для управления аккаунтами пользователей.
- ```accountController.ts``` - контроллер для управления аккаунтами пользователей.

# Эндпоинты
## Регистрация
URL: ```/api/auth/register```

Method: ```POST```

Request:
```
{ 
    "name": string, 
    "email": string, 
    "password": string
}
```
Response:
```
{ 
    "success": boolean,
    "token": string,
    "account": {
        "email": string,
        "name": string
    }
}
```

## Вход
URL: ```/api/auth/login```

Method: ```POST```

Request: 
```
{ 
    "email": string,
    "password": string
}
```
Response:
```
{ 
    "success": boolean, 
    "token": string
    "account": {
        "email": string,
        "name": string,
        "avatarUrl": string, 
        "description": string,
        "coverUrl": string
    }
}
```
> token: Brearer + [token]

## Выход из системы
URL: ```/api/auth/logout```

Method: ```POST```

Request: ```Header с JWT Token```

Response:
```
{
    "success": boolean,
    "message": string
}
```
> token: Brearer + [token]

## Получение информации аккаунта
URL: ```/api/account```

Method: ```GET```

Request: ```Header с JWT Token```

Response:
```
{
    "success": boolean,
    "account": {
        "email": string,
        "name": string,
        "avatarUrl": string,
        "description": string,
        "coverUrl": string
    }
}
```
> token: Brearer + [token]

## Редактирование аккаунта
URL: ```/api/account```

Method: ```PATCH```

Request: ```Header с JWT Token```
```
{
    "name": string, 
    "profileUrl": string,
    "description": string
}
```

Response:
```
{
    "success": boolean,
    "account": {
        "email": string,
        "name": string,
        "description": string
    }
}
```
> token: Brearer + [token]

## Загрузка аватара
URL: ```/api/account/avatar/upload```

Method: ```POST```

Request: ```Header с JWT Token```
Response:
```
{
    "success": boolean,
    "message": string,
    "avatarUrl": string
}
```
> token: Brearer + [token]

> В "Body" нужно выбрать опцию "form-data". Создать ключ "avatar" и выберать тип "File", загрузить файл

## Удаление аватара
URL: ```/api/account/avatar/delete```

Method: ```DELETE```

Request: ```Header с JWT Token```

Response:
```
{
    "success": boolean,
    "message": string
}
```
> token: Brearer + [token]

## Загрузка заднего фона
URL: ```/api/account/cover/upload```

Method: ```POST```

Request: ```Header с JWT Token```

Response:
```
{
    "success": boolean,
    "message": string,
    "coverUrl": string
}
```
> token: Brearer + [token]

> В "Body" нужно выбрать опцию "form-data". Создать ключ "cover" и выберать тип "File", загрузить файл

## Удаление заднего фона
URL: ```/api/account/cover/delete```

Method: ```DELETE```

Request: ```Header с JWT Token```

Response:
```
{
    "success": boolean,
    "message": string
}
```
> token: Brearer + [token]

## Список аккаунтов
URL: ```/api/accounts/list```

Method: ```GET```

Request: ```Header с JWT Token```

Response: 
```
{
    "success": boolean,
    "accounts": [{ 
        "email": string,
        "name": string,
        "avatarUrl": string,
        "description": string
    }]
}
```
> token: Brearer + [token]
