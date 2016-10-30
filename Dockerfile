FROM node:5.0.0

EXPOSE 4444
ENV PORT 4444

ADD . /srv/notes
WORKDIR /srv/notes

RUN npm install

RUN alias npm-exec='PATH=$(npm bin):$PATH'

CMD ["npm", "run", "dev"]