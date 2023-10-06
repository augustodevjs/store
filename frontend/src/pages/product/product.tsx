import { useEffect, useState } from 'react';
import * as S from './styles'
import { Alert, Button, productViewModel, useModal } from '../../shared';
import { ProductService } from '../../shared/services';
import { AddProductModal, EditProductModal, Table } from './components';
import { RemoveProductModal } from './components/remove-product-modal/remove-product-modal';

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
          <h1>Cadastro de Produtos</h1>
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
                title={data.title}
                description={data.description}
                price={data.price}
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

      <AddProductModal
        setData={setData}
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />

      <RemoveProductModal
        id={selectedProduct?.id.toString()}
        setData={setData}
        title={selectedProduct?.title}
        isOpen={isRemoveModalOpen}
        onRequestClose={closeRemoveModal}
      />

      <EditProductModal
        setData={setData}
        id={selectedProduct?.id.toString()}
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
      />
    </S.Container>
  )
}