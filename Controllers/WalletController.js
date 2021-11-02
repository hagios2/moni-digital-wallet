import Sequelize from 'sequelize';
import { successResponse, errorResponse} from '../server_responses/responses.js'
import sequelize from '../config/db.js'
import { Agent } from '../Models/Agent.js';
import { Transaction} from '../Models/Transaction.js'
import { v4 } from 'uuid'
import { Loan } from '../Models/Loan.js';

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
                balance_after_transaction: current_balance

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

            console.log(agent)

            let agent_loans = await agent.getLoans({where: {agent_id: agent.id, status: Loan.PENDING_STATUS}})

            console.log(agent_loans)

            if(!agent_loans)
            {
                return errorResponse(req,res, 'You need to settle your previous debt', 422)
            }

            let { amount, reason_for_loan } = req.body

            const grand_total = ((Loan.DEFAULT_RATE + 100) * amount ) / 100

            console.log(grand_total)

            Loan.create({
                agent_id: agent.id, 
                generated_id: v4(),
                amount, 
                status: Loan.PENDING_STATUS,
                reason_for_loan,
                grand_total
            }, {transaction})

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
                type: Transaction.LOAN_DEPOSIT_TYPE,
                generated_id: v4(),
                amount,
                transaction_date: Sequelize.fn('NOW'),
                balance_after_transaction: current_balance

            }, {transaction})

            await transaction.commit();

            return successResponse(req, res, 'success', {current_balance})


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
                balance_after_transaction: current_balance

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
        const transaction = await sequelize.transaction()

        try{

            let agent = await Agent.findOne({where: {id: 1}})

            console.log(agent)

            let agent_loan = await Loan.findOne({where: {agent_id: agent.id, status: Loan.PENDING_STATUS}})

            console.log(agent_loan)

            if(!agent_loan)
            {
                return errorResponse(req,res, 'You do not have any pending loan to settle', 422)
            }

            let { amount, full_payment } = req.body

            let agent_wallet = await agent.getWallet()

            console.log(agent_wallet, 'agent wallet')

            if(!agent_wallet)
            {
                return errorResponse(req,res, 'Wallet Not Found', 404)
            }

            if(Number(agent_wallet.current_balance) < amount)
            {
                return errorResponse(req, res, 'Insufficient funds', 422)
            }

            console.log(amount)
            
            let current_balance = parseFloat(Number(agent_wallet.current_balance) - amount).toFixed(2)

            console.log(current_balance, 'request amount')

            await agent_wallet.update({current_balance, last_updated_date: Sequelize.fn('NOW')},{where: {id: agent_wallet.id}}, {transaction})

            console.log('after wallet update')

            console.log(agent_loan.grand_total, amount)

            const amount_paid = parseFloat(Number(agent_loan.amount_paid) + amount).toFixed(2)

            if((amount === Number(agent_loan.grand_total)) && full_payment)
            {
               agent_loan = await agent_loan.update({
                    amount_paid: amount_paid,
                    paidAt: Sequelize.fn('NOW'),
                    status: 'paid' //Loan.PAID_STATUS
                }, {returning:true}, {transaction})

                console.log('in if')
            
            }else{
                
                agent_loan = await agent_loan.update({
                    amount_paid: amount_paid,
                    paidAt: Sequelize.fn('NOW')
                    //status still remains pending
                }, {returning:true}, {transaction})

                console.log('in else')
            }

            console.log(agent_loan, 'after payment')

            await Transaction.create({
                wallet_id: agent_wallet.id,
                status: Transaction.SUCCESS_STATUS,
                type: Transaction.LOAN_REPAYMENT_TYPE,
                generated_id: v4(),
                amount,
                transaction_date: Sequelize.fn('NOW'),
                balance_after_transaction: current_balance

            }, {transaction})

            await transaction.commit();

            const amount_left_to_pay = parseFloat(Number(agent_loan.grand_total) - amount_paid).toFixed(2) //returns 0.00 if full payment was made

            return successResponse(req, res, 'success', {amount_left_to_pay}) 
          
        }
        catch(error)
        {
            return errorResponse(req, res, error)
        }
    }
}


const WalletController = new WalletControllerClass()

export default WalletController