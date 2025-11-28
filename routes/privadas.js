import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middlewares/auth.js';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/produto', auth, async (req, res) => {
    const { nome, quantidade } = req.body;
    if (!nome || quantidade === undefined) {
        return res.status(400).json({ message: "nome e quantidade são obrigatórios" });
    }
    try {
        const produto = await prisma.produto.create({
            data: { nome, quantidade, userId: req.userId }
        });
        res.status(201).json(produto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar produto" });
    }
});

router.get('/meus-produtos', auth, async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany({ where: { userId: req.userId } });
        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao listar produtos" });
    }
});

export default router;