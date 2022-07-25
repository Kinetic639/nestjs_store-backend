import {Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import {
    CreateNewProductResponse,
    GetListOfProductsResponse,
    GetOneProductResponse,
} from '../interfaces/shop';
import {ShopService} from './shop.service';
import {DataSource} from 'typeorm';

@Controller('shop')
export class ShopController {
    constructor(@Inject(ShopService) private shopService: ShopService) {
    }

    @Get('/')
    getListOfProducts(): Promise<GetListOfProductsResponse> {
        return this.shopService.getItems();
    }

    // @Get('/find/:search')
    // testFindItem(
    //     @Param('search') search: string,
    // ): Promise<GetListOfProductsResponse> {
    //     return this.shopService.findProducts(search);
    // }
    //
    // @Get('/:id')
    // getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    //     return this.shopService.getOneProduct(id);
    // }
    //
    // @Delete('/:id')
    // removeOneProduct(@Param('id') id: string) {
    //     this.shopService.removeOneProduct(id);
    // }
    //
    // @Post('/')
    // createNewProduct(): Promise<CreateNewProductResponse> {
    //     return this.shopService.createDummyProduct();
    // }
}
