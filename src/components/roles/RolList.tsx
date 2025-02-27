// // src/components/roles/RolList.tsx
// import { useEffect, useState } from "react";
// import { Box, Button,  TableCaption  } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";

// import { Table, Tbody, Thead, Tr, Td, Th } from "@chakra-ui/table"; // Importar desde @chakra-ui/table
// import { getRoles, deleteRol } from "../../services/rol.service";
// import { Rol } from "../../types/types";

// interface RolListProps {
//   refresh: boolean;
//   onEdit: (rol: Rol) => void;
// }

// export const RolList: React.FC<RolListProps> = ({ refresh, onEdit }) => {
//   const [roles, setRoles] = useState<Rol[]>([]);
//   const toast = useToast();

//   const fetchRoles = async () => {
//     try {
//       const data = await getRoles();
//       setRoles(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "No se pudieron cargar los roles.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, [refresh]);

//   const handleDelete = async (id: number) => {
//     if (confirm("¿Estás seguro de eliminar este rol?")) {
//       try {
//         await deleteRol(id);
//         setRoles(roles.filter((r) => r.id_rol !== id));
//         toast({
//           title: "Rol eliminado",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "No se pudo eliminar el rol.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     }
//   };

//   return (
//     <Box mt={6}>
//       <Table variant="striped" colorScheme="gray">
//         <TableCaption>Lista de roles</TableCaption>
//         <Thead>
//           <Tr>
//             <Th>ID</Th>
//             <Th>Nombre</Th>
//             <Th>Descripción</Th>
//             <Th>Acciones</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {roles.map((rol) => (
//             <Tr key={rol.id_rol}>
//               <Td>{rol.id_rol}</Td>
//               <Td>{rol.nombre}</Td>
//               <Td>{rol.descripcion}</Td>
//               <Td>
//                 <Button size="sm" colorScheme="blue" onClick={() => onEdit(rol)}>Editar</Button>
//                 <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(rol.id_rol)}>Eliminar</Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };