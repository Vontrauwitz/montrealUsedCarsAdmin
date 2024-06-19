import Layout from '@/components/Layout'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) { // Asegúrate de que el ID está presente antes de hacer la llamada
      axios.get(`/api/cars?id=${id}`).then(response => { // Usa template strings correctamente
        console.log(response.data);
      }).catch(error => {
        console.error('Error fetching car:', error);
      });
    }
  }, [id]);

  return (
    <Layout>
      edit product from here
    </Layout>
  )
}