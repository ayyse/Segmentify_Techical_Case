document.addEventListener('DOMContentLoaded', getContainer)

var logoList = document.querySelector('#logos');
var brandNameList = document.querySelector('#topbar');
var imageList = document.querySelector('#images');
var productList = document.querySelector('#products');

function getContainer() {
    fetch('katalog.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (element) {
                // sidebar => product brands
                const productBrand = document.createElement('div');
                productBrand.className = 'productBrand ' + element.brandName;
                productBrand.addEventListener('mouseover', getProductArea)

                // DESKTOP VIEW SIDEBAR -- product brand logos
                const brandLogo = document.createElement('img');
                brandLogo.src = element.brandLogo;
                productBrand.appendChild(brandLogo);
                logoList.appendChild(productBrand);

                // MOBILE VIEW TOPBAR -- product brand names
                const brandName = document.createElement('div');
                brandName.innerText = element.brandName;
                brandName.addEventListener('click', getProductArea)
                brandNameList.appendChild(brandName);

                // default product area
                if (element.brandName == 'NIKE') {
                    getProductArea()
                }

                function getProductArea() {
                    if (element != null) {
                        if (productBrand.className.split(" ")[1] == element.brandName) {
                            const img = document.createElement('img');
                            img.src = element.brandImage;
                            img.style.display = 'flex';
                            img.style.position = 'absolute';
                            img.loading = 'lazy';
                            imageList.appendChild(img);
                        }
                    } else {
                        imageList.innerText = 'image could not be loaded';
                        imageList.style.marginTop = '200px';
                    }

                    if (document.querySelectorAll('.productItem').length > 0) {
                        const collection = document.querySelectorAll('.productItem');

                        for (const elem of collection) {
                            elem.remove();
                        }
                    }

                    element.products.forEach(function (product) {
                        if (product != null) {
                            const item = document.createElement('div');
                            item.className = 'productItem';

                            const image = document.createElement('img');
                            image.src = product.image;
                            image.loading = 'lazy';

                            const productContent = document.createElement('div');
                            productContent.className = 'productContent';

                            const productName = document.createElement('p');
                            const name = document.createTextNode(product.name);
                            name.className = 'productName';
                            productName.appendChild(name);
                            productContent.appendChild(productName);

                            const priceDiv = document.createElement('div');

                            const price = document.createElement('div');
                            const priceElement = document.createTextNode(product.price + ' TL');
                            price.className = 'productPrice';
                            price.appendChild(priceElement);
                            priceDiv.appendChild(price);
                            productContent.appendChild(priceDiv);

                            if (product.oldPrice != null) {
                                const oldPrice = document.createElement('div');
                                const oldPriceElement = document.createTextNode(product.oldPrice + ' TL');
                                oldPrice.className = 'productOldPrice';
                                oldPrice.appendChild(oldPriceElement);
                                priceDiv.appendChild(oldPrice);
                                productContent.appendChild(priceDiv);
                                price.style.color = 'red';
                            }

                            const buy = document.createElement('button');
                            buy.className = 'buyProduct';
                            buy.innerHTML = 'Sepete Ekle';
                            buy.addEventListener('click', popup)
                            productContent.appendChild(buy);

                            item.appendChild(image);
                            item.appendChild(productContent);
                            productList.appendChild(item);
                        } else {
                            item.innerText = 'item could not be loaded';
                        }
                    })
                }

                var closeBtn = document.querySelector('#btn');;
                closeBtn.addEventListener('click', closePopup);

                function popup() {
                    document.getElementById('popup').style.display = 'flex';
                }

                setTimeout(function () {
                    document.getElementById('popup').style.display = 'none';
                }, 4000)

                function closePopup() {
                    document.getElementById('popup').style.display = 'none';
                }
            })
        })
}