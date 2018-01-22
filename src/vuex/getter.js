export default {
  isExistence: (state) => (id) => {
    return state.cargos.filter(item => item.id === id).length > 0 ? true : false
  }
}
