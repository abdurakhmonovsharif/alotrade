export const onScroll = ({
  e,
  setCurrentPage,
  currentPage,
  countPage,
  datas,
}) => {
  const bottom =
    e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  bottom &&
    (currentPage + 1) * countPage === datas.length &&
    setCurrentPage(currentPage + 1);
};
