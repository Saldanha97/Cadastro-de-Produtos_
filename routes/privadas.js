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
    console.log("req.userId:", req.userId);
    const produto = await prisma.produto.create({
      data: { nome, quantidade, userId: req.userId }
    });
    res.status(201).json(produto);
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    res.status(500).json({ message: "Erro ao cadastrar produto", error: err.message });
  }
});

router.get('/meus-produtos', auth, async (req, res) => {
  try {
    console.log("req.userId:", req.userId);
    const produtos = await prisma.produto.findMany({ where: { userId: req.userId } });
    res.json(produtos);
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).json({ message: "Erro ao listar produtos", error: err.message });
  }
});

export default router;
