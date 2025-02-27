// src/components/pedidos/OrderForm.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "react-hook-form";
import { createPedido, updatePedido } from "../../services/pedido.service";
import { getEmpresas } from "../../services/empresa.service";
import { Pedido, Empresa } from "../../types/types";

interface OrderFormProps {
  order?: Pedido | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ order, onSuccess, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<Pedido>>({
    defaultValues: order || {},
  });
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas();
        setEmpresas(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las empresas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchEmpresas();
  }, []);

  useEffect(() => {
    reset(order || {
      id_empresa: undefined,
      fecha_solicitud: "",
      fecha_entrega: "",
      estado: undefined,
    });
  }, [order, reset]);

  const onSubmit = async (data: Partial<Pedido>) => {
    try {
      if (order) {
        await updatePedido(order.id_pedido, data);
      } else {
        await createPedido(data);
      }
      reset({
        id_empresa: undefined,
        fecha_solicitud: "",
        fecha_entrega: "",
        estado: undefined,
      });
      onSuccess();
      toast({
        title: "Éxito",
        description: "Pedido guardado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el pedido.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={4}>{order ? "Editar Pedido" : "Crear Nuevo Pedido"}</Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.id_empresa}>
            <FormLabel>Empresa</FormLabel>
            <Select {...register("id_empresa", { required: "Empresa es obligatoria" })}>
              <option value="">Selecciona una empresa</option>
              {empresas.map((emp) => (
                <option key={emp.id_empresa} value={emp.id_empresa}>
                  {emp.nombre}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.id_empresa?.message as string}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.fecha_solicitud}>
            <FormLabel>Fecha de Solicitud</FormLabel>
            <Input type="date" {...register("fecha_solicitud", { required: "Fecha es obligatoria" })} />
            <FormErrorMessage>{errors.fecha_solicitud?.message as string}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.fecha_entrega}>
            <FormLabel>Fecha de Entrega</FormLabel>
            <Input type="date" {...register("fecha_entrega", { required: "Fecha es obligatoria" })} />
            <FormErrorMessage>{errors.fecha_entrega?.message as string}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.estado}>
            <FormLabel>Estado</FormLabel>
            <Select {...register("estado", { required: "Estado es obligatorio" })}>
              <option value="">Selecciona un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </Select>
            <FormErrorMessage>{errors.estado?.message as string}</FormErrorMessage>
          </FormControl>
          <VStack spacing={4} width="full">
            <Button type="submit" colorScheme="teal" flex={1}>
              {order ? "Actualizar" : "Crear"}
            </Button>
            <Button colorScheme="gray" flex={1} onClick={onCancel}>
              Cancelar
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};