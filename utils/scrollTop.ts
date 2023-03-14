export const scrollTop = (y = 0) =>
  window.scroll({
    top: y,
    left: 0,
    behavior: "smooth",
  });
