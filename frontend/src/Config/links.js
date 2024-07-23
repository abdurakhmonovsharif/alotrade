export const getTelegramLink = (link) => {
  if (link) {
    if (link.startsWith("@")) {
      return `https://t.me/${link.slice(1)}`;
    } else if (link.startsWith("https://t.me/")) {
      return link;
    } else {
      return `https://t.me/${link}`;
    }
  } else {
    return "";
  }
};

export const getInstagramLink = (link) => {
  if (link) {
    if (link.startsWith("@")) {
      return `https://instagram.com/${link.slice(1)}`;
    } else if (link.startsWith("https://instagram.com/")) {
      return link;
    } else {
      return `https://instagram.com/${link}`;
    }
  } else {
    return "";
  }
};
