FROM node:20

WORKDIR /srv/board_fe
COPY ./ /srv/board_fe
RUN npm install

EXPOSE 5173

CMD ["yarn", "dev"]