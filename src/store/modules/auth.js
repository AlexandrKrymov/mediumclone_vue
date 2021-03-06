import authApi from '@/api/auth';

const state = {
  isSubmitting: false
};
const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  },
  registerSuccess(state) {
    state.isSubmitting = false;
  },
  registerFailure(state) {
    state.isSubmitting = false;
  }
};
const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart');
      authApi
        .register(credentials)
        .then(response => {
          console.log('response', response);
          context.commit('registerSuccess', response.data.user);
          resolve(response.data.user);
        })
        .catch(result => {
          console.log('result errors', result);
          context.commit('registerFailure', result.response.data.errors);
        });
    });
  }
};
export default {
  state,
  mutations,
  actions
};
