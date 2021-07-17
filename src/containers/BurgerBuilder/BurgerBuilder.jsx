import React, { Component } from "react";
import Aux from "../../hoc/Auxiliaire/Auxiliaire";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },

    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  _purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  _purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  _purchaseContinueHandler = () => {
    // console.log("Continue ....");
    this.setState({ loading: true });
    const orders = {
      ingrendients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: "Teddy walter",
        address: {
          street: "Office 2",
          zipcode: "23434",
          country: "DRC",
        },
        email: "teddywalter2016@gmail.com",
      },
      deliveryMethod: "fatest",
    };
    axios
      .post("/orders.json", orders)
      .then((response) => {
        this.setState({ loading: false, purchasing: false  });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };
  _updatePurchasableState() {
    const ingredients = {
      ...this.state.ingredients,
    };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  _addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState(
      {
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      },
      () => this._updatePurchasableState()
    );
  };

  _removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState(
      {
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      },
      () => this._updatePurchasableState()
    );
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this._purchasingCancelHandler}
        purchaseContinued={this._purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this._purchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this._addIngredientHandler}
          ingredientRemoved={this._removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this._purchasingHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
