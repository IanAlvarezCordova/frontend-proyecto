// src/components/inventarios/InventoryUpdate.tsx
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { createMovimiento } from "../../services/movimiento.service";
import { Producto, MovimientoInventario } from "../../types/types";

interface InventoryUpdateProps {
  product: Producto;
  onSuccess: () => void;
}

interface MovementFormData {
  id_producto: number; // Cambiamos a number, ya que el formulario maneja el ID
  tipo_movimiento: "entrada" | "salida" | "ajuste";
  cantidad: number;
  motivo: string;
}

export const InventoryUpdate: React.FC<InventoryUpdateProps> = ({ product, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<MovementFormData>({
    defaultValues: {
      id_producto: product.id_producto, // Ahora es un number
      tipo_movimiento: undefined,
      cantidad: undefined,
      motivo: "",
    },
  });
  const toast = useToast();

  const onSubmit = async (data: MovementFormData) => {
    try {
      const currentStock = product.stock_actual ?? 0;
      const cantidad = Number(data.cantidad);
      if (data.tipo_movimiento === "salida" && currentStock - cantidad < 0) {
        setError("cantidad", { type: "manual", message: "No hay suficiente stock para esta salida" });
        return;
      }

      const movimientoData: Partial<MovimientoInventario> = {
        id_producto: { id_producto: data.id_producto }, // Transformamos a objeto Producto para el backend
        tipo_movimiento: data.tipo_movimiento,
        cantidad: data.cantidad,
        motivo: data.motivo,
        id_usuario: { id_usuario: 1 }, // Valor fijo para MVP
        fecha_movimiento: new Date().toISOString(),
      };

      await createMovimiento(movimientoData);
      reset({
        id_producto: product.id_producto,
        tipo_movimiento: undefined,
        cantidad: undefined,
        motivo: "",
      });
      onSuccess();
      toast({
        title: "Éxito",
        description: "Movimiento registrado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar el movimiento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={4}>Actualizar Stock - {product.nombre}</Text>
      <Text mb={2}>Stock Actual: {product.stock_actual ?? 0}</Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.id_producto}>
            <FormLabel>Producto</FormLabel>
            <Select {...register("id_producto")} isDisabled>
              <option value={product.id_producto}>{product.nombre}</option>
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
            <Input
              type="number"
              {...register("cantidad", {
                required: "Cantidad es obligatoria",
                min: { value: 1, message: "Debe ser mayor a 0" },
              })}
            />
            <FormErrorMessage>{errors.cantidad?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.motivo}>
            <FormLabel>Motivo</FormLabel>
            <Input {...register("motivo", { required: "Motivo es obligatorio" })} />
            <FormErrorMessage>{errors.motivo?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Actualizar Stock
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};