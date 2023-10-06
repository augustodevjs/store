import * as S from './styles'
import { Alert, Button, clientViewModel, useModal } from "../../shared"
import { AddClientModal, Table, RemoveClientModal, EditClientModal } from "./components"
import { useEffect, useState } from 'react'
import { ClientService } from '../../shared/services'

export const Client = () => {
  const [data, setData] = useState<clientViewModel[]>([])
  const [selectedClient, setSelectedClient] = useState<clientViewModel>();

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal();
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useModal();

  const handleEdit = (list: clientViewModel) => {
    setSelectedClient(list);
    openEditModal();
  };

  const handleRemove = (list: clientViewModel) => {
    setSelectedClient(list);
    openRemoveModal();
  };

  const loadData = async () => {
    try {
      const response = await ClientService.getAll();
      setData(response)
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

  return (
    <S.Container>
      <S.Header>
        <S.Content>
          <h1>Cadastro de Clientes</h1>
        </S.Content>

        <S.ButtonGroup>
          <Button onClick={openAddModal}>Novo Cliente</Button>
        </S.ButtonGroup>
      </S.Header>

      {data.length !== 0 ? (

        <S.Tasks>
          <ul>
            {data.map(data => (
              <Table
                key={data.id}
                name={data.name}
                cpf={data.cpf}
                email={data.email}
                onDelete={() => handleRemove(data)}
                onEdit={() => handleEdit(data)}
              />
            ))}
          </ul>
        </S.Tasks>
      ) : (
        <S.NoData>
          Não há registros para exibir
        </S.NoData>
      )}

      <AddClientModal
        setData={setData}
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />

      <RemoveClientModal
        id={selectedClient?.id.toString()}
        setData={setData}
        name={selectedClient?.name}
        isOpen={isRemoveModalOpen}
        onRequestClose={closeRemoveModal}
      />

      <EditClientModal
        setData={setData}
        id={selectedClient?.id.toString()}
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
      />
    </S.Container>
  )
}