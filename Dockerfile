FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc .npmrc
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3011
CMD ["yarn", "prd"]
