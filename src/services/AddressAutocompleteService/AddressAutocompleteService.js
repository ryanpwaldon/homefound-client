import axios from 'axios'

const client = axios.create({ baseURL: process.env.VUE_APP_MAPBOX_GEOCODING_URL })

export default {

  async findAddresses (query) {
    try {
      const response = await client.get(`/${query}.json`, {
        params: {
          access_token: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
          autocomplete: true,
          types: 'locality',
          country: 'au'
        }
      })
      return response.data.features.map(item => ({
        suburb: item.text,
        postcode: item.context.find(item => item.id.startsWith('postcode')).text,
        state: getStateAbbreviation([item.context.find(item => item.id.startsWith('region')).text])
      }))
    } catch (err) {
      console.error(err)
      return []
    }
  }

}

function getStateAbbreviation (state) {
  return {
    'New South Wales': 'NSW',
    'Queensland': 'QLD',
    'Victoria': 'VIC',
    'Tasmania': 'TAS',
    'Northern Territory': 'NT',
    'South Australia': 'SA',
    'Western Australia': 'WA',
    'Australian Capital Territory': 'ACT'
  }[state]
}
