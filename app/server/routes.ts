import { Request, Response, Application } from 'express';
import say from 'say';

export class Routes {
    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successful!'
                })
            })

        app.route('/say')
            .get((req: Request, res: Response) => {
                const name = "Sahil";

                say.speak(name, undefined, 1.0, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Text has been spoken.');
                })
            });
    }
}