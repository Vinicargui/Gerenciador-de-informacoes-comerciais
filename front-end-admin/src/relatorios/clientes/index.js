import pdfMafe from "pdfmake/build/pdfmake";
import pdffonts from "pdfmake/build/vfs_fonts";

function ClientesPDF(clientes) {
  pdfMafe.vfs = pdffonts.pdfMake.vfs;
  const titulo = [
    {
      text: "Clientes",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const dados = clientes.map((cliente) => {
    return [
      {
        text: cliente.nome,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
      {
        text: cliente.telefone,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
      {
        text: cliente.email,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const conteudo = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*"],
        body: [
          [
            { text: "Nome", style: "tableHeader", fontSize: 10 },
            { text: "Telefone", style: "tableHeader", fontSize: 10 },
            { text: "Email", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "headerLineOnly",
    },
  ];

  function rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "right",
        fontSize: 10,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const documento = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [titulo],
    content: [conteudo],
    footer: rodape,
  };

  pdfMafe.createPdf(documento).download();
}

export default ClientesPDF;
