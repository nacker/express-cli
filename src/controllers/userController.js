import { User } from '../models/userModel.js';
import ApiResponse from "../utils/response.js";
import {generateToken} from "../utils/jwt.js";
import redis from "../utils/redis.js";

/**
 * 获取所有用户
 * @param req - 请求对象
 * @param res - 响应对象
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return ApiResponse.success(res, users);
  } catch (e) {
    return ApiResponse.error(res, 500, e.message);
  }
};

/**
 * 用户登录
 * @param req - 请求对象，包含 username 和 password
 * @param res - 响应对象
 */
export async function loginUser(req, res) {
  try {
    // 从请求体中解构出用户名和密码
    const { username, password } = req.body;
    // 根据用户名在数据库中查找对应的用户记录
    const user = await User.findOne({ where: { username } });

    // 若用户不存在或输入的明文密码与数据库中存储的密码不匹配
    if (!user || password !== user.hashed_password) {
      // 若用户不存在或密码不匹配，返回 401 状态码和错误信息
      return ApiResponse.error(res, 401, 'Invalid credentials');
    }

    // 若验证通过，调用 generateToken 函数生成 JWT token，传入用户 ID 和角色信息
    const token = generateToken({ userId: user.id, role: user.role });
    // 将生成的 token 存储到 Redis 中，以 user:{用户ID} 为键，设置过期时间为 3600 秒（1 小时）
    await redis.set(`user:${user.id}`, token, 'EX', 3600);

    // 返回包含 token 的成功响应
    return ApiResponse.success(res, { token });
  } catch (e) {
    // 若过程中出现错误，返回 500 状态码和错误信息
    return ApiResponse.error(res, 500, e.message);
  }
}

/**
 * 创建新用户
 * @param req - 请求对象，包含 username 和 password
 * @param res - 响应对象
 */
export async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = password; // 注意：这里应使用 bcrypt.hashSync 加密密码
    const user = await User.create({ username, hashed_password: hashedPassword });

    return ApiResponse.success(res, user);
  } catch (e) {
    return ApiResponse.error(res, 500, e.message);
  }
}
