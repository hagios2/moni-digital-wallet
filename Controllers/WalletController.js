import Sequelize from 'sequelize';
import { successResponse, errorResponse} from '../server_responses/responses.js'
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

            let { amount } = req.body

            let agent_wallet = await agent.getWallet()

            if(!agent_wallet)
            {
                return errorResponse(req,res, 'Wallet Not Found', 404)
            }

            let current_balance = parseFloat(amount + Number(agent_wallet.current_balance)).toFixed(2)

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

            return successResponse(req, res, 'success', {current_balance})

        }catch (error) {

            await transaction.rollback()

            return errorResponse(req,res, error)
        }
    }

    async requestForLoan(req, res){

        const transaction = await sequelize.transaction()

        try{

            let agent = await Agent.findOne({where: {id: 1}})

            let { amount, reason_for_loan } = req.body


        }catch (error) {

            return errorResponse(req,res, error)
        }
    }

    async withdrawFromWallet(req, res) {

        const transaction = await sequelize.transaction()

        try{

            let agent = await Agent.findOne({where: {id: 1}})

            let { amount } = req.body

            let agent_wallet = await agent.getWallet()

            if(!agent_wallet)
            {
                return errorResponse(req,res, 'Wallet Not Found', 404)
            }

            if(Number(agent_wallet.current_balance) < amount)
            {
                return errorResponse(req, res, 'Insufficient funds', 422)
            }

            let current_balance = parseFloat(Number(agent_wallet.current_balance) - amount).toFixed(2)

            await agent_wallet.update({current_balance, last_updated_date: Sequelize.fn('NOW')}, {transaction})

            await Transaction.create({
                wallet_id: agent_wallet.id,
                status: Transaction.SUCCESS_STATUS,
                type: Transaction.WITHDRAWAL_TYPE,
                generated_id: v4(),
                amount,
                transaction_date: Sequelize.fn('NOW'),

            }, {transaction})

            await transaction.commit();

            return successResponse(req, res, 'success', {current_balance})

        }catch (error) {

            await transaction.rollback()

            return errorResponse(req,res, error)
        }
    }

    async viewTransactions(req, res)
    {
        try{

            let agent = await Agent.findOne({where: {id: 1}})

            let agent_wallet = await agent.getWallet()

            if(!agent_wallet)
            {
                return errorResponse(req,res, 'Wallet Not Found', 404)
            }

            const transactions = await Transaction.findAll({where: {wallet_id: agent_wallet.id}})

            return successResponse(req, res, 'success', {transactions})
          
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