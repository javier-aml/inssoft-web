export const state = () => ({});
export const actions = {
    async registerUser({commit}, payload){
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const body = JSON.stringify(payload);
        const options = {
          method: 'POST',
          headers,
          body,
          redirect: 'follow'
        }

        try {
            let response = await fetch(`${this.$config.API_URL}/users`, options);
            response = await response.json();
            return response;
        } catch(err) {
            return err;
        }
    }
};
export const mutations = {};
export const getters = {};