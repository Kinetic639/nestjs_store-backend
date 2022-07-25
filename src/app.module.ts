import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AppDataSource} from "../ormconfig";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ShopController} from './shop/shop.controller';
import {ShopService} from './shop/shop.service';
import {ShopModule} from './shop/shop.module';
import {BasketModule} from "./basket/basket.module";
import {UserModule} from './user/user.module';
import {BasketController} from "./basket/basket.controller";
import {BasketService} from "./basket/basket.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(AppDataSource.options),
        ShopModule,
        BasketModule,
        UserModule
    ],
    controllers: [AppController, ShopController, BasketController],
    providers: [AppService, ShopService, BasketService],
})
export class AppModule {
}
