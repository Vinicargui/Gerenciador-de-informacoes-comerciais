function mascaraTel(e) {
  e.currentTarget.maxLength = 11;
  let tel = e.currentTarget.value;
  tel = tel.replece(/\D/g, "");
  tel = tel.replece(/^\d{5}(\d)/, "$1-$2");
  e.currentTarget.value = tel;
  return e;
}

export default mascaraTel;
