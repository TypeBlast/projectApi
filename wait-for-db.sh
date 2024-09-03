#!/bin/sh
set -e

# Espera até o banco de dados estar disponível
while ! mysqladmin ping -h"$DATABASE_HOST" --silent; do
  echo "Aguardando o banco de dados ficar disponível..."
  sleep 1
done

# Executa as migrations
npx sequelize-cli db:migrate

# Inicia a aplicação
exec "$@"
