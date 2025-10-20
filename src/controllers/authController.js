import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, PasswordReset } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();
import { addEmailJob } from '../queues/emailQueue.js';
import { passwordResetTemplate, welcomeEmailTemplate } from '../utils/emailTemplates.js';

// ------------------------ REGISTER ------------------------
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'organizer' });

    // Generate JWT
    const token = jwt.sign({ id: user.id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Add welcome email to queue
    const html = welcomeEmailTemplate({ name: user.name });
    await addEmailJob({
      to: user.email,
      subject: '🎉 Welcome to Haaflah!',
      html,
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ------------------------ LOGIN ------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ------------------------ FORGOT PASSWORD ------------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await PasswordReset.destroy({ where: { userId: user.id } });
    await PasswordReset.create({ userId: user.id, token, expiresAt });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const html = passwordResetTemplate({ name: user.name, resetLink });

    // Add password reset email to queue
    await addEmailJob({
      to: email,
      subject: 'Reset Your Haaflah Password',
      html,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ------------------------ RESET PASSWORD ------------------------
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Missing fields' });

  try {
    const reset = await PasswordReset.findOne({ where: { token } });
    if (!reset) return res.status(400).json({ error: 'Invalid or expired token' });

    if (new Date() > reset.expiresAt) {
      await reset.destroy();
      return res.status(400).json({ error: 'Token expired' });
    }

    const user = await User.findByPk(reset.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    await reset.destroy();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ------------------------ LOGOUT ------------------------
export const logout = async (req, res) => {
  try {
    // Since JWT is stateless, logout is handled client-side by removing the token
    // This endpoint confirms the logout action
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
