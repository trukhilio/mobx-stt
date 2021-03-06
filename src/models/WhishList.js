import { types } from 'mobx-state-tree';

export const WhishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: '',
    })
    .actions(self => ({
        changeName(newName){
            self.name = newName
        },
        changePrice(newPrice){
            self.price = newPrice
        },
        changeImage(newImage){
            self.image = newImage
        }
        })
    )

export const WishList = types
    .model({
        items: types.optional(types.array(WhishListItem), []),
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        }
    }))
    .views(self => ({
        get totalPrice(){
            return self.items.reduce((sum, entry) => sum + entry.price, 0)
        }
    }));