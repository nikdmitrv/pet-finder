![Petfinder Logo](https://downloader.disk.yandex.ru/preview/cd76302508faff9a3e046a6f83034c53a923600ef4ee4914a23c02a881d69cbb/5e00f00d/Kcr1DKrPn6SBsxdLj7VUWgmw6NnbJdKK2wEXo6mA_jJxa8cuiwbhy7ZX9ZaRrGxQNPRIgS82xX_HoHepYKZRTw==?uid=0&filename=Ischeika+Project.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&tknv=v2&owner_uid=110882331&size=1440x789)
# Ищейка
Ищейка - это веб-приложение которое помогает найти потерянных животных.

Наш проект на heroku [http://dogfinderapp.herokuapp.com/](http://dogfinderapp.herokuapp.com/)

## Наша миссия
Каждый год в мире пропадает более 10 милионов домашних питомцев и только 23% из них удается найти свой дом.
Наш сервис призван помочь попавшим в такую непростую ситуацию людям быстро найти своих потервшихся любимцев, а небезразличным к судьбе потерянных питомцев помочь им найти своих хозяев.

## О приложении
Приложение представляет собой сервис позволяющий разместить объявления, о пропаже или находке питомца. Реализована возможность просмотра объявлений на карте с использованием Google Maps Api. При просмотре всех объявлений одной из категорий вы можете использовать фильтрацию по различным параметрам, таким как порода, пол, дата объявления. В личном кабинете пользователь может создавать новые объявления, а так-же он может редактировать и удалять уже существующие. При создании нового объвления пользователь может загрузить фотографию своего питомца с помощью технологии Multer. В приложении реализован алгоритм поиска совпадений потерянных и найденных животных, что дает пользователю возможность быстро найти подходящие объвления без необходимости делать это вручную.

## Локальный запуск
```
cd backend
npm install
npm start
```

```
cd frontend
npm install
npm start
```

## Наша команда
* [Мария Филимонова](https://github.com/MariaFili)
* [Денис Сергеев](https://github.com/hellohost)
* [Александр Куликов](https://github.com/GenerateX)
* [Никита Дмитриев](https://github.com/nikdmitrv)

## Технологии
* В качестве серверной состовляющией мы использовали Node.js и Express.
* Для хранения данных используется MongoDB + mongoose.
* А на стороне клиента, используется библиотека React с использование Redux.
