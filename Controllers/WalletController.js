import Sequelize from 'sequelize';
import { successResponse, errorResponse} from '../server_responses/responses.js'
import { Wallet } from '../Models/Wallet.js';
import sequelize from '../config/db.js'
import { Agent } from '../Models/Agent.js';
import { Transaction} from '../Models/Transaction.js'
import { v4 } from 'uuid'

class WalletControllerClass
{
    async topUpWallet(req, res){

        const transaction = await sequelize.transaction()

        try{

            let agent = await Agent.findOne({where: {id: 1}})

            console.log(agent)

            let { amount } = req.body

            console.log(amount)

            let agent_wallet = await agent.getWallet()

            console.log(agent_wallet)

            if(!agent_wallet)
            {
                return errorResponse(req,res, 'Wallet Not Found', 404)
            }

            console.log(typeof amount, typeof Number(agent_wallet.current_balance))

            let current_balance = parseFloat(amount + Number(agent_wallet.current_balance)).toFixed(2)

            console.log(current_balance, 'current_balance', agent, 'agent id')

            await agent_wallet.update({current_balance, last_updated_date: Sequelize.fn('NOW')}, {transaction})

            await Transaction.create({
                wallet_id: agent_wallet.id,
                status: Transaction.SUCCESS_STATUS,
                type: Transaction.TOPUP_TYPE,
                generated_id: v4(),
                amount,
                transaction_date: Sequelize.fn('NOW'),

            }, {transaction})

            await transaction.commit();

            return successResponse(req, res, 'success')

        }catch (error) {

            await transaction.rollback()

            return errorResponse(req,res, error)
        }
    }

    async requestForLoan(req, res){

        try{

            let { amount } = req.body


        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async withdrawFromWallet(req, res) {

        const transaction = await sequelize.transaction()

        try{
            
            let agent = req.user

            let { amount } = req.body

            let agent_wallet = await Wallet.findOne({where: {agent_id: agent.id}})

            if(!agent_wallet)
            {
                return errorResponse(req,res, error)
            }

            const balance_after_withdrawal = agent_wallet.current_balance - amount

            if(balance_after_withdrawal < 0)
            {
                return errorResponse(req, res, )
            }

            await agent_wallet.update({amount, last_updated_date: Sequelize.NOW}, {transaction})

            await Transaction.create({
                wallet_id: agent_wallet.id,
                status: Transaction.SUCCESS_STATUS,
                type: Transaction.CREDIT,
                amount,
                transaction_date: Sequelize.NOW,

            }, {transaction})

          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }
    }

    async viewTransactions(req, res)
    {
        try{

            let agent = req.user

            let { amount } = req.body

            let agent_wallet = await Wallet.findOne({where: {agent_id: agent.id}})

            if(!agent_wallet)
            {
                return errorResponse(req,res, error)
            }

            const transactions = await Transaction.findAll({where: {wallet_id: agent_wallet.id}})

            return successResponse(res, req, 'success', transactions)
          
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