import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
} from '@nestjs/common';
import {AddItemDto} from './dto/add-product.dto';
import {BasketService} from './basket.service';
import {
    AddProductToBasketResponse,
    GetTotalPriceResponse,
    ListProductsInBasketResponse,
    RemoveProductFromBasketResponse,
} from '../interfaces/basket';

@Controller('basket')
export class BasketController {
    constructor(@Inject(BasketService) private basketService: BasketService) {
    }

    @Post('/')
    addProductToBasket(@Body() item: AddItemDto): Promise<AddProductToBasketResponse> {
        return this.basketService.add(item);
    }

    @Delete('/all')
    clearBasket() {
        this.basketService.clearBasket();
    }


    @Delete('/:itemInBasketId')
    removeProductFromBasket(
        @Param('itemInBasketId') itemInBasketId: string,
    ): Promise<RemoveProductFromBasketResponse> {
        return this.basketService.remove(itemInBasketId);
    }

    @Get('/total-price')
    getTotalPrice(): Promise<GetTotalPriceResponse> {
        return this.basketService.getTotalPrice();
    }
}
