FROM node:lts

COPY package.json .

RUN npm install --silent
RUN npm install -g --silent serve

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "build"]