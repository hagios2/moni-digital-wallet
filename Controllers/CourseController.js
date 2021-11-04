import { successResponse, errorResponse} from '../server_responses/responses.js'

class CourseControllerClass
{
    async courseFilter(req, res){

        try{

            let { input = '' } = req.body

            if (!input )
            {
                return errorResponse(req, res, 'Input is requiredd', 422)
            }

            let splitted_input = input.split(' ')

            const alphabet_regex = /^[A-Za-z]*/

            const number_regex = /[^0-9]/g

            let department = splitted_input[0].match(alphabet_regex)[0]

            let semister = ''

            console.log(splitted_input)

            let year = splitted_input.slice(-1)[0].replace(number_regex, '')

            if(!year)
            {
                year = splitted_input.slice(-2)[0].replace(number_regex, '')

                if(!year)
                {
                    year = splitted_input[2]
                }

            }

            let course = splitted_input[0].replace(number_regex, '')

            if(!course)
            {
                course = splitted_input[1].replace(number_regex, '')
            }

            if(splitted_input.length === 2)
            {
                semister = splitted_input[1].replace(year, '')
            }
            else if(splitted_input.length === 3)
            {
                if(splitted_input[2].replace(year, '') !== '')
                {
                    semister = splitted_input[2].replace(year, '')
                }
                else{

                    semister = splitted_input[1].match(alphabet_regex)[0]
                }
            
                
            }
            else if(splitted_input.length > 3 && splitted_input[2].match(alphabet_regex)[0] !== '')
            {
                semister = splitted_input[2].match(alphabet_regex)[0]
            }
            else{
                
                semister = splitted_input[3].match(alphabet_regex)[0]
            }

            return successResponse(req, res, 'success', {department, course, semister, year})

        }catch (error) {

            return errorResponse(req,res, error)
        }
    }
}


const CourseController = new CourseControllerClass()

export default CourseController