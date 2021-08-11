function cards() {
    // Используем классы для создание карточек меню
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            // если в запросе что то пошло не так, выкинем ошибку вручную(блок catch)
            throw new Error(`Could nor fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    // получаем по get запросу инфу с db.json
    //     getResource('http://localhost:3000/menu')
    //         .then(data => {
    //             data.forEach(({img, altimg, title, descr, price}) => {
    // // {} деструктуризация объекта, достаем свойства из объекта по отдельным частям
    //                 new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //             });
    //         });
    // //получаем данные по ссылке,т.к. придет массив,вызовем конструктор на каждый объект массива
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    // создание карточки с помощью подключеной библиотеки axios


    //     getResource('http://localhost:3000/menu')
    //         .then(data => createCard(data));

    //         function createCard(data, ) {
    //             data.forEach(({img, altimg, title, descr, price}) => {
    //                 const element = document.createElement('div');
    //                 price = price * 27;
    //                 element.classList.add('menu__item');

    //                 element.innerHTML = `
    //                     <img src=${img} alt=${altimg}>
    //                     <h3 class="menu__item-subtitle">${title}</h3>
    //                     <div class="menu__item-descr">${descr}</div>
    //                     <div class="menu__item-divider"></div>
    //                     <div class="menu__item-price">
    //                         <div class="menu__item-cost">Цена:</div>
    //                         <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                     </div>
    //                 `;
    //                 document.querySelector('.menu .container').append(element);
    //             });
    //         }
    // // createCatd получает data, т.к. это массив, перебираем его, деструктуризируем объект на свойства
    // // создает div,дает ему класс,внутрь кладет свойства которые пришли из сервера,append к элементу
}

module.exports = cards;