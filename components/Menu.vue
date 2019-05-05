<template>
	<div>
		<div class="navbar-item">
			<div class="field is-grouped">
				<p class="control">
					<a v-if="!isUserLoggedIn" class="button" @click="onSignupClick">
						<span class="icon">
							<i class="fa fa-user-plus"></i>
						</span>
						<span>{{ signupLabel }}</span>
					</a>
				</p>
				<p class="control">
					<a v-if="!isUserLoggedIn" class="button" @click="onLoginClick">
						<span class="icon">
							<i class="fa fa-user"></i>
						</span>
						<span>{{ loginLabel }}</span>
					</a>
				</p>
			</div>
		</div>
		<div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable">
			<a class="navbar-link">
			{{ welcomeLabel }}  {{ getUserName }}
			</a>
			<div class="navbar-dropdown is-boxed">
				<nuxt-link class="navbar-item" :to="{ name: 'user-wishlist' }">
					{{ wishlistLabel }}
				</nuxt-link>
        <nuxt-link v-if="isAdmin" class="navbar-item" :to="{ name: 'admin' }">
					{{ adminLabel }}
				</nuxt-link>
				<hr class="navbar-divider">
				<a class="navbar-item" @click="logout">
					{{ logoutLabel }}
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'VmMenu',

  data () {
		return {
			wishlistLabel: 'Wishlist',
			logoutLabel: 'Log out',
			loginLabel: 'Log in',
      signupLabel: 'Sign up',
      adminLabel: 'Admin',
      welcomeLabel: 'Welcome'
		}
	},

	computed: {
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		},
		getUserName () {
			let name = this.$store.getters.getUserName;

			if (name === '') {
				return 'user';
			} else {
				return name;
			}
    },
    isAdmin () {
      return this.$store.getters.isAdmin;
    }
	},

	methods: {
		logout () {
			this.$store.commit('isUserLoggedIn', false);
			this.$store.commit('isUserSignedUp', false);
			this.$store.commit('removeProductsFromFavourite');

			// redirect to homepage
			this.$router.push({ name: 'index' });
		},
		onSignupClick () {
      let data = {
        show: true,
        type: 0
      }
			this.$store.commit('showModal', data);
    },
    onLoginClick () {
      let data = {
        show: true,
        type: 1
      }
			this.$store.commit('showModal', data);
    }
	}
}
</script>

