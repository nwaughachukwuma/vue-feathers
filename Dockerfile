FROM node:8.7

RUN apt-get update \
    && apt-get install -y nginx mongodb supervisor openssh-server

RUN mkdir /var/run/sshd
RUN echo 'root:root' | chpasswd
RUN sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config

RUN yarn global add nodemon babel-cli

COPY srv /app/srv
WORKDIR /app/srv
RUN yarn

COPY web /app/web
WORKDIR /app/web
RUN yarn

COPY nginx /etc/nginx

WORKDIR /app
VOLUME /data/db

CMD ["/usr/bin/supervisord"]

EXPOSE 80
