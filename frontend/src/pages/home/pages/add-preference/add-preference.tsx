import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { Alert, Button, Select, productViewModel, Header, clientViewModel } from '../../../../shared';
import { ClientService, PreferencesService, ProductService } from '../../../../shared/services';
import { Table } from '../../components';

type teste = {
  idClient: number;
  idProducts: number;
}

export const AddPreference = () => {
  const navigate = useNavigate();

  const [teste, setTeste] = useState<any>([])
  const [selectedValueProduct, setSelectedValueProduct] = useState<any>(undefined);
  const [selectedValueClient, setSelectedValueClient] = useState<any | null>(null);

  const [productsData, setProductsData] = useState<productViewModel[]>([]);
  const [clientsData, setClientsData] = useState<clientViewModel[]>([]);

  const [products, setProducts] = useState<productViewModel[]>([]);

  const addPreference = () => {
    if (selectedValueClient && selectedValueProduct && selectedValueProduct.length > 0) {
      const selectedValues = selectedValueProduct.map((p: any) => p.value);
      const updatedProducts = [...products, ...selectedValues];

      const newPreference: teste = {
        idClient: selectedValueClient.value,
        idProducts: selectedValueProduct.map((p: any) => p.value)[0].id
      };

      setTeste((prevTeste: any) => [...prevTeste, newPreference]);
      setProducts(updatedProducts);

      clearFilter()
    }
  };

  const loadData = async () => {
    try {
      const clients = await ClientService.getAll();
      const products = await ProductService.getAll();
      setProductsData(products);
      setClientsData(clients);
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const optionsProduct = productsData.map((product) => ({
    value: product,
    label: product.title,
  }));

  const optionsClient = clientsData.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  const handleDelete = (productId: number) => {

    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };


  const clearFilter = () => {
    setSelectedValueClient(null);
    setSelectedValueProduct(null);
  };

  const savePreferences = async () => {
    await PreferencesService.add({
      data: teste
    })

    Alert.callSuccess({
      title: 'Preferências cadastradas com sucesso!',
      onConfirm: () => navigate('/preference'),
    });
  }

  return (
    <>
      <Header />

      <S.Container>
        <h1>Cadastrar Preferência</h1>
        <S.Search>
          <div className='filter'>
            <Select
              options={optionsClient}
              value={selectedValueClient}
              onChange={setSelectedValueClient}
              placeholder="Selecione o cliente"
            />

            <Select
              isMulti
              options={optionsProduct}
              value={selectedValueProduct}
              onChange={setSelectedValueProduct}
              placeholder="Selecione os produtos"
              isDisabled={!selectedValueClient}
            />

            <S.ButtonGroup>
              <Button
                disabled={!selectedValueClient || !selectedValueProduct}
                onClick={addPreference}
              >
                Adicionar
              </Button>
              <Button
                disabled={!selectedValueClient && !selectedValueProduct}
                onClick={clearFilter}
              >
                Limpar Filtros
              </Button>
            </S.ButtonGroup>
          </div>

          <Button onClick={() => navigate('/preference')}>Voltar</Button>
        </S.Search>

        {products.length !== 0 ? (
          <S.Tasks>
            <ul>
              {products.map((data) => (
                <Table
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  price={data.price}
                  onDelete={() => handleDelete(data.id)}
                />
              ))}
            </ul>
          </S.Tasks>
        ) : (
          <S.NoData>Não há produtos para exibir</S.NoData>
        )}

        <S.SaveButtonGroup>
          <Button onClick={() => navigate('/preference')}>Cancelar</Button>
          <Button disabled={products.length === 0} onClick={savePreferences}>Salvar</Button>
        </S.SaveButtonGroup>
      </S.Container>
    </>
  );
};
