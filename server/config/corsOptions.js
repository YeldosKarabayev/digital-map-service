// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://www.myspaceshop.com',
//     'http://digitalmaps.kz',
//     'http://91.147.92.212:3000'
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         // Разрешаем запросы без origin (например, для локальных файлов или от сервисов, не отправляющих origin)
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);  // Разрешаем запросы с указанных доменов
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Разрешенные HTTP методы
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Разрешенные заголовки
//     credentials: true,  // Разрешение на передачу cookies и авторизации
//     optionsSuccessStatus: 200  // Статус ответа для предзапросов OPTIONS
// };

// module.exports = corsOptions;

const allowedOrigns = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigns.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions
