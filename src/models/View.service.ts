import Errors, { Message } from "../libs/Error";
import { View, ViewInput } from "../libs/types/view.type";
import ViewModel from "../schema/View.model"
import { HttpCode } from "../libs/Error";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel
    }

    public async checkExsistenceView(input: ViewInput): Promise<View | null> {
        try {
            return await this.viewModel
                .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
                .exec();
        } catch (err: any) {
            console.log(`DATABASE ERROR: ${err.message}`);
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
        }
    }

    public async insertNewViewer(input: ViewInput): Promise<View> {
        try {
            return await this.viewModel.create(input);

        } catch (err: any) {
            console.log(`DATABASE ERROR: ${err.message}`);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }
}

export default ViewService