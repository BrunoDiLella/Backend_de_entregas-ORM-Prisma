import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";



export class UpdateEndDateController {
    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request;
        const { id: id_delivery } = request.params;

        const updateDeliverymanUseCase = new UpdateEndDateUseCase();
        const delivery = await updateDeliverymanUseCase.execute({
            id_delivery,
            id_deliveryman,
        });

        return response.json(delivery);
    }
}




