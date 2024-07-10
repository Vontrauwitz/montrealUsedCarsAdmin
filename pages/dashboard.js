import React from 'react';
import Layout from '@/components/Layout';

const Dashboard = () => {
  return (
    <Layout requireAuth>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <section className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mb-10">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Aquí puedes agregar las gráficas u otros componentes que quieras mostrar en el Dashboard */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Graph 1</h2>
              <p>Graph content here</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Graph 2</h2>
              <p>Graph content here</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Dashboard;
