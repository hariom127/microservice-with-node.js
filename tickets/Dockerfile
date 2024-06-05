FROM node:alpine

WORKDIR /app
COPY package.json .
#npm install run only production env using --only-prod flag
RUN npm install --only-prod
COPY . .
 
 CMD ["npm", "start"]
