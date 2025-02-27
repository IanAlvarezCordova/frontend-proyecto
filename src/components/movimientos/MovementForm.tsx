// src/components/movimientos/MovementForm.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { createMovimiento } from "../../services/movimiento.service";
import { getProductos } from "../../services/producto.service";
import { MovimientoInventario, Producto } from "../../types/types";

interface MovementFormProps {
  onSuccess: () => void;
}

export const MovementForm: React.FC<MovementFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<MovimientoInventario>>({});
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const onSubmit = async (data: Partial<MovimientoInventario>) => {
    try {
      await createMovimiento(data);
      onSuccess();
    } catch (error) {
      console.error("Error al crear movimiento:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} p={4}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.id_producto}>
          <FormLabel>Producto</FormLabel>
          <Select {...register("id_producto", { required: "Producto es obligatorio" })}>
            <option value="">Selecciona un producto</option>
            {productos.map((prod) => (
              <option key={prod.id_producto} value={prod.id_producto}>
                {prod.nombre}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.id_producto?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.tipo_movimiento}>
          <FormLabel>Tipo de Movimiento</FormLabel>
          <Select {...register("tipo_movimiento", { required: "Tipo es obligatorio" })}>
            <option value="">Selecciona un tipo</option>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
            <option value="ajuste">Ajuste</option>
          </Select>
          <FormErrorMessage>{errors.tipo_movimiento?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.cantidad}>
          <FormLabel>Cantidad</FormLabel>
          <Input type="number" {...register("cantidad", { required: "Cantidad es obligatoria" })} />
          <FormErrorMessage>{errors.cantidad?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.motivo}>
          <FormLabel>Motivo</FormLabel>
          <Input {...register("motivo", { required: "Motivo es obligatorio" })} />
          <FormErrorMessage>{errors.motivo?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Crear Movimiento
        </Button>
      </VStack>
    </Box>
  );
};