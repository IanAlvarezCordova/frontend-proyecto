// src/components/movimientos/MovementForm.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "react-hook-form";
import { createMovimiento } from "../../services/movimiento.service";
import { getProductos } from "../../services/producto.service";
import { MovimientoInventario, Producto } from "../../types/types";

interface MovementFormProps {
  onSuccess: () => void;
}

export const MovementForm: React.FC<MovementFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<MovimientoInventario>>({
    defaultValues: {
      id_producto: undefined,
      tipo_movimiento: undefined,
      cantidad: undefined,
      motivo: "",
    },
  });
  const [productos, setProductos] = useState<Producto[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchProductos();
  }, [toast]);

  const onSubmit = async (data: Partial<MovimientoInventario>) => {
    try {
      const movimientoData: Partial<MovimientoInventario> = {
        ...data,
        id_usuario: { id_usuario: 1 }, // Solo el ID, permitido por Partial<Usuario>
        fecha_movimiento: new Date().toISOString(), // Fecha actual
      };
      await createMovimiento(movimientoData);
      reset({
        id_producto: undefined,
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
      console.error("Error al registrar movimiento:", error);
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
      <Text fontWeight="bold" mb={4}>Registrar Movimiento</Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
            Registrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};