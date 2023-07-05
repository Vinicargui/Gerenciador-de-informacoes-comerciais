import { Table, Button } from "reactstrap";
import { useState, useEffect } from "react";

import "./style.css";
import axios from "axios";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import formataValores from "../../controle/valores";

const ListaProcedimento = () => {
  const [procedimento, setProcedimento] = useState([]);

  const getProcedimento = async () => {
    try {
      const response = await axios.get("http://localhost:3002/procedimento");
      const data = response.data;
      setProcedimento(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProcedimento();
  }, []);

  async function Deletar(e) {
    await axios.delete(`http://localhost:3002/procedimento/${e}`);
    await getProcedimento();
  }

  return (
    <div className="titulo">
      <h1>Procedimentos Cadastrados</h1>
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>excluir</th>
            </tr>
          </thead>

          {procedimento.length > 0 &&
            procedimento.map((p) => (
              <tbody>
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{formataValores("pt-BR", "BRL", p.valor)}</td>
                  <td>
                    <button onClick={() => Deletar(p._id)}>
                      <BsFillTrashFill />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  );
};
export default ListaProcedimento;
