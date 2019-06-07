FROM node:10-alpine
WORKDIR /home/app

# Install build dependencies for node-gyp, which React uses to build the client.
RUN apk add --no-cache --virtual .gyp python make g++

# Run and install everything in production mode.
ENV NODE_ENV=production

# Set up the server dependencies
COPY package*.json ./
RUN npm install

# Set up the client dependencies
COPY client/package*.json client/
RUN npm run client-install

# Copy over, build, and clean up the client.
COPY client client
RUN npm run client-build
RUN rm -rf client/src client/public client/node_modules && apk del .gyp

# Copy over the server code.
COPY server server

# By default, start the server.
CMD ["npm", "start"]
