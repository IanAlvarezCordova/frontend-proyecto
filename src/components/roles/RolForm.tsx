// // src/components/roles/RolForm.tsx
// import { Box, Button, Input } from "@chakra-ui/react";
// import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
// import {VStack} from "@chakra-ui/layout";
// import { useForm } from "react-hook-form";
// import { createRol, updateRol } from "../../services/rol.service";
// import { Rol } from "../../types/types";

// interface RolFormProps {
//   rol?: Rol;
//   onSuccess: () => void;
// }

// export const RolForm: React.FC<RolFormProps> = ({ rol, onSuccess }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<Partial<Rol>>({
//     defaultValues: rol || {},
//   });

//   const onSubmit = async (data: Partial<Rol>) => {
//     try {
//       if (rol) {
//         await updateRol(rol.id_rol, data);
//       } else {
//         await createRol(data);
//       }
//       onSuccess();
//     } catch (error) {
//       console.error("Error al guardar rol:", error);
//     }
//   };

//   return (
//     <Box as="form" onSubmit={handleSubmit(onSubmit)}>
//       <VStack spacing={4}>
//         <FormControl isInvalid={!!errors.nombre}>
//           <FormLabel>Nombre del Rol</FormLabel>
//           <Input {...register("nombre", { required: "Nombre es obligatorio" })} />
//           <FormErrorMessage>{errors.nombre?.message}</FormErrorMessage>
//         </FormControl>
//         <FormControl isInvalid={!!errors.descripcion}>
//           <FormLabel>Descripción</FormLabel>
//           <Input {...register("descripcion", { required: "Descripción es obligatoria" })} />
//           <FormErrorMessage>{errors.descripcion?.message}</FormErrorMessage>
//         </FormControl>
//         <Button type="submit" colorScheme="teal" width="full">
//           {rol ? "Actualizar" : "Crear"} Rol
//         </Button>
//       </VStack>
//     </Box>
//   );
// };