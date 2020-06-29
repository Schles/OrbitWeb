FROM node:13

RUN apt-get update

RUN apt-get install -y git ssh

WORKDIR /home/node

ADD id_rsa /root/.ssh/id_rsa

RUN touch /root/.ssh/known_hosts



# Add github key

RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN git clone git@github.com:Schles/OrbitWeb.git

RUN npm install -g gulp gulp-typescript

WORKDIR /home/node/OrbitWeb/shared

RUN npm install

WORKDIR /home/node/OrbitWeb/server

RUN npm install

RUN gulp build

#49160 nach außen
EXPOSE 8000

CMD [ "node", "dist/server/src/index.js"]




