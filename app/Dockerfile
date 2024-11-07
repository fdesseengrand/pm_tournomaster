# Build step
FROM node:21 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Production step
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/app/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
