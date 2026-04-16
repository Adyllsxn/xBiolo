import { PrismaClient } from '../src/infrastructure/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding database...');

  // ============================================
  // STORE (só insere se não existir)
  // ============================================
  const existingStore = await prisma.store.findFirst();

  if (!existingStore) {
    await prisma.store.create({
      data: {
        name: 'Biolo',
        whatsapp: '244935751955',
        email: 'biolo@biolo.ao',
        address: 'Luanda, Angola',
        primaryColor: '#E05A2A',
      },
    });
    console.log('✅ Store criada com sucesso');
  } else {
    console.log('⚠️ Store já existe, nada foi alterado');
  }

  console.log('🌱 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
