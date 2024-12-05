FROM node:latest
WORKDIR /app
COPY . .
RUN npm install -g pnpm
COPY package*.json ./
RUN pnpm install
EXPOSE 3002
CMD ["pnpm", "run", "dev"]