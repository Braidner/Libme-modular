# Libme-modular

[![Build Status](https://travis-ci.org/Braidner/Libme-modular.svg?branch=master)](https://travis-ci.org/Braidner/Libme-modular)

## Setup
Add path variables
```
CONFIG_SERVICE_PASSWORD
CONTENT_SERVICE_PASSWORD
```

And path variables for testing
```
DEBUG_HOSTNAME	with value localhost
```

Packaging maven with
```
 mvn package
```
Then start docker compose with
```
 docker-compose up -d --rebuild
```
open http://localhost/ or http://docker.local/

#TODO list
## Upload content
1. Доверстать форму загрузки
1. Сделать рест сервис сохранения формы
1. Сделать возвожность аплоада файлов
## Registration
1. Сверстать форму регистрации
1. Сделать сервис создания пользователя
1. Сверстать форму авторизации
1. Сделать в андгуларе сервис авторизации и обновления токенов
## Torrent service
1. Реализовать торрент севрис
1. Реализовать нотификацию торрент-сервиса
## Convert service
1. Сделать докер образ с установленным ffmpeg
1. Сделать сервис конвертирующий видео файлы в стрименговые