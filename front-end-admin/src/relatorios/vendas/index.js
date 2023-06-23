import pdfMafe from "pdfmake/build/pdfmake";
import pdffonts from "pdfmake/build/vfs_fonts";

function VendasPDF(vendas) {
  pdfMafe.vfs = pdffonts.pdfMake.vfs;
  const titulo = [
    {
      text: "Vendas",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const dados = vendas.map((v) => {
    return [
      {
        text: v.cliente,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
      {
        text: v.funcionario,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
      {
        text: v.procedimento,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
      {
        text: v.formaPagamento,
        style: "tableHeader",
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
      {
        text: v.valor,
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
        widths: ["*", "*", "*", "*", "*"],
        body: [
          [
            { text: "Cliente", style: "tableHeader", fontSize: 10 },
            { text: "Funcionario", style: "tableHeader", fontSize: 10 },
            { text: "Procedimento", style: "tableHeader", fontSize: 10 },
            { text: "Forma pagamento", style: "tableHeader", fontSize: 10 },
            { text: "Valor", style: "tableHeader", fontSize: 10 },
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

export default VendasPDF;
