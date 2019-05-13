let Util = {
  f_cal_less_ten: () => {

  },
  f_get_position: () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude
      const currentLon = position.coords.longitude
      console.log('定位信息：', currentLat, currentLon)
    })
  },
  f_add_site_to_storage: () => {

  }
}
export default Util
