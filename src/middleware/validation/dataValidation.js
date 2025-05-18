import Joi from 'joi'

export const DataValidation = ({ req, res, next, obj }) => {

    const schema = Joi.object(obj)
    // console.log(schema)

    const values = schema.validate(req.body)


    if (values.error) {
        return res.json({
            status: "error",
            message: values.error.message
        })
    }
    next()
}
