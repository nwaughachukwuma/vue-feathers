FROM node

RUN apt-get update \
    && apt-get install -y nginx mongodb supervisor openssh-server markdown redis-server

RUN mkdir /var/run/sshd

RUN yarn global add nodemon babel-cli feathers-cli

COPY srv/package.json /app/srv/package.json
WORKDIR /app/srv
RUN yarn

COPY web/package.json /app/web/package.json
WORKDIR /app/web
RUN yarn

COPY nginx /etc/nginx

WORKDIR /app
RUN mkdir -p /data/db /app/readme
COPY init-db.sh init-db.js fermat.txt /app/
RUN ./init-db.sh

CMD ["/bin/sh", "-c", "supervisord -c /app/supervisord.conf"]

EXPOSE 80 22

COPY . /app

RUN markdown README.md > /app/readme/index.html
COPY images /app/readme/images

RUN useradd -ms /bin/bash user

ENV BABEL_DISABLE_CACHE=1
