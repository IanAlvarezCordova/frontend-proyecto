// src/components/productos/ProductForm.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { createProducto, updateProducto } from "../../services/producto.service";
import { getCategorias } from "../../services/categoria.service";
import { getEmpresas } from "../../services/empresa.service";
import { Producto, Categoria, Empresa } from "../../types/types";

interface ProductFormProps {
  product?: Producto;
  onSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Producto>>({
    defaultValues: product || {},
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriasData = await getCategorias();
      const empresasData = await getEmpresas();
      setCategorias(categoriasData);
      setEmpresas(empresasData);
    };
    fetchData();
  }, []);

  const onSubmit = async (data: Partial<Producto>) => {
    try {
      if (product) {
        await updateProducto(product.id_producto, data);
      } else {
        await createProducto(data);
      }
      onSuccess();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} p={4}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.nombre}>
          <FormLabel>Nombre</FormLabel>
          <Input {...register("nombre", { required: "Nombre es obligatorio" })} />
          <FormErrorMessage>{errors.nombre?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.codigo_barras}>
          <FormLabel>Código de Barras</FormLabel>
          <Input {...register("codigo_barras", { required: "Código de barras es obligatorio" })} />
          <FormErrorMessage>{errors.codigo_barras?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.id_categoria}>
          <FormLabel>Categoría</FormLabel>
          <Select {...register("id_categoria", { required: "Categoría es obligatoria" })}>
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.id_categoria?.message}</FormErrorMessage>
        </FormControl>
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
          <FormErrorMessage>{errors.id_empresa?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.precio_venta}>
          <FormLabel>Precio Venta</FormLabel>
          <Input type="number" {...register("precio_venta", { required: "Precio es obligatorio" })} />
          <FormErrorMessage>{errors.precio_venta?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          {product ? "Actualizar" : "Crear"}
        </Button>
      </VStack>
    </Box>
  );
};