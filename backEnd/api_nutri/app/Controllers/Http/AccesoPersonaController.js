'use strict'

const Acceso = use('App/Models/AccesoPersona');
const Persona = use('App/Models/Persona');
const { validate  } = use('Validator');
const Database = use('Database');


class AccesoPersonaController {

    async login({request, auth}){
        const response = {};
        const {email, contrasena} = request.all();

        try {
            const logueo = await auth.attempt(email, contrasena)
            response.status = 200;
            response.data = logueo;

            return response;
        } catch (error) {
            response.status = error.status ? error.status : 403;
            response.error = error.message

            return response;
            
        }
    }

    async creaPersonaAcceso ({request, auth}){
        const response = {}
        const login = await auth.getUser()
        const {nombre, apellido, fecha_nacimiento, email, contrasena} = request.all();

        const reglas = {
            email : 'required|email|unique:acceso_personas,email',
            nombre : 'required',
            apellido : 'required',
            fecha_nacimiento : 'required',
            contrasena : 'required|max:8|min:4'
        }

        const validation = await validate(request.all(), reglas);

        if (validation.fails()) {

            response.status = 403;
            response.error = validation.messages()
            
            return response;
        }

        try {
            const trx = await Database.beginTransaction();
            const persona = await Persona.create({
                nombre,
                apellido,
                fecha_nacimiento,
                id_empresa : login.id_empresa
            }, trx);

            await trx.commit(persona);

            const acceso = await Acceso.create({
                email,
                contrasena,
                id_persona : persona.id_persona,
                id_estado : 1,
                id_empresa : login.id_empresa
            });

            response.status = 200;
            response.data = persona
            
            return response;
        } catch (error) {
            response.status = error.status ? error.status : 403;
            response.error = error.message

            return response;
        }
    }
}

module.exports = AccesoPersonaController
