export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Bem-vindo ao painel administrativo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Produtos</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pedidos</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Categorias</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">0</p>
        </div>
      </div>
    </div>
  );
}