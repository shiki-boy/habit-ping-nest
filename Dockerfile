###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN pnpm i

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node