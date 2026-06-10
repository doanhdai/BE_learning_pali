const prisma = require('../config/prisma');

exports.getProgressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await prisma.userProgress.findMany({
      where: { userId: parseInt(userId) }
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.upsertProgress = async (req, res) => {
  try {
    const { userId, lessonId, isCompleted } = req.body;
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: parseInt(userId),
          lessonId: parseInt(lessonId)
        }
      },
      update: {
        isCompleted: isCompleted || false,
        lastAccessed: new Date()
      },
      create: {
        userId: parseInt(userId),
        lessonId: parseInt(lessonId),
        isCompleted: isCompleted || false
      }
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
