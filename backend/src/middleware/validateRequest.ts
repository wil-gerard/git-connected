import { AnySchema } from 'yup';
import { Response, NextFunction } from 'express';
import { IReqAuth } from '../interface';

const validate = (schema: AnySchema)  => async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const validatedBody = await schema.validate(req.body,{ strict: true });
        req.body = validatedBody;
        next();
    } catch(err){
        return res.status(400).send(err.message)
    };
};

export default validate
