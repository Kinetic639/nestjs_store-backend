import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {AddItemDto} from './dto/add-product.dto';
import {
    AddProductToBasketResponse,
    GetTotalPriceResponse,
    ListProductsInBasketResponse,
    RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import {ShopService} from '../shop/shop.service';
import {ItemInBasket} from "./item-in-basket.entity";

@Injectable()
export class BasketService {

    constructor(
        @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
    ) {
    }

    async add(product: AddItemDto): Promise<AddProductToBasketResponse> {
        const {count, id} = product;

        const shopItem = await this.shopService.getOneItem(id)


        if (
            typeof id !== 'string' ||
            typeof count !== 'number' ||
            id === '' ||
            count < 1 ||
            !shopItem
        ) {
            return {
                isSuccess: false,
            };
        }

        const item = new ItemInBasket()
        item.count = count

        await item.save()

        item.shopItem = shopItem

        await item.save()

        return {
            isSuccess: true,
            id: item.id
        };
    }

    async remove(itemInBasketId: string): Promise<RemoveProductFromBasketResponse> {
        const item = await ItemInBasket.findOne({where: {id: itemInBasketId}})
        if (item) {
            await item.remove()
            return {
                isSuccess: true
            }
        }
    }

    async getAll(): Promise<ItemInBasket[]> {
        return await ItemInBasket.find({relations: ['shopItem']});
    }

    async clearBasket() {
        await ItemInBasket.delete({})
    }

    async getTotalPrice(): Promise<GetTotalPriceResponse> {
        const items = await this.getAll()

        return (
            await Promise.all(
                items.map(
                    async (item) =>
                        item.shopItem.price *
                        item.count *
                        1.23,
                ),
            )
        ).reduce((prev, curr) => prev + curr, 0);
    }
}
