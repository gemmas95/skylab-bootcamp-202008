const ACTION_TYPES: { CART: { ADD_TO_CART: string, REMOVE_FROM_CART: string }, TOTAL_CART: { CALCULATE_CART: string } } = {
  CART: {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART'
  },
  TOTAL_CART: {
    CALCULATE_CART: 'CALCULATE_CART'
  }
}

export default ACTION_TYPES;