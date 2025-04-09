FROM node:18-alpine 

RUN apk update && apk add --no-cache \
    ca-certificates  \ 
    bash \
    curl \
    vim \
    nodejs \
    npm

WORKDIR /app  

COPY package*.json .

RUN npm install --save-dev nodemon
RUN npm install reload

COPY . .


EXPOSE 3001

CMD ["npx", "nodemon", "src/index.js"]



