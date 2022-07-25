import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AddItemDto} from "./dto/add-product.dto";
import {ShopItem} from "../shop/shop-item.entity";

@Entity()
export class ItemInBasket extends BaseEntity implements AddItemDto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    count: number;

    @OneToOne(() => ShopItem, entity => entity.itemInBasket)
    @JoinColumn()
    shopItem: ShopItem
}
