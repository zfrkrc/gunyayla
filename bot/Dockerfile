FROM node:20-alpine
# Güvenlik: alpine paket upgrade (Trivy fixable)
RUN apk -U upgrade --no-cache
WORKDIR /app
COPY package.json ./
RUN npm install
COPY index.js /app/index.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]
