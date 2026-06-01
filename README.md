# Academia API

API para gerenciamento simples de uma academia. O projeto permite cadastrar alunos, instrutores, planos de treino e fichas de exercicios, com autenticacao por token JWT.

Tambem existe uma interface web simples em `src/public/index.html`, servida pelo proprio Express, para testar as principais operacoes sem precisar usar Postman ou Insomnia.

## Tecnologias

- Node.js
- Express
- Prisma ORM
- MySQL
- JWT
- Bcrypt
- CORS

## Requisitos

Antes de rodar o projeto, tenha instalado:

- Node.js 20 ou superior
- npm
- Um banco MySQL disponivel

O projeto foi ajustado para Prisma 7. Por isso, a conexao com MySQL usa o adapter `@prisma/adapter-mariadb`.

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Use o arquivo `.env.example` como base e crie um arquivo `.env` na raiz do projeto com as variaveis abaixo:

```env
DATABASE_URL="mysql://usuario:senha@host:porta/nome_do_banco?ssl-mode=REQUIRED"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

Ou rode sem nodemon:

```bash
npm start
```

Quando estiver rodando, acesse:

```txt
http://localhost:3000
```

## Banco de Dados

O schema do Prisma fica em:

```txt
prisma/schema.prisma
```

Modelos principais:

- `Aluno`
- `Instrutor`
- `PlanoTreino`
- `Ficha`

Relacionamentos:

- Um aluno pode ter varios planos de treino.
- Um plano de treino pertence a um aluno.
- Um plano pode ter varias fichas.
- Uma ficha pertence a um plano e a um instrutor.

## Autenticacao

As rotas principais usam token JWT. Primeiro cadastre ou faca login por `/auth`, depois envie o token no header:

```txt
Authorization: Bearer seu_token
```

## Rotas

### Auth

```txt
POST /auth/register
POST /auth/login
```

### Alunos

```txt
GET    /alunos
GET    /alunos/:id
POST   /alunos
PUT    /alunos/:id
DELETE /alunos/:id
```

Ao excluir um aluno, a API tambem remove os planos e fichas ligados a ele para evitar erro de chave estrangeira no banco.

### Instrutores

```txt
GET    /instrutores
GET    /instrutores/:id
POST   /instrutores
PUT    /instrutores/:id
DELETE /instrutores/:id
```

### Planos de Treino

```txt
GET    /planos
GET    /planos/:id
POST   /planos
PUT    /planos/:id
DELETE /planos/:id
```

### Fichas

```txt
GET    /fichas
GET    /fichas/:id
POST   /fichas
PUT    /fichas/:id
DELETE /fichas/:id
```

## Exemplos de Requisicao

Cadastro de aluno:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

Login:

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

Criar plano:

```json
{
  "titulo": "Treino A",
  "descricao": "Peito, ombro e triceps",
  "alunoId": 1
}
```

Criar ficha:

```json
{
  "exercicio": "Supino reto",
  "series": 4,
  "repeticoes": 10,
  "instrutorId": 1,
  "planoId": 1
}
```

## Problemas Comuns

Se aparecer `EADDRINUSE`, a porta ja esta sendo usada. No Windows, voce pode encontrar e encerrar o processo assim:

```cmd
netstat -ano | findstr :3000
taskkill /PID NUMERO_DO_PID /F
```

Se o front mostrar `Failed to fetch`, confira se o backend esta rodando e se a URL da API no front aponta para a porta correta.

Se alterar o schema do Prisma, gere o client novamente:

```bash
npx prisma generate
```

## Estrutura

```txt
src/
  controllers/
  lib/
  middlewares/
  public/
  routes/
  server.js
prisma/
  schema.prisma
prisma.config.js
```

## Observacao

Este projeto foi feito para fins de estudo e pratica com API REST, autenticacao, Prisma e MySQL.
