import {Admin} from '../../Models/Admin.js';
import {successResponse, errorResponse} from '../../server_responses/response.js'

class WalletControllerClass
{
    async topUpWallet(req, res){

        try{


        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async requestForLoan(req, res){

        try{


        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async withdrawFromWallet(req, res) {

        try{
            
          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }
    }

    async viewTransactions(req, res)
    {
        try{
            
          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }

    }

    async repayLoan(req, res)
    {
        try{
            
          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }
    }
}


const WalletController = new WalletControllerClass()

export default WalletController