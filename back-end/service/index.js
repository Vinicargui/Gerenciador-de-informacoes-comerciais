function formataData(e) {
  let data = new Date(e);
  return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
}

module.exports = { formataData };
