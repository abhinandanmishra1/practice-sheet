const Sheet = require('../Models/Sheet');

const getSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({}, {
      name: 1,
      description: 1,
      id: "$_id",
      _id: 0,
      createdAt: 1
    });
    res.json(sheets);
  } catch (error) {
    console.error('Error fetching sheets:', error);
    res.status(500).json({ error: 'Failed to fetch sheets' });
  }
};

const getSheetById = async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ error: 'Sheet not found' });
    }
    res.json({
      id: sheet._id,
      name: sheet.name,
      description: sheet.description,
      createdAt: sheet.createdAt
    });
  } catch (error) {
    console.error('Error fetching sheet:', error);
    res.status(500).json({ error: 'Failed to fetch sheet' });
  }
};

module.exports = {
  getSheets,
  getSheetById
};
