import { Router } from 'express';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.getrevue.co/api/v2/subscribers';

const subscribe = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;

    const response = await axios({
      method: 'post',
      data: { email, first_name, last_name },
      headers: {
        Authorization: `Bearer ${process.env.NEWSLETTER_API_KEY}`,
      },
    });

    const status = await response.status;

    if (status === 200) {
      return res.status(200).json('success');
    }
    return res.status(400).json({ error: response });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const router = Router();
router.post('/subscribe', subscribe);

export default router;
