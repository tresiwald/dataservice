FROM node:7.8
# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p ~/.ssh
RUN ssh-keyscan -H gitlab.enterpriselab.ch >> ~/.ssh/known_hosts
WORKDIR /usr/src/app
# Install app dependencies
COPY . /usr/src/app
RUN chmod +x keys/setup-ssh.sh
RUN sh keys/setup-ssh.sh
RUN npm -v
RUN npm install
RUN npm run grunt
RUN npm update
EXPOSE 3004
CMD [ "npm", "start" ]
