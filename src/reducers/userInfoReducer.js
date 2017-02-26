export const userInfoReducer = (state={}, action) => {
  switch(action.type){
    case 'ADD_USER':
      return{
        username: action.username,
        email: action.email,
        password: action.password
      }
    default:
      return state
}
}
