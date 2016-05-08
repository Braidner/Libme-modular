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

##TODO list
### Content service
- [ ] Доверстать форму загрузки
- [ ] Сделать рест сервис сохранения формы
- [ ] Сделать возвожность аплоада файлов

### Registration service
- [ ] Сверстать форму регистрации
- [ ] Сделать сервис создания пользователя
- [ ] Сверстать форму авторизации
- [ ] Сделать в андгуларе сервис авторизации и обновления токенов

### Torrent service
- [ ] Реализовать торрент севрис
- [ ] Реализовать нотификацию торрент-сервиса

### Convert service
- [ ] Сделать докер образ с установленным ffmpeg
- [ ] Сделать сервис конвертирующий видео файлы в стрименговые
