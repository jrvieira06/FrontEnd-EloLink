import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EloLink API - Projeto Integrador',
      version: '1.0.0',
      description: `
### API REST do Ecossistema de Matchmaking entre Startups e Investidores

* **Tecnologias:** Node.js, Express, Supabase (PostgreSQL), Swagger OpenAPI 3.0
      `,
     },
    servers: [
      {
        url: 'https://elolink-k7km.onrender.com',
        description: 'Servidor de Produção (Render)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local de Desenvolvimento',
      },
    ],
        name: 'Startups',
        description: 'CRUD completo para perfil e informações de Startups',
      },
      {
        name: 'Busca & Matchmaking',
        description: 'Filtros e manifesto de interesse entre Investidores e Startups',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
