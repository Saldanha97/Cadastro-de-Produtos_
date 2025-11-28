import express from 'express';
import cors from 'cors';
import Publico from './routes/Publico.js';
import Privadas from './routes/privadas.js';
import auth from './middlewares/auth.js';
import dotenv from "dotenv";
dotenv.config(); 

const app = express();



const allowedOrigins = [
    'http://localhost:5173' 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); 
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Origin not allowed by CORS'));
        }
    },
    credentials: true 
}));

app.use('/', Publico)



app.use('/', Publico);


app.use('/', auth, Privadas);

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando 🚀");
});
