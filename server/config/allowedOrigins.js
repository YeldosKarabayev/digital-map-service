const allowedOrigns = [
    'http://localhost:3000',
    'https://www.myspaceshop.com',
    'https://digitalmaps.kz',
    'http://91.147.92.212:3000',
    'http://91.147.92.212:443'
]

module.exports = allowedOrigns

const corsOptions = {
    origin: (origin, callback) => {
        // Разрешаем запросы с указанных доменов или с отсутствующим origin (например, с сервера)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);  // Разрешаем запросы с указанных доменов
        } else {
            callback(new Error('Not allowed by CORS'));  // Отклоняем запросы с других доменов
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Добавил OPTIONS для обработки предзапросов
    allowedHeaders: ['Content-Type', 'Authorization'],  // Разрешаем только указанные заголовки
    credentials: true,  // Разрешение на передачу cookies и авторизации
    optionsSuccessStatus: 200,  // Для обработки успешных preflight запросов
};

module.exports = corsOptions;