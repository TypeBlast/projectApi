Aqui está uma versão aprimorada do seu README, considerando os pontos que discutimos e adicionando mais detalhes:

---

# PetExpress API 🐾🚀

> Uma API RESTful para gerenciamento de um sistema de pet shop, com foco em operações de CRUD (Criar, Ler, Atualizar e Deletar), gerenciamento de estoque, agendamentos, carrinho de compras e pagamentos. Utilizando Node.js, Sequelize e Express, com a arquitetura modular inspirada no padrão **DRY** ('Don't Repeat Yourself'), semelhante ao framework **NestJS**.

## 🔥 Funcionalidades

- **Gerenciamento de Pets**: Cadastre, edite e remova pets, com validações de limite de cadastro (até 15 pets) e dados únicos por pet.
- **Gerenciamento de Produtos**: Cadastro, atualização e exclusão de produtos, organizados por categorias e espécies.
- **Carrinho de Compras e Pagamentos**: Adicione e remova produtos no carrinho, com cálculo automático do total e redução de estoque em tempo real.
- **Pedidos e Pagamentos**: Transformação de carrinhos em pedidos após a confirmação de pagamento fictício (aprovado automaticamente).
- **Filtros Avançados**: Filtragem de produtos por categorias, espécies e ordenação de preços.
- **Endereços e Usuários**: Limite de 3 endereços por usuário, sem duplicidade de endereços.
- **Autenticação JWT**: Utilização de tokens JWT para autenticação e autorização em endpoints.
- **Integração com Firebase e Google**: Login social com Google, sincronizado com a geração de tokens JWT.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **Express**: Framework para criação de APIs robustas e escaláveis.
- **Sequelize**: ORM para modelagem de banco de dados e manipulação de dados.
- **JWT (JSON Web Tokens)**: Implementação de autenticação e autorização segura.
- **Firebase**: Login social via Google, integrado à geração de tokens JWT.
- **MySQL/PostgreSQL**: Banco de dados relacional para armazenamento de informações.

## 🎨 Arquitetura Modular

A PetExpress API adota uma arquitetura modular seguindo o padrão **DRY**, inspirado no NestJS, proporcionando alta escalabilidade e separação de responsabilidades:

- **Controllers**: Recebem requisições e delegam tarefas aos serviços.
- **Services**: Contêm a lógica de negócios.
- **Modules**: Contêm todos os métodos por endpoints que vem diretamente das controllers.
- **Entities**: Definem as entidades e suas relações no banco de dados.
- **Middlewares**: Funções intermediárias para tratamento de autenticação (JWT) e validações.

## 🛡️ Segurança

- **Autenticação JWT**: Implementada em todos os endpoints que requerem autenticação, garantindo que apenas usuários autorizados tenham acesso.
- **Validações Personalizadas**: Limites e regras como a criação de até 3 endereços e 15 pets por usuário, garantindo integridade e controle do sistema.


## 📂 Endpoints Principais

### **Autenticação**
- **POST /auth/login**: Realiza o login do usuário.

### **Usuários**
- **POST /user**: Cria um novo usuário.
- **GET /user**: Retorna todos os usuários.
- **GET /user/:id**: Retorna um usuário específico pelo ID.
- **GET /user/email**: Busca um usuário pelo email.
- **GET /user/adresses/:id**: Retorna um usuário pelo ID com seus endereços relacionados.
- **PUT /user/:id**: Atualiza um usuário pelo ID.
- **DELETE /user/:id**: Deleta um usuário pelo ID.
- **GET /user/pets/:id**: Retorna um usuário com seus pets e agendamentos relacionados.

### **Endereços**
- **POST /addresses**: Cria um novo endereço.
- **GET /addresses**: Retorna todos os endereços do usuário.
- **GET /addresses/:id**: Retorna um endereço específico.
- **PUT /addresses/:id**: Atualiza um endereço.
- **DELETE /addresses/:id**: Deleta um endereço.

### **Agendamentos**
- **POST /appointments**: Cria um novo agendamento.
- **GET /appointments**: Retorna todos os agendamentos.
- **GET /appointments/:id**: Retorna um agendamento específico.
- **PUT /appointments/:id**: Atualiza um agendamento.
- **DELETE /appointments/:id**: Deleta um agendamento.

### **Carrinho**
- **POST /carts/add**: Adiciona um item ao carrinho.
- **POST /carts/remove**: Remove um item do carrinho.
- **DELETE /carts/clear**: Limpa todos os itens do carrinho.
- **GET /carts**: Retorna os itens do carrinho.

### **Categorias**
- **GET /categories**: Retorna todas as categorias de produtos.

### **Cidades**
- **GET /cities/cityToState/:stateId**: Retorna todas as cidades por estado.
- **GET /cities/:id**: Retorna uma cidade específica pelo ID.

### **Funcionários**
- **POST /employers**: Cria um novo funcionário.
- **GET /employers**: Retorna todos os funcionários.
- **GET /employers/:id**: Retorna um funcionário específico pelo ID.
- **GET /employers/service/:serviceId**: Retorna os funcionários relacionados a um serviço.
- **PUT /employers/:id**: Atualiza um funcionário.
- **DELETE /employers/:id**: Deleta um funcionário.

### **Pedidos**
- **GET /orders/:paymentId**: Retorna um pedido específico pelo ID do pagamento.
- **DELETE /orders/:orderId**: Deleta um pedido específico.
- **DELETE /orders/cancel/:orderId**: Cancela um pedido.
- **PUT /orders/:orderId**: Marca um pedido como entregue.
- **GET /orders**: Retorna todos os pedidos.

### **Pagamentos**
- **POST /payments/pay**: Realiza o pagamento de um carrinho.
- **GET /payments/:cartId**: Retorna o resumo de pagamento de um carrinho.

### **Produtos**
- **POST /products**: Cria um novo produto.
- **GET /products**: Retorna todos os produtos.
- **GET /products/:id**: Retorna um produto específico pelo ID.
- **GET /products/category/:category_id**: Retorna produtos filtrados por categoria.
- **GET /products/search/:name**: Retorna produtos que correspondem a uma busca por nome.
- **GET /products/filter/:category_id/:species_id**: Retorna produtos filtrados por categoria e espécie.
- **PUT /products/:id**: Atualiza um produto específico.
- **DELETE /products/:id**: Deleta um produto.

### **Serviços**
- **POST /services**: Cria um novo serviço.
- **GET /services**: Retorna todos os serviços.
- **GET /services/:id**: Retorna um serviço específico pelo ID.
- **PUT /services/:id**: Atualiza um serviço específico.
- **DELETE /services/:id**: Deleta um serviço.

### **Estados**
- **GET /states**: Retorna todos os estados.

  

## 🔄 Fluxo de Desenvolvimento

1. **Autenticação**: Usuários podem se registrar e logar utilizando email/senha ou Google (via Firebase). A autenticação utiliza JWT para proteger rotas.
2. **Carrinho e Pagamentos**: Os usuários podem adicionar produtos ao carrinho, realizar o pagamento fictício, e acompanhar o status de seus pedidos.
3. **Gerenciamento de Pets**: Limites e validações são aplicados para garantir que o usuário tenha controle sobre os pets cadastrados e agendados.

## 📅 Melhorias Futuras

- Implementação de **notificações por email** para confirmação de pedidos e atualizações de status.
- Integração com **Gateways de Pagamento** reais.
- Adição de **relatórios e dashboards** para acompanhar o desempenho do petshop.


## 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/igordmouraa">
        <img src="https://avatars.githubusercontent.com/u/127807075" width="100px;" alt="Foto do Igor Moura no GitHub"/><br>
        <sub>
          <b>Igor Moura</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/VictorSantuccii">
        <img src="https://avatars.githubusercontent.com/u/160544887?v=4" width="100px;" alt="Foto do Victor Santucci no GitHub"/><br>
        <sub>
          <b>Victor Santucci</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.
