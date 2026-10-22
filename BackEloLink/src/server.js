import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import authRoutes from './routes/authRoutes.js';
import startupRoutes from './routes/startupRoutes.js';
import buscaRoutes from './routes/buscaRoutes.js';
import investidorRoutes from './routes/investidorRoutes.js';
import conversaRoutes from './routes/conversaRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/buscas', buscaRoutes);
app.use('/api/investidores', investidorRoutes);
app.use('/api/conversas', conversaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Swagger UI disponível em: http://localhost:${PORT}/doc`);
});