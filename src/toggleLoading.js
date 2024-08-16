const load = document.querySelector(".loading");

export const showLoading = () => {
  load.classList.remove("hide-loading");
};
export const hideLoading = () => {
  load.classList.add("hide-loading");
};
