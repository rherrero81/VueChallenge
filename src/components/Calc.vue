
<template>
  <div id="app">

   <div   v-if="activeTab ==0" class="htmlcalc"> 
      <div class="displaysub"><span id="res2">{{ operation.number1}}{{ operation.operator}}{{ operation.number2}}</span></div>
      <div class="display"><span id="res">{{ operation.result }}</span></div>
      <div class="buttons">
        <button id="b7"   v-on:click="changeDisplayValue('7', operation)">7</button>
        <button  id="b8"  v-on:click="changeDisplayValue('8', operation)">8</button>
        <button  id="b9"  v-on:click="changeDisplayValue('9', operation)">9</button>
        <button  id="bd"  v-on:click="changeOp('/',operation,calculate);   "  >   /    </button>       
        <button  id="b4"  v-on:click="changeDisplayValue('4', operation)">4</button>
        <button  id="b5"  v-on:click="changeDisplayValue('5', operation)">5</button>
        <button  id="b6"  v-on:click="changeDisplayValue('6', operation)">6</button>
        <button  id="bm"  v-on:click="changeOp('*',operation,calculate);                  "        >          x        </button>        <br></br>
        <button  id="b1"  v-on:click="changeDisplayValue('1', operation)">1</button>
        <button  id="b2"  v-on:click="changeDisplayValue('2', operation)">2</button>
        <button  id="b3"  v-on:click="changeDisplayValue('3', operation)">3</button>
        <button  id="br"  v-on:click="changeOp('-',operation,calculate);                    "        >          -        </button>       
        <button  id="bc"  v-on:click="changeOp('C',operation,calculate) "        >          C        </button>
        <button  id="b0"  v-on:click="changeDisplayValue('0', operation)">0</button>
        <button  id="bp"  v-on:click="changeDisplayValue('.', operation)">.</button>
        <button  id="bs"  v-on:click="changeOp('+',operation,calculate);          "        >          +        </button>      
       </div>
    <div class="equal">        <button     id="be"           v-on:click="changeOp('=',operation,calculate)                "        >          =        </button>      </div>    </div>
   


  

</div>


</template>

<script>
export default {
    template: '<calc/>',
  name: "calc",
  data() {
    return {
      operation: {
        number1: "",
        number2: "",
        operator: "",
        result: 0,
        estado: 0,
      },
      activeTab: false,
    };
  },
  methods: {
    changeOp(oper, op, calculate) {
      if (op.estado == 1 && op.number2 != "") {
        console.log("Calc..");
        op.result = calculate(op.number1, op.operator, op.number2);
        op.number1 = op.result.toString();
        op.number2 = "";
        op.operator = "";
        if (oper !== "=") op.operator = oper;
      }

      if (oper !== "=") op.operator = oper;

      if (oper == "C") {
        op.number1 = "";
        op.number2 = "";
        op.operator = "";
        op.result = 0;
        op.estado = 0;
      } else op.estado = 1;

      console.log(
        op.number1 + " " + op.operator + " " + op.number2 + " = " + op.result
      );
    },
    changeDisplayValue(num, op) {
      if (op.estado == 0) {
        op.number1 += num;
        op.result = parseFloat(op.number1);
      } else {
        op.number2 += num;
        op.result = parseFloat(op.number2);
      }
      console.log(op.number1 + " " + op.operator + " " + op.number2 + " =  X");
    },
    calculate(number1, operation, number2) {
      if (number1 == "" || number2 == "") return 0;

      number1 = parseFloat(number1);
      number2 = parseFloat(number2);
      
      switch (operation) {
        case "+":
          return (number1 + number2).toFixed(5);
          break;
        case "-":
              console.log('Calc :'+number1+' -  ' +number2+' = '+(number1 - number2).toFixed(5));
          return (number1 - number2).toFixed(5);
          break;
        case "*":
          return (number1 * number2).toFixed(5);
          break;
        case "/":
          return (number1 / number2).toFixed(5);
          break;

        default:
          break;
      }

    },
    onChange(tabIndex) {
      switch (tabIndex) {
        case 0:
          this.activeTab = 0;
          console.log("0");
          break;
        case 1:
          this.activeTab = 1;
          console.log("1");
          break;
      }
    },
    onTabClick(event) {},
  },
};
</script>


<style scoped>
.materialcalc {
  padding-left: 25vw;
  padding-right: 25vw;
  padding-top: 5vh;
  padding-bottom: 5h;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
}

.materialcalc .md-content,
.materialcalc .md-button {
  width: 10vw;
  height: 10vh;
  font-size: 2vw;
  cursor: pointer;
}

.materialcalc .md-content.singleline {
  width: 40vw;
  height: 10vh;
  font-size: 4vw;
  cursor: pointer;
}

.materialcalc .md-content.singleline .md-button {
  width: 40vw;
  height: 10vh;
}

.materialcalc .md-content.singleline div {
  width: 40vw;
  height: 10vh;
  text-align: right;
  font-size: 3vw;
  line-height: 10vh;
}

.htmlcalc {
  width: 45vw;
}

.htmlcalc > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
}

.display span {
  padding: 10px;
  text-align: right;
  width: 40vw;
  height: vh;
  font-size: 4vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 5vh;
    background-color: darkseagreen;
  border-radius: 35px 35px 0px 0px;
}

.displaysub span {
  padding: 10px;
  text-align: right;
  width: 40vw;
  height: 6vh;
  font-size: 2vw;
  color: lightslategray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 5vh;
}

.buttons button {
  width: 10vw;
  height: 10vh;
  font-size: 2vw;
  cursor: pointer;
    background: -webkit-linear-gradient(antiquewhite, white);
  radius: 5px 5px 5px 5px;
  border-width: thin;
  border-color: lightsteelblue;
}

.buttons button:hover {
      background: -webkit-linear-gradient(white, orangered);
}

.equal button {
  width: 40vw;
  height: 10vh;
  font-size: 5vw;
  border-radius: 0px 0px 35px 35px;
  border-width: thin;
      background-color: cornflowerblue;
      cursor:pointer;
}

.equal button:hover {
      background: -webkit-linear-gradient(lightslategray,orangered);
}
</style>
