export const state = () => ({
  products: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 5,
      reviews: 10,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 2,
      reviews: 3,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 1,
      reviews: 0,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 4,
      reviews: 2,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 6,
      title: 'Product 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 5,
      reviews: 1,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 7,
      title: 'Product 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 5,
      reviews: 7,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 8,
      title: 'Product 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 3,
      reviews: 0,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 9,
      title: 'Product 9',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 4,
      reviews: 2,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    }
  ],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: '',
    role: null
  },
  systemInfo: {
    openModal: {
      open: false,

      /*
      * type accepts:
      * 0 -> Signup
      * 1 -> Login
      * 2 -> Checkout
      */
      type: null
    }
  }
})

export const getters = {
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.products.find(product => product.id == id);
  },
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isModalOpen: state => {
    return state.systemInfo.openModal.open;
  },
  modalType: state => {
    return state.systemInfo.openModal.type;
  },
  quantity: state => {
    return state.products.quantity;
  },
  getUserRole: state => {
    return state.userInfo.role;
  },
  isAdmin: state => {
    if (state.userInfo.role === 1) {
      return true;
    } else {
      return false;
    }
  }
}

export const mutations = {
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showModal: (state, data) => {
    state.systemInfo.openModal.open = data.show;
    state.systemInfo.openModal.type = data.type;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  setUserRole: (state, userRole) => {
    state.userInfo.role = userRole;
  }
}
/*
export const actions = {
  async nuxtServerInit({ commit }) {
    const res = await this.$axios.get("/api/current_user")
    commit("SET_USER", res.data)
  },

  async logout({ commit }) {
    const { data } = await this.$axios.get("/api/logout")
    if (data.ok) commit("SET_USER", null)
  },

  async handleToken({ commit }, token) {
    const res = await this.$axios.post("/api/stripe", token)
    commit("SET_USER", res.data)
  }
} */
