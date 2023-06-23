// import React from "react";
// import axios from "axios";
import { useState, useEffect } from "react";
// import FormAgenda from "../pages/form-agenda";

export const useNome = () => {
  const [nomes, setNome] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/nomefuncionario")
      .then((response) => response.json())
      .then((data) => setNome(data));
  }, []);

  return {
    nomes,
  };
};

// function GetFuncionarioAgenda() {
//   const [nome, setNome] = useState([]);

//   const getNomeFuncionario = async () => {
//     try {
//       const response = await axios.get("http://localhost:3002/nomefuncionario");
//       const nomeServidor = response.data;
//       if (nomeServidor !== nome) {
//         setNome(nomeServidor);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (nome.length !== 0) {
//       getNomeFuncionario();
//     }
//   }, [nome]);

//   useEffect(() => {
//     getNomeFuncionario();
//   }, []);

//   return (
//     <div>
//       {nome.length > 0 &&
//         nome.map((nomeFuncioario) => <FormAgenda nome={nomeFuncioario.nome} />)}
//     </div>
//   );
// }

// export default GetFuncionarioAgenda;
