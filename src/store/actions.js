export const user_info_update = (context, string) => {
    context.commit('user_info_update', string)
};
export const user_tabs_update = (context, id) => {
    context.commit('user_tabs_update', id)
};