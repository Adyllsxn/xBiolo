#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

console.log("\n🔍 INNOVAQUI - Status\n");

// Verifica se o projeto existe
if (fs.existsSync("frontend/package.json")) {
  console.log("✅ Projeto: Next.js instalado");
} else {
  console.log("❌ Projeto não encontrado");
  process.exit(1);
}

// Verifica se o servidor tá rodando
console.log("🔄 Verificando servidor...");

const req = http.get('http://localhost:3000', (res) => {
  if (res.statusCode === 200) {
    console.log("✅ Servidor: RODANDO em http://localhost:3000");
    console.log("\n🎉 Tudo certo! Pode codar!");
  } else {
    console.log("⚠️  Servidor: Rodando mas com erro");
  }
  process.exit(0);
});

req.on('error', () => {
  console.log("❌ Servidor: NÃO está rodando");
  console.log("\n💡 Para iniciar:");
  console.log("   cd frontend");
  console.log("   npm run dev");
  process.exit(0);
});

req.setTimeout(2000, () => {
  console.log("❌ Servidor: NÃO respondeu");
  process.exit(0);
});