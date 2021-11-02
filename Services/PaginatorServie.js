
const paginator = function paginateResult(model){

    return async (req, res, next) => {

        const page = req.query.page ? parseInt(req.query.page) :  1

        const limit = req.query.limit ? parseInt(req.query.limit) : 2

        let results = {}

        const startIndex = (page - 1 ) * limit

        const endIndex = page * limit

        let paginated_data = await model.find({}).limit(limit).skip(startIndex).exec()

        if(endIndex < await model.countDocuments().exec())
        {
            results.next = { page: page + 1, limit }
        }

        if(startIndex > 0 )
        {
            results.previous = { page: page - 1, limit }
        }

        results.data = paginated_data

        res.paginatedResults = results

        next();
    }
}

export  { paginator }