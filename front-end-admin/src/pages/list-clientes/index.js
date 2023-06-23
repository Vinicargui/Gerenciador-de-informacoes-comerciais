import { Table, Button } from "reactstrap";
import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import ClientesPDF from "../../relatorios/clientes";

const ListaClientes = () => {
  const [cliente, setCliente] = useState([]);

  const getCliente = async () => {
    try {
      const response = await axios.get("http://localhost:3002/cliente");
      const data = response.data;
      setCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCliente();
  }, []);

  async function Deletar(e) {
    await axios.delete(`http://localhost:3002/cliente/${e}`);
    await getCliente();
  }

  return (
    <div className="titulo">
      <h1>Clientes cadastrados</h1>
      <Button
        onClick={(e) => ClientesPDF(cliente)}
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
              <th>Telefone</th>
              <th>E-mail</th>
              <th>deletar</th>
            </tr>
          </thead>

          {cliente.length > 0 &&
            cliente.map((a) => (
              <tbody>
                <tr key={a.id}>
                  <td>{a.nome}</td>
                  <td>{a.telefone}</td>
                  <td>{a.email}</td>
                  <td>
                    <button onClick={() => Deletar(a._id)}>
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
export default ListaClientes;
