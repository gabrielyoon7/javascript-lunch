import IRestaurant from "../type/IRestaurant";
import RestaurantItem from "./RestaurantItem";
import LocalStorage from "../utils/LocalStorage";
import defaultRestaurants from "../tools/defaultRestaurants";
import { TCategory } from "../type/TCategory";

class RestaurantList extends HTMLElement {
  listState: { restaurants: IRestaurant[]; filter: TCategory; sort: string };

  constructor() {
    super();
    this.listState = new Proxy(
      { restaurants: [], filter: "all", sort: "name" },
      {
        set: (obj, prop, value) => {
          // type-guard
          if (prop === "restaurants" || prop === "filter" || prop === "sort") {
            obj[prop] = value;
          }
          this.render();
          return true;
        },
      }
    );
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    const restaurants = LocalStorage.getLocalStorage("restaurants");
    this.listState.restaurants =
      restaurants.length > 0 ? restaurants : defaultRestaurants;
  }

  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.restaurantItems(this.selectRestaurants())}
        </ul>
      </section>
    `;
  }

  selectRestaurants() {
    const { restaurants, filter, sort } = this.listState;
    return restaurants
      .filter(
        (restaurant) => filter === "all" || restaurant.category === filter
      )
      .sort((a: IRestaurant, b: IRestaurant) => {
        if (sort === "name" || sort === "distance") {
          return a[sort] > b[sort] ? 1 : -1;
        }
        return 0;
      });
  }

  restaurantItems(selectedRestaurants: IRestaurant[]) {
    return selectedRestaurants
      .map((restaurant) => RestaurantItem(restaurant))
      .join("");
  }

  addRestaurant(newRestaurant: IRestaurant) {
    this.listState.restaurants = [...this.listState.restaurants, newRestaurant];
    LocalStorage.setLocalStorage("restaurants", this.listState.restaurants);
  }

  filterBy(key: TCategory) {
    this.listState.filter = key;
  }

  sortBy(key: string) {
    this.listState.sort = key;
  }
}

export default RestaurantList;
