# Use uma imagem base com Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm ci

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 5000

# Comando para rodar a aplicação
CMD node src/server.js
