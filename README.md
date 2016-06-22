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
 or
 docker-compose up -d --force-recreate
```
open http://localhost/ or http://docker.local/

##TODO list
### BUILD
- [ ] Add docker building stage to maven with com.spotify:docker-maven-plugin

### Content service
- [ ] Finish create content form
- [x] Rest service for saving content data
- [x] Add file upload

### Registration service
- [ ] Create registration form
- [ ] Create user creation service
- [x] Create login form
- [x] Create oauth2 service

### Torrent service
- [x] Create torrent service
- [ ] Add notify system about torrents

### Convert service
- [ ] Create docker image with ffmpeg
- [ ] Create convert service from .avi files to .ts files
