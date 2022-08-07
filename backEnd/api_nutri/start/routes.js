'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/index', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('crearpersona','PersonaController.crearPersona')
Route.post('creaaccesopersona', 'AccesoPersonaController.creaPersonaAcceso').middleware('auth')

Route.post('login','AccesoPersonaController.login')