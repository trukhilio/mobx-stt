import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { WishList, WhishListItem } from "./WhishList";
import { reaction } from 'mobx';

it('can create a instance of a model',() => {
    const item = WhishListItem.create({
        'name': "some bla bla",
        'price': 30,
    });
    expect(item.price).toBe(30);
    expect(item.image).toBe('');
    item.changeName('Dore');
    expect(item.name).toBe('Dore');
});

it('can create a wishlist',() => {
    const list = WishList.create({
        items: [
            {
                'name': "some bla bla",
                'price': 30,
            }
        ]
    });

    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(30);
});

it('can add new items', () => {
    const list = WishList.create();
    const states = [];
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    });
    list.add({
        name: 'Choco',
        price: 90,
    });
    expect(list.items.length).toBe(1);
    expect(list.items[0].name).toBe('Choco');
    list.items[0].changeName('Lolo');
    expect(list.items[0].name).toBe('Lolo');

    expect(getSnapshot(list)).toMatchSnapshot();

    expect(states).toMatchSnapshot()
});

it('can add new items - 2', () => {
    const list = WishList.create();
    const patches =[];
    onPatch(list, patch => {
        patches.push(patch)
    });
    list.add({
        name: 'Choco',
        price: 90,
    });
    list.items[0].changeName('Lolo');

    expect(patches).toMatchSnapshot()
});

it('can calculate the total price of a wishlist', () => {
    const list = WishList.create({
        items: [
            {
                name: 'Colored cats',
                price: 120,
                image: 'http://insentonews.com/wp-content/uploads/2017/10/82f7132ca71d06d2b43d57e9c1a96da0-696x391.jpg',
            },
            {
                name: 'Cat sleeps',
                price: 50,
                image: 'http://www.lastampa.it/rf/image_lowres/Pub/p4/2017/05/26/LaZampa/Foto/RitagliWeb/gattino_coccole02-kuOG-U11002952256340t3E-1024x576%40LaStampa.it.jpg',
            }
        ]
    });

    expect(list.totalPrice).toBe(170);

    let changed = 0;
    reaction(() => list.totalPrice, () => changed++);
    expect(changed).toBe(0);
    console.log(list.totalPrice);
    list.items[0].changeName('Test');
    expect(changed).toBe(0);
    list.items[0].changePrice(10);
    expect(changed).toBe(1)
});