import { useEffect, useState } from 'react';
import { Alert, Button, productViewModel, useModal, ProductService } from '../../shared';
import { AddProductModal, EditProductModal, Table, RemoveProductModal } from './components';

import * as S from './styles'

export const Product = () => {
  const [data, setData] = useState<productViewModel[]>([])
  const [selectedProduct, setSelectedProduct] = useState<productViewModel>();

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal();
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useModal();

  const handleEdit = (product: productViewModel) => {
    setSelectedProduct(product);
    openEditModal();
  };

  const handleRemove = (product: productViewModel) => {
    setSelectedProduct(product);
    openRemoveModal();
  };

  const loadData = async () => {
    try {
      const response = await ProductService.getAll();
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
          <h1>Listagem de produtos</h1>
        </S.Content>

        <S.ButtonGroup>
          <Button onClick={openAddModal}>Novo Produto</Button>
        </S.ButtonGroup>
      </S.Header>

      {data.length !== 0 ? (

        <S.Tasks>
          <ul>
            {data.map(data => (
              <Table
                key={data.id}
                price={data.price}
                title={data.title}
                description={data.description}
                onEdit={() => handleEdit(data)}
                onDelete={() => handleRemove(data)}
              />
            ))}
          </ul>
        </S.Tasks>
      ) : (
        <S.NoData>
          Não há produtos para exibir
        </S.NoData>
      )}

      <AddProductModal
        setData={setData}
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />

      <EditProductModal
        setData={setData}
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        id={selectedProduct?.id.toString()}
      />

      <RemoveProductModal
        setData={setData}
        isOpen={isRemoveModalOpen}
        title={selectedProduct?.title}
        onRequestClose={closeRemoveModal}
        id={selectedProduct?.id.toString()}
      />
    </S.Container>
  )
}