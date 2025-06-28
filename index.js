const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/events/team-level-up', async (req, res) => {
  const { memberName, newLevel, team, message, avatarUrl } = req.body;

  try {
    const response = await axios.post(
      'https://tikfinity.zerody.one/widget/myactions?cid=1733111&screen=1',
      {
        trigger: 'teamLevelUp',
        data: {
          memberName,
          newLevel,
          team,
          message,
          avatarUrl
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TIKFINITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ status: 'success', tikfinityResponse: response.data });
  } catch (error) {
    console.error('Error sending trigger to Tikfinity:', error.response?.data || error.message);
    res.status(500).json({ status: 'error', message: 'Failed to send trigger to Tikfinity' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
