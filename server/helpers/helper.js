function editDescription(str, base_url) {
  return `${str
    .split(".")
    .slice(0, 3)
    .join(". ")}<a href="${base_url}">Подробнее...</a>`;
}

module.exports = { editDescription };
