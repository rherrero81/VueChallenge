class Wellcome extends HTMLElement {


    get ContainerElement() {
        if (templates['./components/Wellcome/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Wellcome/template.html'];
            return this.querySelector("#wellcome");
        } else return this.querySelector("#wellcome");

        //  if (!this.hasOwnProperty('children')) {

    }


    get FirstNameElement() {
        return this.ContainerElement.querySelector("#lf");
    }
    get LastNameElement() {
        return this.ContainerElement.querySelector("#ll");
    }

    get DescElement() {
        return this.ContainerElement.querySelector("#Ldesc");
    }
    get CostElement() {
        return this.ContainerElement.querySelector("#Lcost");
    }

    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */

    }
    connectedCallback() {
        /*called when the element is 
                                connected to the page.
                                This can be called multiple 
                                times during the element's lifecycle. for example when using drag&drop to move elements around */
        let that = this;


        getTemplate("./components/Wellcome/template.html").then((html) => {


            this.setVisibility(this.attributes['visible'].value === 'true');


            modelservice$.subscribe('status', function name(params) {
                console.log('Status changed (Wellcome) : ' + params);
                if (params == "0")
                    that.setVisibility(true);
                else that.setVisibility(false);
            });

            modelservice$.subscribe('user', function name(user) {
                console.log('User changed (Wellcome) : ' + user);

                that.FirstNameElement.innerHTML = user.f; // + ' ( ' + this.attributes['arg'].value + ' ) ';
                that.LastNameElement.innerHTML = user.l;

            });

            this.ContainerElement.querySelector('#ulS').addEventListener("click", function(e) {
                let val = parseInt(e.target.value);
                let drink = modelservice$.getvalue('drink');
                drink.setSize(val);
                modelservice$.publish('drink', drink);
                Array.from(e.target.parentNode.children).map(e => e.classList.remove('list__item--selected'));;

                e.target.classList.add('list__item--selected');

            });

            this.ContainerElement.querySelector('#ulD').addEventListener("click", function(e) {
                let val = e.target.value;
                let drink = modelservice$.getvalue('drink');
                let tp = modelservice$.getvalue('toppin');
                if (val == -1)
                    drink = new Coffe(drink ? drink.size : 1);
                if (val == -2)
                    drink = new Tea(drink ? drink.size : 1);
                modelservice$.publish('toppin', null);
                modelservice$.publish('drink', drink);
                Array.from(e.target.parentNode.children).map(e => e.classList.remove('list__item--selected'));;

                e.target.classList.add('list__item--selected');

            });

            this.ContainerElement.querySelector('#ulT').addEventListener("click", function(e) {
                let val = e.target.value;

                let tp = modelservice$.getvalue('toppin');
                let drink = modelservice$.getvalue('drink');
                let topping;
                if (val == 1)
                    tp = new Soya(drink);
                if (val == 2)
                    tp = new Milk(drink)
                if (val == 3)
                    tp = new Mokka(drink);
                modelservice$.publish('toppin', tp);

            });

            this.ContainerElement.querySelector('#bKO').addEventListener("click", function() {
                current_user = {
                    f: "",
                    v: "",
                    l: "",
                    p: "",
                    m: "",
                };


                modelservice$.publish('status', "2");
                //VisibilityState();

            });

            /*      let coffe = new Coffe(2);
                 let cost = coffe.getCost();
                 let toppin = new Milk(coffe);
                 toppin = new Soya(coffe);
                 toppin = new Soya(coffe);
                 toppin = new Mokka(coffe);
                 toppin = new Mokka(coffe); */
            modelservice$.subscribe('toppin', (top) => {
                if (top) {
                    that.CostElement.innerHTML = top.getCost() + '(€)';
                    that.DescElement.innerHTML = top.getDescription();
                }

            });
            modelservice$.subscribe('drink', (dri) => {

                if (modelservice$.getvalue('toppin')) {
                    that.CostElement.innerHTML = modelservice$.getvalue('toppin').getCost() + '(€)';
                    that.DescElement.innerHTML = modelservice$.getvalue('toppin').getDescription();
                } else {
                    that.CostElement.innerHTML = dri.getCost() + '(€)';
                    that.DescElement.innerHTML = dri.getDescription();
                }


            });
            /*  modelservice$.publish('toppin', toppin);
             modelservice$.publish('drink', coffe); */

        });
    }
    changeDrink(e) {
        console.log(e);

    }
    addTopping(e) {
        console.log(e);

    }
    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }
    /*   refresh() {

        this.FirstNameElement.innerHTML = current_user.f; // + ' ( ' + this.attributes['arg'].value + ' ) ';
        this.LastNameElement.innerHTML = current_user.l;
    }
 */
    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("well-come", Wellcome);