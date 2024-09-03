# Usando uma imagem base do Node.js
FROM node:20

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código para o contêiner
COPY . .

# Copiando o script de espera para o contêiner
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Rodando as migrations e iniciando a aplicação
CMD ["wait-for-db.sh", "npm", "start"]
