import express from 'express'

import { PrismaClient } from '@prisma/client'


const router = express.Router()

const prisma = new PrismaClient


router.get('/list', async (req, res) => {

    try {

        const user = await prisma.user.findMany({ omit: { password: true } })

        res.status(200).json({ messagen: 'Usuarios listados com sucesso', user })

    } catch (err) {
        res.status(500).json({ messagen: "falha servidor" })

    }
})


router.post('/produto', async (req, res) => {
    try {
        const { nome, quantidade } = req.body;

        if (!nome || quantidade === undefined) {
            return res.status(400).json({ message: "nome e quantidade são obrigatórios" });
        }

        const produto = await prisma.produto.create({
            data: { nome, quantidade, userId: req.userId }
        });

        res.status(201).json(produto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar produto" });
    }
});

router.get('/meus-produtos', async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany({ where: { userId: req.userId } });
        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao listar produtos" });
    }
});


router.put('/produto/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        const produto = await prisma.produto.update({
            where: { id },
            data: { quantidade }
        });

        res.json(produto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar produto" });
    }
});


router.delete('/produto/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.produto.delete({ where: { id } });
        res.json({ message: "Produto excluído com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao excluir produto" });
    }
});

export default router;