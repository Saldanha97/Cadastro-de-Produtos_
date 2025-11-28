import express from 'express';
import cors from 'cors';
import Publico from './routes/Publico.js';
import Privadas from './routes/privadas.js';
import auth from './middlewares/auth.js';

const app = express();

app.use(cors({
    origin: [
        "https://cadastro-de-produtos-git-master-saldanha97s-projects.vercel.app",
        "https://cadastro-de-produtos-5esda07g4-saldanha97s-projects.vercel.app",
        "https://cadastro-de-produtos-sable.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/', Publico)
app.use('/', auth, list)


app.use('/', Publico);


app.use('/', auth, Privadas);

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando 🚀");
});
