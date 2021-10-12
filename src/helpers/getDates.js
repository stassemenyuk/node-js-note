function getDates(text) {
  let datePattern = /\d+\/\d+\/\d+/;
  return (dates = datePattern.exec(text) || '-');
}

module.exports = getDates;
