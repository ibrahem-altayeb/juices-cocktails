const single = document.querySelector(".single-drink");

const id = localStorage.getItem("drink");

const fetchElement = async () => {
  if (!id) {
    window.location.replace("index.html");
  } else {
    const drink = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const showDrink = await drink.json();
    const inside = showDrink.drinks;
    const map = inside
      .map((item) => {
        const {
          strDrinkThumb: img,
          strDrink: name,
          strInstructionsDE: p,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
        } = item;

        return `  <img src="${img}" class="drink-img" alt="" />
 <article class="drink-info">
   <h2 class="drink-name">${name}</h2>
   <p class="drink-desc">${p}</p>
   <ul class="drink-ingredients">${strIngredient1}</ul>
   <ul class="drink-ingredients">${strIngredient2}</ul>
   <ul class="drink-ingredients">${strIngredient3}</ul>
   <ul class="drink-ingredients">${strIngredient4}</ul>
   <a href="index.html" class="btn">all cocktails</a>
 </article>`;
      })
      .join("");
    const check = document.querySelectorAll("ul");
    console.log(check);

    single.innerHTML = map;
  }
};
export default fetchElement();
// strAlcoholic
// strCategory
