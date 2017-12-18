FROM node:8.7

RUN apt-get update \
    && apt-get install -y nginx mongodb supervisor openssh-server

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
RUN mkdir -p /data/db
COPY init-db.sh init-db.js fermat.txt /app/
RUN ./init-db.sh

CMD ["/usr/bin/supervisord"]

EXPOSE 80 22

COPY . /app

RUN useradd -ms /bin/bash user
RUN echo 'user:password' | chpasswd
RUN chown user:user -R srv/src web/src
RUN chmod go+w -R srv/src web/src

ENV BABEL_DISABLE_CACHE=1
