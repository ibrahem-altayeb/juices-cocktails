import { mainUrl } from "./displayDrinks.js";
import { body } from "./displayDrinks.js";
import myfecth from "./displayDrinks.js";
import { showLoading } from "./toggleLoading.js";
import { hideLoading } from "./toggleLoading.js";

const links = mainUrl;

const form = document.querySelector(".search-form");
const input = document.querySelector("[name=drink]");

// showLoading();
export async function fetching() {
  hideLoading();
  const access = await fetch(links);

  const showlink = await access.json();

  const myObject = showlink.drinks;

  form.addEventListener("keyup", function () {
    const valueInput = input.value;
    if (valueInput.length > 0) {
      // showLoading();
      const filter = myObject.filter((list) => {
        const myvalue = list.strDrink;
        return myvalue.includes(valueInput);
      });
      const mapFilter = filter
        .map((list) => {
          const { idDrink: id, strDrink: name, strDrinkThumb: img } = list;

          return `<a href="drink.html">
          <article class="cocktail" data-id="${id}">
            <img src="${img}" alt="${name}" />
            <h3 class="title">${name}</h3>
          </article>
        </a>`;
        })
        .join("");

      body.innerHTML = mapFilter;
      const bodyy = document.querySelectorAll(".cocktail");
      bodyy.forEach((item) => {
        item.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          localStorage.setItem("drink", id);
          const myText = id.querySelector(".title").textContent;
          const filtering = myObject.filter((list) => {
            const myvalue = list.strDrink;
            return myvalue.includes(myText);
          });
        });
      });

      if (body.childElementCount === 0) {
        body.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
      }
    } else {
      myfecth();
    }
  });
}
fetching();

// hideLoading();
