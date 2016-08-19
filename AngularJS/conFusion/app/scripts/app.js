'use strict';

angular.module('confusionApp', []) //2nd parm: empty array for now
        .controller('menuController', function(){ //function contains the core for the controller

            this.select = function(tabNum){
                this.tab = tabNum;

                switch(tabNum)
                {
                    case 1:
                        this.filtText = "";
                        break;

                    case 2:
                        this.filtText = "appetizer";
                        break;

                    case 3:
                        this.filtText = "mains";
                        break;

                    case 4:
                        this.filtText = "dessert";
                        break;
                }
            };

            this.isSelected = function(tabNum){
                return (this.tab === tabNum);
            };

            this.filtText = '';

/*
    *** about the === comparator:

    the === compares the two sides without doing any type conversion, that means if the
    types aren't equal, then it returns false. the == comparer checks if the types
    aren't equal, if so, it tries to convert them and then does the comparison. for example:
        '1' == 1 ---> true
        '1' === 1 --> false
    aplica lo mismo para otros tipos de datos y objetos.
*/

            this.tab=1;

            this.dishes=[
                     {
                       name:'Uthapizza',
                       image: 'images/uthapizza.png',
                       category: 'mains',
                       label:'Hot',
                       price:'4.99',
                       description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                       comment: ''
                    },
                    {
                       name:'Zucchipakoda',
                       image: 'images/zucchipakoda.png',
                       category: 'appetizer',
                       label:'',
                       price:'1.99',
                       description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                       comment: ''
                    },
                    {
                       name:'Vadonut',
                       image: 'images/vadonut.png',
                       category: 'appetizer',
                       label:'New',
                       price:'1.99',
                       description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                       comment: ''
                    },
                    {
                       name:'ElaiCheese Cake',
                       image: 'images/elaicheesecake.png',
                       category: 'dessert',
                       label:'',
                       price:'2.99',
                       description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                       comment: ''
                    }
                    ];
        });