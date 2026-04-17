import { PrismaClient } from '../src/infrastructure/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
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
  // USER ADMIN (primeiro registo)
  // ============================================
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@biolo.ao',
        password: hashedPassword,
        role: 'admin',
        active: true,
      },
    });
    console.log('✅ Usuário Admin criado com sucesso');
    console.log('   📧 Email: admin@biolo.ao');
    console.log('   🔑 Senha: admin123');
  } else {
    console.log('⚠️ Usuário Admin já existe');
  }

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