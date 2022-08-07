'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Persona extends Model {
  static get table () { return 'personas';}
  static get createdAtColumn () {return 'fecha_alta';}
  static get updatedAtColumn () {return 'fecha_upd';}
  static get primaryKey () {return 'id_persona';}
}

module.exports = Persona
