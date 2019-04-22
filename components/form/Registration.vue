<template>
  <div>
    <form @submit.prevent="register" method="post">
      <div v-if="!isUserSignedUp">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              :class="[highlightNameWithError ? 'input is-danger' : 'input']"
              type="text"
              :placeholder="namePlaceholder"
              v-model="name"
              @keyup="checkNameOnKeyUp(name)"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span v-if="highlightNameWithError !== null" class="icon is-small is-right">
              <i :class="[highlightNameWithError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
            </span>
          </p>
          <p v-if="highlightNameWithError" class="help is-danger">{{ nameErrorLabel }}</p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
              type="email"
              :placeholder="emailPlaceholder"
              name="emailName"
              v-model="email"
              @keyup="checkEmailOnKeyUp(email)"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span v-if="highlightEmailWithError !== null" class="icon is-small is-right">
              <i :class="[highlightEmailWithError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
            </span>
          </p>
          <p v-if="highlightEmailWithError" class="help is-danger">{{ emailErrorLabel }}</p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              :class="[highlightPasswordWithError ? 'input is-danger' : 'input']"
              type="password"
              :placeholder="passwordPlaceholder"
              v-model="password"
              @keyup="checkPasswordOnKeyUp(password)"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            <span v-if="highlightPasswordWithError !== null" class="icon is-small is-right">
              <i :class="[highlightPasswordWithError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
            </span>
          </p>
          <p v-if="highlightPasswordWithError" class="help is-danger">{{ passwordErrorLabel }}</p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              :class="[highlightRepeatPasswordWithError ? 'input is-danger' : 'input']"
              type="password"
              :placeholder="repeatPasswordPlaceholder"
              v-model="repeatPassword"
              @keyup="checkRepeatPasswordOnKeyUp(repeatPassword)"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            <span v-if="highlightRepeatPasswordWithError !== null" class="icon is-small is-right">
              <i :class="[highlightRepeatPasswordWithError ? 'fa fa-exclamation-circle' : 'fa fa-check']"></i>
            </span>
          </p>
          <p v-if="highlightRepeatPasswordWithError" class="help is-danger">{{ notEqualErrorLabel }}</p>
        </div>
      </div>
      <div v-if="isUserSignedUp" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">Welcome {{ getUserName }}!</p>
            <p class="heading">Now you are a member</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { isValidEmail } from '@/assets/validators';

export default {
  name: 'registrationForm',

  data () {
    return {
      namePlaceholder: 'Name*',
      emailPlaceholder: 'Email*',
      passwordPlaceholder: 'Password*',
      repeatPasswordPlaceholder: 'Repeat Password*',
      notEqualErrorLabel: 'Passwords must be equal',
      passwordErrorLabel: 'Password required',
      nameErrorLabel: 'Name required',
      emailErrorLabel: 'Email required',
      emailNotValidLabel: 'Valid email required',
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      highlightNameWithError: null,
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      highlightRepeatPasswordWithError: null
    }
  },

  computed: {
    isUserSignedUp () {
      return this.$store.getters.isUserSignedUp;
    },
    getUserName () {
      return this.$store.getters.getUserName;
    },
  },

  methods: {
    async register () {

      if (this.name && this.email && this.password && this.repeatPassword) {
        this.highlightEmailWithError = false;
        this.highlightPasswordWithError = false;
        this.isFormSuccess = true;

        try {
          await this.$axios.post('/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            role: 0
          }).then((result) => {
            if (result.data.error) {
              this.error = result.data.error;
              this.messageError = result.data.message;
            } else {
              this.error = false;
              this.$store.commit('setUserName', result.data.name);
              this.$store.commit('isUserSignedUp', this.isFormSuccess);
            }
          }).catch((err) => {

          });
        } catch (e) {
          this.error = e.data.error;
          this.messageError = e.data.message;v
        }
      }

      if (!this.name) {
        this.highlightNameWithError = true;
      } else {
        this.highlightNameWithError = false;
      }

      if (!this.email) {
        this.highlightEmailWithError = true;

        if (this.email && !isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      } else {
        this.highlightEmailWithError = false;
      }

      if (!this.password) {
        this.highlightPasswordWithError = true;
      } else {
        this.highlightPasswordWithError = false;
      }

      if (!this.repeatPassword) {
        this.highlightRepeatPasswordWithError = true;
      } else {
        this.highlightRepeatPasswordWithError = false;
      }
    },
    checkNameOnKeyUp (name) {
      if (name) {
        this.highlightNameWithError = false;
      } else {
        this.highlightNameWithError = true;
      }
    },
    checkEmailOnKeyUp (email) {
      if (email && isValidEmail(email)) {
        this.highlightEmailWithError = false;
      } else {
        this.highlightEmailWithError = true;

        if (!isValidEmail(email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      }
    },
    checkPasswordOnKeyUp (password) {
      if (password) {
        this.highlightPasswordWithError = false;

        if (this.repeatPassword === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightPasswordWithError = true;
      }
    },
    checkRepeatPasswordOnKeyUp (secondPassword) {
      if (secondPassword) {
        if (secondPassword === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightRepeatPasswordWithError = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fa-exclamation-circle {
    color: red;
  }
  .fa-check {
    color: green;
  }
</style>

