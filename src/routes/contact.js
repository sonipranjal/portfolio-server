import { Router } from 'express';
import mailgun from 'mailgun-js';

const contact = (req, res) => {
  const DOMAIN = 'pranjalsoni.com';
  const sendmail = mailgun({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
  });
  const { email, name, message } = req.body;
  const data = {
    from: email,
    to: process.env.mymail,
    subject: `message from ${name}`,
    text: message,
  };
  sendmail.messages().send(data);
  return res.status(200).json({ message: 'message sent' });
};

const router = Router();
router.post('/contact', contact);
export default router;
