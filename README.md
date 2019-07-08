# WASTE4THINK NGSI CONNECTOR API
API for reading csv file from pilot site users and sending it to Orion context broker.

# Installation
1. Download the repository.
2. npm install
3. Change config.js for aditional settings
4. sudo node server

# Software to use
1. Nodejs/Express
2. Fiware Orion Context Broker

# Docker
1. For docker installation https://docs.docker.com/install/#desktop
2. Download docker image using "docker pull waste4thik/ngsi-connector".
3. Run the downloaded docker image: "docker run -p 3001:3001 -d waste4thik/ngsi-connector".
4. U can use also docker-compose see example in extras/docker/ocb_connector.
5. In case u want to change or deploy app on docker using your own setting edit/change dockerfile provided in extras/docker/ocb_connector of project.

* Most used docker commands
To see images: docker images.
To see containers: docker containers.
In case u need to stop images/containers use docker stop [image/container name or ID].
To build an image with Dockerfile: docker build -t csvmodule .

# Dependencies
1. Running Fiware Orion context broker URL.
2. Settings for that are in config.js.
