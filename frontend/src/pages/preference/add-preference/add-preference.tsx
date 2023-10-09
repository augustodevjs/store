import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../components';
import { Alert, Button, Select, productViewModel, clientViewModel, preferenceInputModel, SelectOption, ClientService, PreferencesService, ProductService } from '../../../shared';
import * as S from './styles';

export const AddPreference = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [preference, setPreference] = useState<preferenceInputModel[]>([])
  const [selectedValueClient, setSelectedValueClient] = useState<SelectOption | null>(null);
  const [selectedValueProduct, setSelectedValueProduct] = useState<SelectOption | null>(null);

  const [products, setProducts] = useState<productViewModel[]>([]);
  const [clientsData, setClientsData] = useState<clientViewModel[]>([]);
  const [productsData, setProductsData] = useState<productViewModel[]>([]);

  const loadData = async () => {
    try {
      const clients = await ClientService.getAll();
      const products = await ProductService.getAll();

      setClientsData(clients);
      setProductsData(products);
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  };

  const addPreference = () => {
    if (selectedValueClient && selectedValueProduct) {
      const productValues = selectedValueProduct.value;

      const newPreference: preferenceInputModel = {
        idClient: selectedValueClient.value,
        idProduct: selectedValueProduct.value.id
      }

      setProducts(prevData => [...prevData, productValues])
      setPreference(prevData => [...prevData, newPreference])
      clearFilter();
    }
  };

  const savePreferences = async () => {
    setIsLoading(true)

    await PreferencesService.add({
      data: preference
    })

    Alert.callSuccess({
      title: 'Preferências cadastradas com sucesso!',
      onConfirm: () => navigate('/preference'),
    });

    setIsLoading(false)
  }

  const handleDelete = (productId: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const clearFilter = () => {
    setSelectedValueClient(null);
    setSelectedValueProduct(null);
  };

  const optionsProduct: SelectOption[] = productsData.map((product) => ({
    value: product,
    label: product.title,
  }));

  const optionsClient: SelectOption[] = clientsData.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  useEffect(() => {
    loadData();
  }, []);

  return (
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
        <Button isLoading={isLoading} disabled={products.length === 0} onClick={savePreferences}>
          Salvar
        </Button>
      </S.SaveButtonGroup>
    </S.Container>
  );
};
