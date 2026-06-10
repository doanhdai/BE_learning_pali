const prisma = require('../config/prisma');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await prisma.question.findUnique({
      where: { id: parseInt(id) }
    });
    if (!q) return res.status(404).json({ error: 'Không tìm thấy câu hỏi' });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionsByLessonId = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await prisma.question.findMany({
      where: { lessonId: parseInt(id) }
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { lessonId, type, content, imageUrl, correctAnswers, distractors, explanation } = req.body;
    const question = await prisma.question.create({
      data: {
        lessonId: parseInt(lessonId),
        type,
        content,
        imageUrl,
        correctAnswers: correctAnswers || [],
        distractors: distractors || [],
        explanation
      }
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { lessonId, type, content, imageUrl, correctAnswers, distractors, explanation } = req.body;
    
    const question = await prisma.question.update({
      where: { id: parseInt(id) },
      data: {
        lessonId: parseInt(lessonId),
        type,
        content,
        imageUrl,
        correctAnswers: correctAnswers || [],
        distractors: distractors || [],
        explanation
      }
    });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.question.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Đã xóa câu hỏi thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
