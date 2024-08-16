import { showLoading } from "./toggleLoading.js";
import { hideLoading } from "./toggleLoading.js";

// showLoading();
export const body = document.querySelector(".section-center");

export const mainUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a";

export default async function myfetch() {
  hideLoading(); // Ensure this function is available in this context or import it if needed

  const response = await fetch(mainUrl);
  const showlink = await response.json();

  const drinks = showlink.drinks;
  const mapping = drinks
    .map((drink) => {
      const { idDrink: id, strDrink: name, strDrinkThumb: img } = drink;
      return `<a href="drink.html">
            <article class="cocktail" data-id="${id}">
              <img src="${img}" alt="${name}" />
              <h3 class="title">${name}</h3>
            </article>
          </a>`;
    })
    .join("");

  const body = document.querySelector(".section-center");
  body.innerHTML = mapping;

  // Add event listeners for the cocktail elements
  const cocktails = document.querySelectorAll(".cocktail");
  cocktails.forEach((cocktail) => {
    cocktail.addEventListener("click", (e) => {
      // e.preventDefault();

      const id = e.currentTarget.dataset.id;
      localStorage.setItem("drink", id);

      const myText = id.querySelector(".title").textContent;
      const filtering = drinks.filter((list) => {
        const myvalue = list.strDrink;
        return myvalue.includes(myText);
      });
    });
  });

  return body;
}

myfetch();
