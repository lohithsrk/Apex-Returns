// const INITIAL_STATE = {
//     user_id: '',
//     name: '',
//     email: '',
//     password: '',

// }

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;