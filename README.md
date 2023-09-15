# API-Produtos
 Api para cadastro e busca de produtos.
 
# Depedencias
- Node
- Swagger
- HapiJs

# Setup

Assumindo que o docker esta instalado e rodando, execute o comando abaixo:

```
docker run --name postgres -e POSTGRES_USER=dev -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=produtos  -p 5432:5432 -d postgres
```

