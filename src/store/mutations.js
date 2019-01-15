const mutations = {
	user_info_update(state, string) {
		localStorage.setItem('user_info', string);
		state.user_info = string;
	},

	user_tabs_update(state, id) {
		state.user_tabs_selected = id;
	}
};

export default mutations