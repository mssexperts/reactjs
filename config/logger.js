const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/application.log',
      formatter: ({
        meta, message, level, timestamp,
      }) => {
        const {
          correlationId = '', detail,
        } = meta;

        return JSON.stringify({
          application: {
            appSpecificLogs: { sessionId: '' },
            name: 'Crosstab',
            type: '',
          },
          correlationId,
          log: {
            detail,
            message,
            type: level,
          },
          requestContext: {
            claims: '',
            cookies: '',
            host: '',
            parameters: '',
            requestPath: '',
            tokenType: '',
          },
          timestamp: timestamp(),
        });
      },
      level: 'error',
      timestamp: () => Date.now(),
    }),
  ],
});

module.exports = logger;
