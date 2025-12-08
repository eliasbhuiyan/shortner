const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

function isValidUrl(url) {
  const pattern = new RegExp(
    "^https?:\\/\\/" +
      "([\\w-]+\\.)+[\\w-]+" +
      "(\\:[0-9]{1,5})?" +
      "(\\/[^\\s]*)?$",
    "i"
  );

  return pattern.test(url);
}

module.exports = { isValidEmail, isValidUrl };
