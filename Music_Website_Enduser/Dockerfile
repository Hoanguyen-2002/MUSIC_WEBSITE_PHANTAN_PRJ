FROM node:18.13.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run dev --host

EXPOSE 3000

CMD ["npm", "run", "dev"]