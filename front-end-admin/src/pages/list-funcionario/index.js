import { Table, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import FuncionarioPDF from "../../relatorios/funcionario";
import mascaraTel from "../../controle/mask";

const ListaFuncionario = () => {
  const [funcionario, setFuncionario] = useState([]);

  const getFuncionario = async () => {
    try {
      const response = await axios.get("http://localhost:3002/funcionario");
      const data = response.data;
      setFuncionario(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFuncionario();
  }, []);

  async function Deletar(e) {
    await axios.delete(`http://localhost:3002/funcionario/${e}`);
    await getFuncionario();
  }

  return (
    <div className="titulo">
      <h1>Funcionarios cadastrados</h1>
      <Button
        onClick={(e) => FuncionarioPDF(funcionario)}
        className="btn"
        color="danger"
        size="lg"
      >
        Gerar PDF
      </Button>
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Telefone</th>
              <th>Bairro</th>
              <th>Rua</th>
              <th>Numero</th>
            </tr>
          </thead>

          {funcionario.length > 0 &&
            funcionario.map((f) => (
              <tbody>
                <tr key={f.id}>
                  <td>{f.nome}</td>
                  <td>{f.cargo}</td>
                  <td>{f.telefone}</td>
                  <td>{f.bairro}</td>
                  <td>{f.rua}</td>
                  <td>{f.numero}</td>

                  <td>
                    <button onClick={() => Deletar(f._id)}>
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
export default ListaFuncionario;
