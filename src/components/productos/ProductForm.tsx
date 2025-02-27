// src/components/productos/ProductForm.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Select } from "@chakra-ui/select";
import { createProducto, updateProducto } from "../../services/producto.service";
import { getCategorias } from "../../services/categoria.service";
import { getEmpresas } from "../../services/empresa.service";
import { Producto, Categoria, Empresa } from "../../types/types";

interface ProductFormProps {
  product?: Producto | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<Producto>>({
    defaultValues: {
      nombre: "",
      codigo_barras: "",
      id_categoria: undefined,
      id_empresa: undefined,
      precio_venta: undefined,
      descripcion: "",
      precio_compra: undefined,
      stock_minimo: undefined,
      stock_maximo: undefined,
    },
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasData, empresasData] = await Promise.all([getCategorias(), getEmpresas()]);
        setCategorias(categoriasData);
        setEmpresas(empresasData);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar categorías o empresas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchData();
  }, [toast]);

  useEffect(() => {
    if (product) {
      reset({
        nombre: product.nombre || "",
        codigo_barras: product.codigo_barras || "",
        id_categoria: typeof product.id_categoria === "object" ? product.id_categoria.id_categoria : product.id_categoria,
        id_empresa: typeof product.id_empresa === "object" ? product.id_empresa.id_empresa : product.id_empresa,
        precio_venta: product.precio_venta || undefined,
        descripcion: product.descripcion || "",
        precio_compra: product.precio_compra || undefined,
        stock_minimo: product.stock_minimo || undefined,
        stock_maximo: product.stock_maximo || undefined,
      });
    } else {
      reset({
        nombre: "",
        codigo_barras: "",
        id_categoria: undefined,
        id_empresa: undefined,
        precio_venta: undefined,
        descripcion: "",
        precio_compra: undefined,
        stock_minimo: undefined,
        stock_maximo: undefined,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: Partial<Producto>) => {
    try {
      if (product) {
        await updateProducto(product.id_producto, data);
        toast({
          title: "Éxito",
          description: "Producto actualizado correctamente.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createProducto(data);
        toast({
          title: "Éxito",
          description: "Producto creado correctamente.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      // Limpieza completa tras éxito
      reset({
        nombre: "",
        codigo_barras: "",
        id_categoria: undefined,
        id_empresa: undefined,
        precio_venta: undefined,
        descripcion: "",
        precio_compra: undefined,
        stock_minimo: undefined,
        stock_maximo: undefined,
      });
      onSuccess();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el producto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    // Limpieza completa al cancelar
    reset({
      nombre: "",
      codigo_barras: "",
      id_categoria: undefined,
      id_empresa: undefined,
      precio_venta: undefined,
      descripcion: "",
      precio_compra: undefined,
      stock_minimo: undefined,
      stock_maximo: undefined,
    });
    onCancel();
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={4}>{product ? "Editar Producto" : "Crear Nuevo Producto"}</Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.nombre}>
            <FormLabel>Nombre</FormLabel>
            <Input {...register("nombre", { required: "Nombre es obligatorio" })} />
            <FormErrorMessage>{errors.nombre?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.codigo_barras}>
            <FormLabel>Código de Barras</FormLabel>
            <Input {...register("codigo_barras", { required: "Código es obligatorio" })} />
            <FormErrorMessage>{errors.codigo_barras?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.descripcion}>
            <FormLabel>Descripción</FormLabel>
            <Input {...register("descripcion")} />
            <FormErrorMessage>{errors.descripcion?.message}</FormErrorMessage>
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
          <FormControl isInvalid={!!errors.precio_compra}>
            <FormLabel>Precio Compra</FormLabel>
            <Input
              type="number"
              {...register("precio_compra", { required: "Precio compra es obligatorio" })}
            />
            <FormErrorMessage>{errors.precio_compra?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.precio_venta}>
            <FormLabel>Precio Venta</FormLabel>
            <Input
              type="number"
              {...register("precio_venta", { required: "Precio venta es obligatorio" })}
            />
            <FormErrorMessage>{errors.precio_venta?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.stock_minimo}>
            <FormLabel>Stock Mínimo</FormLabel>
            <Input
              type="number"
              {...register("stock_minimo", { required: "Stock mínimo es obligatorio" })}
            />
            <FormErrorMessage>{errors.stock_minimo?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.stock_maximo}>
            <FormLabel>Stock Máximo</FormLabel>
            <Input
              type="number"
              {...register("stock_maximo", { required: "Stock máximo es obligatorio" })}
            />
            <FormErrorMessage>{errors.stock_maximo?.message}</FormErrorMessage>
          </FormControl>
          <VStack spacing={4} width="full">
            <Button type="submit" colorScheme="teal" flex={1}>
              {product ? "Actualizar" : "Crear"}
            </Button>
            <Button colorScheme="gray" flex={1} onClick={handleCancel}>
              Cancelar
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};