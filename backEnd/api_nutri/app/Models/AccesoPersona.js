'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Hash = use('Hash')
const Model = use('Model')

class AccesoPersona extends Model {
  static boot () {
      super.boot()
  
      /**
       * A hook to hash the user password before saving
       * it to the database.
       */
      this.addHook('beforeSave', async (userInstance) => {
        if (userInstance.dirty.contrasena) {
          userInstance.contrasena = await Hash.make(userInstance.contrasena)
        }
      })
  }

  static get table () { return 'acceso_personas';}
  static get createdAtColumn () {return null;}
  static get updatedAtColumn () {return null;}
  static get primaryKey () {return 'id_acceso';}
  
}

module.exports = AccesoPersona
