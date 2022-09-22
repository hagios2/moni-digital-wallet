import {successResponse, errorResponse} from '../server_responses/responses.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { RefreshToken } from '../../Models/RefreshTokens.js';
import { Agent } from '../Models/Agent.js';
import omit from 'lodash';

class AuthControllerClass
{
    async addAgent(req, res){

        try{

            let  { name, email, password} = req.body

            const hashedPassword = await bcrypt.hash(password, 10)

            if(hashedPassword)
            {
                await Agent.create_admin({name, email, password: hashedPassword})

                return res.json({message: 'success'}, 201)
            }

        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async login(req, res) {

        try{
            
            let {email, password} = req.body

            let agent = await Agent.findOne({ where: {email}})

            if(!agent)
            {
                return errorResponse(req, res, 'Invalid Credentials', 401) 
            }

            if(await bcrypt.compare(password, agent.password))
            {   
                const token = jwt.sign({ agent }, process.env.SECRET, {expiresIn: '30m'})

                const refresh_token = jwt.sign({ agent }, process.env.REFRESH_SECRET)

                if(token && refresh_token)
                {
                    await RefreshToken.createToken({refresh_token})

                    return successResponse(req, res, 'success', {token, refresh_token})
                }
            }

            return errorResponse(req, res, 'Error', 500)
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }
    }

    async refreshToken(req, res)
    {
        const refresh_token = req.body.refresh_token

        if(refresh_token === null)
        {
            return res.sendStatus(401);
        }

        const existing_token = await RefreshToken.findOne({refresh_token})

        if(existing_token)
        {
            const token =  jwt.verify(refresh_token, process.env.REFRESH_SECRET, (error, agent) => {

                if(error)
                {
                    return res.sendStatus(403)
                }

                // delete admin.iat //delete the previous issued at

                return jwt.sign({ agent: omit(agent.toJSON(), 'password') }, process.env.SECRET, {expiresIn: '30m'})
            })

            return successResponse(req, res, 'success', { token })

        }

        return res.sendStatus(401)

    }

    async logout(req, res)
    {
       const refresh_token = req.body.refresh_token

        if(refresh_token === null)
        {
            return res.sendStatus(401)
        }

        await RefreshToken.deleteOne({refresh_token, provider: 'admin'})

        return successResponse(req, res, 'success', {}, 204)
    }
}


const AuthController = new AuthControllerClass()

export default AuthController