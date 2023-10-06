import { Alert, Button, Header, clientViewModel, productViewModel } from '../../shared'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { Select } from '../../shared/components'
import { ClientService, PreferencesService } from '../../shared/services'
import { Table } from './components'

export const Home = () => {
  const [selectedChoice, setSelectedChoice] = useState<number | undefined>(undefined);
  const [clientsData, setClientsData] = useState<clientViewModel[]>([]);
  const [preferencesData, setPreferencesData] = useState<productViewModel[]>([]);

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

  useEffect(() => {
    loadData();
  }, []);

  const optionsClient = clientsData.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  const handleSelectChange = (choice: any) => {
    setSelectedChoice(choice?.value);
  };

  const searchPreferences = async () => {
    try {
      if (selectedChoice) {
        const preferences = await PreferencesService.LoadPreferencesById({ id: selectedChoice });
        setPreferencesData(preferences);
      }
    } catch (error) {
      Alert.callError({
        title: 'Erro ao buscar preferências',
        description: 'O Cliente não possui preferências.',
      });
    }
  };

  return (
    <>
      <Header />

      <S.Container>
        <h1>Lista de Preferências</h1>
        <S.Search>
          <Select
            isClearable
            options={optionsClient}
            onChange={handleSelectChange}
            placeholder="Selecione o cliente"
          />

          <Button
            onClick={searchPreferences}
            disabled={selectedChoice === undefined}
          >
            Buscar
          </Button>
        </S.Search>


        {preferencesData.length !== 0 ? (

          <S.Tasks>
            <ul>
              {preferencesData.map(data => (
                <Table
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  price={data.price}
                />
              ))}
            </ul>
          </S.Tasks>
        ) : (
          <S.NoData>
            Não há registros para exibir
          </S.NoData>
        )}
      </S.Container>
    </>
  );
}