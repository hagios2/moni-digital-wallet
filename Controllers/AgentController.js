import {Agent} from '../../Models/Admin.js';
import {successResponse, errorResponse} from '../../server_responses/response.js'

class AgentControllerClass
{
    async register(req, res){

        try{


        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async login(req, res){

        try{


        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async refreshToken(req, res) {

        try{
            
          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }
    }

    async logout(req, res)
    {
        try{
            
          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }

    }
}


const AgentController = new AgentControllerClass()

export default AgentController