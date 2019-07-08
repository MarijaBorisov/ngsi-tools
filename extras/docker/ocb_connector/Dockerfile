FROM ubuntu:14.04

LABEL ENG R&D Team

WORKDIR /opt

# Install Ubuntu dependencies
RUN sudo apt-get update && \
	sudo apt-get install curl git build-essential -y

# Install PPA
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

# Install nodejs
RUN sudo apt-get update && \
	sudo apt-get install nodejs -y

# Update npm
RUN sudo npm cache clean -f && \
	sudo npm install -g n && \
	sudo n stable

# Download latest version of the code and install npm dependencies
RUN git clone https://github.com/MarijaBorisov/ngsi-tools.git && \
	cd ngsi-tools && \
	npm install

# Change Workdir
WORKDIR /opt/ngsi-tools

CMD ["sudo", "npm", "start"]