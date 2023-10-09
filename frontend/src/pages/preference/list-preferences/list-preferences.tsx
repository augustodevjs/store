import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemovePreferenceModal, Table } from '../components';
import { Alert, Button, Select, ClientService, SelectOption, preferenceClientViewModel, clientViewModel, useModal } from '../../../shared';

import * as S from './styles';

export const Preference = () => {
  const navigate = useNavigate();

  const [selectedPreference, setSelectedPreference] = useState<preferenceClientViewModel>();
  const [preferencesData, setPreferencesData] = useState<preferenceClientViewModel[]>([]);
  const [clientsData, setClientsData] = useState<clientViewModel[]>([]);
  const [selectedValueClient, setSelectedValueClient] = useState<SelectOption | null>(null);

  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useModal();

  const handleRemove = (preference: preferenceClientViewModel) => {
    setSelectedPreference(preference);
    openRemoveModal();
  };

  const loadData = useCallback(async () => {
    try {
      const clients = await ClientService.getAll();
      setClientsData(clients);
    } catch (error) {
      handleError(error as Error);
    }
  }, [setClientsData]);

  const searchPreferences = async () => {
    try {
      if (selectedValueClient) {
        const preferences = await ClientService.getPreferenceClient({ id: selectedValueClient.value });
        setPreferencesData(preferences);
      }
    } catch (error) {
      handleError(error as Error, 'Erro ao buscar preferências', 'O Cliente não possui preferências.');
    }
  };

  const clearPreferences = () => {
    setPreferencesData([]);
    setSelectedValueClient(null);
  };

  const clientOptions: SelectOption[] = clientsData.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  const handleError = (error: Error, title = error.name, description = error.message) => {
    Alert.callError({
      title,
      description,
    });
  };

  useEffect(() => {
    loadData();
  }, [selectedValueClient, loadData]);

  return (
    <>
      <S.Container>
        <h1>Lista de Preferências</h1>
        <S.Search>
          <div className="filter">
            <Select
              isClearable
              value={selectedValueClient}
              options={clientOptions}
              onChange={setSelectedValueClient}
              placeholder="Selecione o cliente"
            />
            <Button onClick={searchPreferences} disabled={!selectedValueClient}>Buscar</Button>
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
                  price={data.product.price}
                  title={data.product.title}
                  description={data.product.description}
                  onDelete={() => handleRemove(data)}
                />
              ))}
            </ul>
          </S.Tasks>
        ) : (
          <S.NoData>Não há preferências para exibir</S.NoData>
        )}
      </S.Container>

      <RemovePreferenceModal
        isOpen={isRemoveModalOpen}
        setData={setPreferencesData}
        onRequestClose={closeRemoveModal}
        client={selectedValueClient?.label}
        id={selectedPreference?.id.toString()}
      />
    </>
  );
};