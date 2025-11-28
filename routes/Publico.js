import express  from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = express.Router()
router.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET

router.post('/cadastro', async (req, res) => {


    try {
        const { email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const users = await prisma.user.create({
            data: {
                email,
                password: hashpassword
            }
        })

        res.status(201).json(users)

    } catch (err) {
        res.status(500).json({ messagen: "Erro no Servidor, Tente novamente" })

    }

})


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não definido!");
      return res.status(500).json({ message: "Configuração inválida no servidor" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("Erro na rota /login:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;
