import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientService, PreferencesService } from '../../../../shared/services';
import { Alert, Button, Select, clientViewModel, productViewModel, Header } from '../../../../shared';
import { Table } from '../../components';
import * as S from './styles';

export const Home = () => {
  const navigate = useNavigate();

  const [selectedValueClient, setSelectedValueClient] = useState<any | null>(null);
  const [clientsData, setClientsData] = useState<clientViewModel[]>([]);
  const [preferencesData, setPreferencesData] = useState<productViewModel[]>([]);
  const [clearClicked, setClearClicked] = useState(false);

  const loadData = async () => {
    try {
      const clients = await ClientService.getAll();
      setClientsData(clients);
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  };

  const optionsClient = clientsData.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  const searchPreferences = async () => {
    try {
      if (selectedValueClient) {
        const preferences = await PreferencesService.LoadPreferencesById({ id: selectedValueClient.value });
        setPreferencesData(preferences);
      }
    } catch (error) {
      Alert.callError({
        title: 'Erro ao buscar preferências',
        description: 'O Cliente não possui preferências.',
      });
    }
  };

  const clearPreferences = () => {
    setPreferencesData([]);
    setClearClicked(true);
    setSelectedValueClient(null);
  };

  useEffect(() => {
    loadData();
  }, [clearClicked, selectedValueClient]);

  return (
    <>
      <Header />

      <S.Container>
        <h1>Lista de Preferências</h1>
        <S.Search>
          <div className="filter">
            <Select
              isClearable
              value={selectedValueClient}
              options={optionsClient}
              onChange={setSelectedValueClient}
              placeholder="Selecione o cliente"
            />

            <Button onClick={searchPreferences}>
              Buscar
            </Button>
            <Button disabled={preferencesData.length === 0} onClick={clearPreferences}>
              Limpar preferências
            </Button>
          </div>

          <S.ButtonGroup>
            <Button onClick={() => navigate('/preference/cadastro')}>Novo preferência</Button>
          </S.ButtonGroup>
        </S.Search>

        {preferencesData.length !== 0 ? (
          <S.Tasks>
            <ul>
              {preferencesData.map((data) => (
                <Table
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  price={data.price}
                  onDelete={() => console.log('oi')}
                />
              ))}
            </ul>
          </S.Tasks>
        ) : (
          <S.NoData>Não há preferências para exibir</S.NoData>
        )}
      </S.Container>
    </>
  );
};
