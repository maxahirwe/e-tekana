import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const configureSwagger = (app) => {
  const options = {
    definition: {
      swagger: '2.0',
      info: {
        title: 'PROJECT NAME API',
        version: '1.0.0',
        description: 'Getting access',
      },
      host: process.env.SWAGGER_BASE_URL,
      schemes: ['https', 'http'],
    },
    apis: ['./src/swagger/*.swagger.js'],
  };
  const spec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
};

export default configureSwagger;
