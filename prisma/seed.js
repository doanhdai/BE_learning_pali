const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear tables
  try {
    await prisma.dictionary.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.question.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.unit.deleteMany();
    console.log('Cleared existing data.');
  } catch (err) {
    console.log('Note: could not clear tables (they might not exist yet).');
  }

  // Create Units
  const unit1 = await prisma.unit.create({
    data: {
      title: 'Unit 1: Tam Bảo',
      description: 'Buddha, Dhamma, Saṅgha',
      orderIndex: 1,
    }
  });

  const unit2 = await prisma.unit.create({
    data: {
      title: 'Unit 2: Ba Đặc Tướng',
      description: 'Anicca, Dukkha, Anattā',
      orderIndex: 2,
    }
  });

  const unit3 = await prisma.unit.create({
    data: {
      title: 'Unit 3: Tứ Diệu Đế',
      description: 'Dukkha, Samudaya, Nirodha, Magga',
      orderIndex: 3,
    }
  });

  console.log('Created units.');

  // Create Lessons for Unit 1
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: 'Bài 1: Từ vựng Tam Bảo',
      orderIndex: 1
    }
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: 'Bài 2: Nghe & nhận biết',
      orderIndex: 2
    }
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: 'Bài 3: Ghép cặp từ',
      orderIndex: 3
    }
  });

  const lesson4 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: 'Bài 4: Quiz tổng hợp',
      orderIndex: 4
    }
  });

  console.log('Created lessons.');

  // Create Questions for Unit 1 lessons
  // correctAnswers and distractors are JSON array objects
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson1.id,
        type: 'vocab',
        content: 'Từ nào có nghĩa là "Chân lý / Giáo pháp"?',
        imageUrl: null,
        correctAnswers: ['Dhamma'],
        distractors: ['Saṅgha', 'Nibbāna', 'Dukkha'],
        explanation: 'Dhamma (Pháp) là giáo lý, chân lý do Đức Phật truyền dạy.'
      },
      {
        lessonId: lesson1.id,
        type: 'vocab',
        content: '"Saṅgha" có nghĩa là gì?',
        imageUrl: null,
        correctAnswers: ['Tăng đoàn'],
        distractors: ['Giáo pháp', 'Niết bàn', 'Đức Phật'],
        explanation: 'Saṅgha là Tăng đoàn, đoàn thể tu sĩ Phật giáo.'
      },
      {
        lessonId: lesson1.id,
        type: 'manual_input',
        content: 'Viết từ Pali có nghĩa là "Đức Phật"',
        imageUrl: null,
        correctAnswers: ['Buddha', 'buddho'],
        distractors: [],
        explanation: 'Buddha — Đức Phật, đấng Giác Ngộ hoàn toàn.'
      },
      {
        lessonId: lesson1.id,
        type: 'sentence_build',
        content: 'Dịch câu sau sang tiếng Pali: "Đức Phật ngự trị"',
        imageUrl: null,
        correctAnswers: ['Buddho', 'viharati'],
        distractors: ['Dhammo', 'saṅgho', 'gacchati', 'loke'],
        explanation: '"Buddho viharati" nghĩa là Đức Phật ngự trị (viharati: ngự trị, trú ngụ).'
      },
      {
        lessonId: lesson2.id,
        type: 'manual_input',
        content: 'Viết từ Pali nghĩa là "Vô thường"',
        imageUrl: null,
        correctAnswers: ['Anicca', 'aniccam', 'aniccā'],
        distractors: [],
        explanation: 'Anicca nghĩa là Vô thường, một trong Ba Đặc Tướng.'
      },
      {
        lessonId: lesson2.id,
        type: 'sentence_build',
        content: 'Sắp xếp câu: "Pháp được khéo thuyết giảng"',
        imageUrl: null,
        correctAnswers: ['Svākkhāto', 'Bhagavatā', 'Dhammo'],
        distractors: ['Buddho', 'tassa', 'namo'],
        explanation: '"Svākkhāto Bhagavatā Dhammo" là câu tụng Pháp Bảo.'
      },
      {
        lessonId: lesson3.id,
        type: 'vocab',
        content: '"Mettā" có nghĩa là gì?',
        imageUrl: null,
        correctAnswers: ['Lòng từ ái'],
        distractors: ['Lòng bi mẫn', 'Hỷ xả', 'Giới hạnh'],
        explanation: 'Mettā có nghĩa là lòng từ ái, tình thương rộng lớn.'
      },
      {
        lessonId: lesson4.id,
        type: 'manual_input',
        content: 'Gõ từ Pali có nghĩa là "Khổ đau"',
        imageUrl: null,
        correctAnswers: ['Dukkha', 'dukkhaṃ', 'dukkha'],
        distractors: [],
        explanation: 'Dukkha là Khổ, một trong Ba Đặc Tướng và Tứ Diệu Đế.'
      }
    ]
  });

  console.log('Created questions.');

  // Create Dictionary Words
  await prisma.dictionary.createMany({
    data: [
      { wordPali: 'Buddha', meaningVn: 'Đức Phật, Đấng Giác Ngộ', wordType: 'Danh từ', example: 'Buddho loke uppajjati (Đức Phật xuất hiện ở thế gian).' },
      { wordPali: 'Dhamma', meaningVn: 'Giáo pháp, Chân lý', wordType: 'Danh từ', example: 'Dhammo sukkhato Bhagavata (Pháp được khéo thuyết giảng bởi Đức Thế Tôn).' },
      { wordPali: 'Saṅgha', meaningVn: 'Tăng đoàn, Cộng đồng tăng sĩ', wordType: 'Danh từ', example: 'Saṅgho sūpatipanno (Tăng đoàn của Đức Thế Tôn là bậc diệu hạnh).' },
      { wordPali: 'Anicca', meaningVn: 'Vô thường, luôn biến đổi', wordType: 'Tính từ', example: 'Sabbe saṅkhārā aniccā (Tất cả các hành là vô thường).' },
      { wordPali: 'Dukkha', meaningVn: 'Khổ đau, không toàn vẹn', wordType: 'Danh từ', example: 'Sabbe saṅkhārā dukkhā (Tất cả các hành là khổ).' },
      { wordPali: 'Anattā', meaningVn: 'Vô ngã, không có tự tính cốt lõi', wordType: 'Tính từ', example: 'Sabbe dhammā anattā (Tất cả các pháp là vô ngã).' },
      { wordPali: 'Mettā', meaningVn: 'Tâm từ, lòng từ ái', wordType: 'Danh từ', example: 'Mettāsahagatena cetasā (Với tâm câu hữu với lòng từ).' },
      { wordPali: 'Karuṇā', meaningVn: 'Tâm bi, lòng trắc ẩn trước nỗi khổ', wordType: 'Danh từ', example: 'Karuṇāsahagatena cetasā (Với tâm câu hữu với lòng bi).' }
    ]
  });

  console.log('Created dictionary entries.');
  console.log('Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
