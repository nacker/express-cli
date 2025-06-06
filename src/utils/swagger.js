import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import config from '../config/config.js';

export default (app, port) => {
  const options = {
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          phone: { type: 'string', example: '+8613912345678' }
        }
      }
    }
  },
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express Scaffold API',
        version: '1.0.0',
        description: '集成JWT认证的RESTful API'
      },
      components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' }
        }
      }
    },
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      servers: [{
        url: `http://localhost:${port}`
      }]
    },
    apis: ['./src/routes/*.js']
  };

  const specs = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};