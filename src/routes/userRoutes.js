import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { loginUser, createUser, getUsers } from '../controllers/userController.js';
import { generateToken } from '../utils/jwt.js';
import redis from '../utils/redis.js';

const router = express.Router();

// 用户登录
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: 用户登录
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: 返回JWT令牌
 */
// 公共路由（无需认证）
router.post('/login', loginUser);
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: 用户注册
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: 123456
 *             required: ['username', 'password']
 *     responses:
 *       200:
 *         description: 用户创建成功
 */
router.post('/register', createUser);

// 需要认证的路由
router.use(authenticate());
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: 获取所有用户
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 用户列表获取成功
 *       500:
 *         description: 内部服务器错误
 */
router.route('/')
  .get(getUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: 获取指定用户
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 用户获取成功
 */
router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await redis.get(id);
    if (user) {
      return res.json({ data: JSON.parse(user) });
    }
    res.json({ data: null });
  });

export default router;
