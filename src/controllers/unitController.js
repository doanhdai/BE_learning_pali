const prisma = require('../config/prisma');

// Units
exports.getUnits = async (req, res) => {
  try {
    const units = await prisma.unit.findMany({
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' }
        }
      },
      orderBy: { orderIndex: 'asc' }
    });
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const { title, description, orderIndex } = req.body;
    const unit = await prisma.unit.create({
      data: { title, description, orderIndex: parseInt(orderIndex) || 1 }
    });
    res.status(201).json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, orderIndex } = req.body;
    const unit = await prisma.unit.update({
      where: { id: parseInt(id) },
      data: { title, description, orderIndex: parseInt(orderIndex) }
    });
    res.json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.unit.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Đã xóa Unit thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lessons
exports.getLessons = async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: [{ unitId: 'asc' }, { orderIndex: 'asc' }]
    });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { unitId, title, orderIndex } = req.body;
    const lesson = await prisma.lesson.create({
      data: {
        unitId: parseInt(unitId),
        title,
        orderIndex: parseInt(orderIndex) || 1
      }
    });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { unitId, title, orderIndex } = req.body;
    const lesson = await prisma.lesson.update({
      where: { id: parseInt(id) },
      data: {
        unitId: parseInt(unitId),
        title,
        orderIndex: parseInt(orderIndex)
      }
    });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lesson.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Đã xóa bài học thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
