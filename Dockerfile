FROM node:16
WORKDIR /code
COPY . .
RUN npm install
CMD [ "npm", "run", "start"]

