FROM ghcr.io/puppeteer/puppeteer:24.4.0

# 🧹 REMOVE the skip line to allow Puppeteer to download Chromium
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["node", "index.js"]
