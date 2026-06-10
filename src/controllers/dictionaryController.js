const prisma = require('../config/prisma');

exports.getWords = async (req, res) => {
  try {
    const { q, type } = req.query;
    
    let whereClause = {};
    if (q) {
      whereClause.OR = [
        { wordPali: { contains: q } },
        { meaningVn: { contains: q } }
      ];
    }
    if (type && type !== 'all') {
      whereClause.wordType = type;
    }
    
    const words = await prisma.dictionary.findMany({
      where: whereClause,
      orderBy: { wordPali: 'asc' }
    });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWord = async (req, res) => {
  try {
    const { wordPali, meaningVn, wordType, example } = req.body;
    const word = await prisma.dictionary.create({
      data: { wordPali, meaningVn, wordType, example }
    });
    res.status(201).json(word);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { wordPali, meaningVn, wordType, example } = req.body;
    const word = await prisma.dictionary.update({
      where: { id: parseInt(id) },
      data: { wordPali, meaningVn, wordType, example }
    });
    res.json(word);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.dictionary.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Đã xóa từ vựng thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
