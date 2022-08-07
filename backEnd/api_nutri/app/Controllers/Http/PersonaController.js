'use strict'
const Persona= use('App/Models/Persona')
class PersonaController {
 async crearPersona ({request}){
  const {apellido, nombre, nro_documento, fecha_nacimiento, sexo, telefono, email, id_rol, id_empresa, id_caracteristica, id_estado}=request.all()
  const response = {}
  try {
    const persona = await Persona.create({
      apellido, 
      nombre, 
      nro_documento, 
      fecha_nacimiento, 
      sexo, 
      telefono, 
      email, 
      id_rol, 
      id_empresa, 
      id_caracteristica, 
      id_estado})
      response.status = 200 // el 200 significa que esta ok de acuerdo a los codigos de respuesta HTTP
      response.data = persona
      return response
  } catch (error) {
    response.status = 403 // error forbiden de acuerdo al codigo de respuesta HTTP
    response.error = error.message
    return response
    
  }
  
 }

}

module.exports = PersonaController
