# Тестовое задание для вакансии backend разработчик в Helper 
> Задача: Описать методы  API в любом удобном тебе формате. Можно простым текстом, markdown, а можно и в Свагере.


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
    "accessToken": string,
    "refreshToken": string,
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
    "accessToken": string
    "refreshToken": string
    "account": {
        "email": string,
        "name": string,
        "avatarUrl": string, 
        "description": string,
        "coverUrl": string
    }
}
```
## Выход из системы
URL: ```/api/auth/logout```

Method: ```POST```

Request: ```Header с JWT Token```

Response:
```
{
    "success": boolean,
}
```
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
        "description": string
        "coverUrl": string
    }
}
```
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
