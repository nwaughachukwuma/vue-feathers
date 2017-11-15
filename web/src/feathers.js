import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import $ from 'jquery'

export default () => {
  const restClient = rest('/rest.api')

  const app = feathers()
    .configure(restClient.jquery($))

  return app
}

