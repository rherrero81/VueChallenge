<template>
  <div id="app">
    <div  class="htmlcalc">
      <div class="displaysub"><span id="res2">{{ operation.number1}}{{ operation.operator}}{{ operation.number2}}</span>
      </div>
      <div class="display"><span id="res">{{ (operation.result*1).toString() }}</span></div>
      <div class="buttons">
        <button id="b7" v-on:click="stepOp('7',null,null)">7</button>
        <button id="b8" v-on:click="stepOp('8',null,null)">8</button>
        <button id="b9" v-on:click="stepOp('9',null,null)">9</button>
        <button id="bd" v-on:click="stepOp(null,'/',null)"> / </button>
        <button id="b4" v-on:click="stepOp('4',null,null)">4</button>
        <button id="b5" v-on:click="stepOp('5',null,null)">5</button>
        <button id="b6" v-on:click="stepOp('6',null,null)">6</button>
        <button id="bm" v-on:click="stepOp(null,'*',null)"> x </button> <br></br>
        <button id="b1" v-on:click="stepOp('1',null,null)">1</button>
        <button id="b2" v-on:click="stepOp('2',null,null)">2</button>
        <button id="b3" v-on:click="stepOp('3',null,null)">3</button>
        <button id="br" v-on:click="stepOp(null,'-',null)"> - </button>
        <button id="bc" v-on:click="stepOp(null,'C',null)"> C </button>
        <button id="b0" v-on:click="stepOp('0',null,null)">0</button>
        <button id="bp" v-on:click="stepOp('.',null,null)">.</button>
        <button id="bs" v-on:click="stepOp(null,'+',null)"> + </button>
      </div>
      <div class="equal"> <button id="be" v-on:click="stepOp(null,'=',null)               "> = </button>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  template: "<calc/>",
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
    /**
     * stepOp method
     * @param  addNum string  = '[0-9] | .''
     * @param  execOp string: '*'.'+','-','/','C','='
     * TODO : refactor
     */
    stepOp(addNum, execOp) {
      if (addNum !== null) {
        this.changeValue(addNum);
      }

      if (execOp !== null) {
        this.changeOp(execOp);
      }
    },
    /**
     * changeOp method: exec and operation.
     * @param  oper string  = '[0-9] | .'
     * TODO : refactor
     */
    changeOp(oper) {
      if (this.operation.estado == 1 && this.operation.number2 != "") {
        this.operation.result =this.calculate(
          this.operation.number1,
          this.operation.operator,
          this.operation.number2
        );
        this.operation.number1 = this.operation.result.toString();
        this.operation.number2 = "";
        this.operation.operator = "";
        if (oper !== "=") this.operation.operator = oper;
      }

      if (oper !== "=") this.operation.operator = oper;

      if (oper == "C") {
        this.operation.number1 = "";
        this.operation.number2 = "";
        this.operation.operator = "";
        this.operation.result = 0;
        this.operation.estado = 0;
      } else this.operation.estado = 1;

      /*      console.log(
         this.operation.number1 + " " +  this.operation.operator + " " +  this.operation.number2 + " = " +  this.operation.result
      ); */
    },
    /**
     * changeValue method : exec a change of Value in display.
     * @param  numb string = '[0-9] | .''
     * TODO : refactor
     */
    changeValue(num) {
      if (this.operation.estado == 0) {
        this.operation.number1 += num;
        this.operation.result = parseFloat(this.operation.number1);
      } else {
        this.operation.number2 += num;
        this.operation.result = parseFloat(this.operation.number2);
      }
      //console.log( this.operation.number1 + " " +  this.operation.operator + " " +  this.operation.number2 + " =  X");
    },
    /**
     * calculate method : calculate result 'number1 oper number2'
     * @param  number1 string  'float'
     * @param  oper string : '*'.'+','-','/','C'
     * @param  number2 string  'float'
     * TODO : control toFixed(5) solution
     */
    calculate(number1, operation, number2) {
      if (number1 == "" || number2 == "") return 0;

      number1 = parseFloat(number1);
      number2 = parseFloat(number2);

      switch (operation) {
        case "+":
          return (number1 + number2).toFixed(5);
          break;
        case "-":
  
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
  },
};
</script>


<style scoped>
.htmlcalc {
  width: 40vw;
/*   min-width: 700px !important; */
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
  font-size: calc(10px + 4vh);
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
  font-size: calc(5px + 2vh);
  color: lightslategray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 5vh;
}

.buttons button {
  width: 10vw;
 /*  min-width: 100px !important; */
  height: 10vh;
  font-size: calc(5px + 4vh);

  cursor: pointer;
  background: -webkit-linear-gradient(antiquewhite, white);
  radius: 5px 5px 5px 5px;
  border-width: thin;
  border-color: lightsteelblue;
}

.buttons button:hover {
  background: -webkit-linear-gradient(white, rgb(173, 108, 84));
}

.equal button {
  width: 40vw;
  height: 10vh;
  font-size: calc(10px + 4vh);
  border-radius: 0px 0px 35px 35px;
  border-width: thin;
  background-color: cornflowerblue;
  cursor: pointer;
}

.equal button:hover {
  background: -webkit-linear-gradient(lightslategray, orangered);
}
</style>
