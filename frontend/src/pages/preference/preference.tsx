import Select from 'react-select'
import { Alert, Header, clientViewModel, productViewModel } from '../../shared'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { ClientService, ProductService } from '../../shared/services'

export const Preference = () => {
  const [clientsData, setClientsData] = useState<clientViewModel[]>([])
  const [productData, setProductData] = useState<productViewModel[]>([])

  const loadData = async () => {
    try {
      const clients = await ClientService.getAll();
      const products = await ProductService.getAll();
      setClientsData(clients)
      setProductData(products)
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const optionsClient = clientsData.map((client) => ({
    value: client.id,
    label: client.name
  }));

  const optionsProduct = productData.map((client) => ({
    value: client.id,
    label: client.title
  }))

  return (
    <>
      <Header />
      <S.Container>
        <Select options={optionsClient} />
        <Select options={optionsProduct} />
      </S.Container>
    </>
  )
}