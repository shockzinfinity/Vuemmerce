<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
          <p v-if="!isUserLoggedIn" class="modal-card-title">{{ modalTitle }}</p>
          <p v-if="isUserLoggedIn" class="modal-card-title">{{ modalTitleLoggedIn }}</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <Notification :message="messageError" v-if="error" />
      <section class="modal-card-body">
        <LoginForm v-show="showLoginForm" ref="login"></LoginForm>
        <RegistrationForm v-show="showSignupForm" ref="signup"></RegistrationForm>
      </section>
      <footer class="modal-card-foot">
        <button v-if="!isUserLoggedIn" class="button is-info" @click="submitHandler">{{ primaryBtnLabel }}</button>
        <button v-if="isUserLoggedIn" type="button" class="button is-info" @click="closeModal">{{ btnLoggedInLabel }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
import RegistrationForm from '../form/Registration';
import LoginForm from '../form/Login';
import Notification from '../Notification';

export default {
  name: 'modal',

  data () {
    return {
      error: false,
      messageError: '',
      btnLoggedInLabel: 'Close',
      modalTitle: 'Log in',
      modalTitleLoggedIn: 'Welcome!',
      primaryBtnLabel: 'Log in',
      busLogin: ''
    }
  },

  components: {
    RegistrationForm,
    LoginForm,
    Notification
  },

  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn;
    },
    openModal () {
      return this.$store.getters.isModalOpen;
    },
    showSignupForm () {
      return this.$store.getters.modalType === 0;
    },
    showLoginForm () {
      return this.$store.getters.modalType === 1;
    },
    showCheckoutForm () {
      return this.$store.getters.modalType === 2;
    }
  },

  methods: {
    closeModal () {
      this.$store.commit('showModal', false);
    },
    submitHandler () {
      if (this.showLoginForm) {

        // call login method from the children component
        this.$refs.login.login();
      } else if (this.showSignupForm) {
        this.$refs.signup.register();
      }
    }
  }
}
</script>

