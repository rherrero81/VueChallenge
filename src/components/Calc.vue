<template>
  <div id="app">
    <div class="htmlcalc">
      <div class="displaysub">
        <span id="res2"
          >{{ operation.number1 }}{{ operation.operator
          }}{{ operation.number2 }}</span
        >
      </div>
      <div class="display">
        <span id="res">{{ (operation.result * 1).toString() }}</span>
      </div>
      <div class="buttons">
        <span v-for="item in buttons">
          <button :id="getId(item)" v-on:click="stepOp(item, null)">
            {{ item }}
          </button>
        </span>
      </div>
      <div class="equal">
        <button id="bE" v-on:click="stepOp('=', null)">=</button>
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
      buttons: [
        "7",
        "8",
        "9",
        "/",
        "4",
        "5",
        "6",
        "*",
        "1",
        "2",
        "3",
        "-",
        "C",
        "0",
        ".",
        "+",
      ],
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
     * getId method'
     * @param  execOp string: '*'.'+','-','/','C','='
     * TODO : refactor
     */
    getId(execOp) {
      switch (execOp) {
        case "*":
          return "bM";
          break;
        case "+":
          return "bS";
          break;
        case "-":
          return "bR";
          break;
        case "/":
          return "bD";
          break;
        case "=":
          return "bE";
          break;
        case ".":
          return "bP";
        default:
          return "b" + execOp;
          break;
      }
    },
    /**
     * stepOp method
     * @param  addNum string  = '[0-9] | .''
     * @param  execOp string: '*'.'+','-','/','C','='
     * TODO : refactor
     */
    stepOp(execOp) {
      if (["=", "/", "*", "-", "C", "+"].indexOf(execOp) != -1) {
        this.changeOp(execOp);
      } else {
        this.changeValue(execOp);
      }
    },
    /**
     * changeOp method: exec and operation.
     * @param  oper string  = '[0-9] | .'
     * TODO : refactor
     */
    changeOp(oper) {
      if (oper == "C") {
        this.operation.number1 = "";
        this.operation.number2 = "";
        this.operation.operator = "";
        this.operation.result = 0;
        this.operation.estado = 0;
        return;
      }

      if (this.operation.estado == 1 && this.operation.number2 != "") {
        this.operation.result = this.calculate(
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

      this.operation.estado = 1;
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
      const precision=10;
      if (number1 == "" || number2 == "") return 0;

      number1 = parseFloat(number1);
      number2 = parseFloat(number2);

      switch (operation) {
        case "+":
          return (number1 + number2).toFixed(precision);
          break;
        case "-":
          return (number1 - number2).toFixed(precision);
          break;
        case "*":
          return (number1 * number2).toFixed(precision);
          break;
        case "/":
          return (number1 / number2).toFixed(precision);
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
