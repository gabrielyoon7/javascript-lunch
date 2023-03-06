/**
 * @jest-environment jsdom
 */
import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { categoryChinese } from "../src/assets";
import NavBar from "../src/components/NavBar";
import RestaurantList from "../src/components/RestaurantList";

describe("NavBar component 테스트", () => {
  test("NavBar가 잘 생성되었는지 확인한다.", () => {
    customElements.define("nav-bar", NavBar);
    document.body.innerHTML = `<nav-bar id="navBar"></nav-bar>`;
    const navBar = document.getElementById("navBar");
    expect(navBar).toBeInTheDocument();
  });
});

describe("RestaurantItem, RestaurantList component 테스트", () => {
  test("추가된 RestaurantItem이 RestaurantList에 있는지 확인한다.", () => {

    customElements.define("restaurant-list", RestaurantList);
    document.body.innerHTML = `
      <restaurant-list id="restaurantList"></restaurant-list>
    `;
    const restaurantList = document.getElementById("restaurantList");

    restaurantList.addRestaurant({
      category: "중식",
      name: "봉피양",
      distance: 10,
      description: "왕",
    });
    const result = `봉피양`;
    expect(restaurantList).toContainHTML(result);
  });
});
