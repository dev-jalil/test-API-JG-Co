### STAGE 1: Build ###
FROM node:12.7-alpine AS build

#ARG REACT_APP_BASE_URL
#ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL


WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
#RUN echo "$REACT_APP_BASE_URL"

#RUN npm run build
RUN npm run-script build


### STAGE 2: Run ###
FROM nginx:1.17.5
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'