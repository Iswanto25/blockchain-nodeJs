FROM node:22-alpine

# Instal dependensi sistem yang diperlukan
RUN apk add --no-cache \
    openssl \
    libstdc++ \
    bash \
    curl \
    ca-certificates \
    libc6-compat

# Set working directory
WORKDIR /app

# Salin hanya package.json dan package-lock.json terlebih dahulu untuk mengoptimalkan cache
COPY package*.json ./

# Install dependencies termasuk dev dependencies sekaligus
RUN npm install \
    && npm install @types/express --save-dev \
    && npm install @grpc/grpc-js express cors dotenv winston express-validator google-protobuf exceljs \
    && npm install @types/exceljs \
    && npm install -D typescript ts-node nodemon prisma @types/node @types/morgan @types/express @types/cors @types/dotenv @types/winston jest \
    && npm audit fix

# Salin file prisma dan jalankan prisma generate
COPY prisma ./prisma
RUN npx prisma generate

# Salin sisa aplikasi
COPY . .

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi dengan perintah yang sudah disiapkan
CMD ["npm", "run", "start:migrate"]
