<template>
  <div>
    <form @submit.prevent="login" method="post">
      <div v-if="!isUserLoggedIn">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              :class="[emailError ? 'input is-danger' : 'input']"
              type="email"
              :placeholder="emailPlaceholder"
              v-model="email"
              @keyup="checkEmailOnKeyUp(email)"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span v-if="emailError !== null" class="icon is-small is-right">
              <i :class="[emailError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
            </span>
          </p>
          <p v-if="emailError" class="help is-danger">{{ emailRequiredLabel }}</p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              :class="[passwordError ? 'input is-danger' : 'input']"
              type="password"
              :placeholder="passwordPlaceholder"
              v-model="password"
              @keyup="checkPasswordOnKeyUp(password)"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            <span v-if="passwordError !== null" class="icon is-small is-right">
              <i :class="[passwordError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
            </span>
          </p>
          <p v-if="passwordError" class="help is-danger">{{ passwordRequiredLabel }}</p>
        </div>
      </div>
      <div v-if="isUserLoggedIn" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ welcomeMsg }} {{ getUserName }}!</p>
            <p class="heading">{{ welcomeSubMsg }}</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { isValidEmail } from '@/assets/validators';

export default {
  name: 'LoginForm',

  props: ['bus'],

  data () {
    return {
      emailPlaceholder: 'Your email',
      passwordPlaceholder: 'Your password',
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      welcomeMsg: 'Welcome back',
      welcomeSubMsg: 'Now you are logged in',
      passwordRequiredLabel: 'Password required',
      emailRequiredLabel: 'Email required'
    }
  },

  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    checkEmailOnKeyUp (email) {
      if (email && isValidEmail(email)) {
        this.emailError = false;
      } else {
        this.emailError = true;
      }
    },
    checkPasswordOnKeyUp (password) {
      if (password) {
        this.passwordError = false;
      } else {
        this.passwordError = true;
      }
    },
    async login () {

      if (this.email && this.password) {
        this.emailError = false;
        this.passwordError = false;
        this.isFormSuccess = true;

        try {
          await this.$axios.post('/api/login', {
            data: {
              email: this.email,
              password: this.password
            }
          }).then((result) => {
            if (result.data.error) {
              this.error = result.data.error;
              this.messageError = result.data.message;
            } else {
              this.error = false;
              this.$store.commit('setUserName', result.data.name);
              this.$store.commit('setUserRole', result.data.role);
              this.$store.commit('isUserLoggedIn', this.isFormSuccess);
            }
          }).catch((err) => {

          });
        } catch (error) {
          this.error = result.data.error;
          this.messageError = result.data.message;
        }
      }

      if (!this.email) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }

      if (!this.password) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    }
  }
}
</script>

<style lang="scss">
  .fa-exclamation-circle {
    color: red;
  }
  .fa-check {
    color: green;
  }
</style>
