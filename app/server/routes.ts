import { Request, Response, Application } from 'express';

import GPTService from './GPTService';

export class Routes {
    private gptService: GPTService;

    constructor() {
        this.gptService = new GPTService();
    }
    
    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successful!'
                })
            })
    }
}