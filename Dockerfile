FROM node:18
WORKDIR /app
COPY package.json . 
RUN npm i
COPY . .
EXPOSE 5175 
CMD ["npm", "run", "dev"]