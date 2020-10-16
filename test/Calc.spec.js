import { shallowMount } from "@vue/test-utils";
import {
  MdButton,
  MdContent,
  MdTabs,
  mdCard,
} from "vue-material/dist/components";
import Calc from "@/components/Calc.vue";

//Examples
//   expect(wrapper.findAll('li')).toHaveLength(items.length)
///    expect(wrapper.html()).toMatchSnapshot()

describe("Calc.vue", () => {
  it("Sum integer: 7+8= ", () => {
    const wrapper = shallowMount(Calc, {
      operation: {
        number1: "",
        number2: "",
        operator: "",
        result: 0,
        estado: 0,
      },
      activeTab: false,
    });
    wrapper.find("#b7").trigger("click");

    wrapper.find("#bS").trigger("click");

    wrapper.find("#b8").trigger("click");

    wrapper.find("#bE").trigger("click");

    expect(wrapper.find("#res").text()).toEqual("15");
  });

  it("Sum float: 1.2*2.3=", () => {
    const wrapper = shallowMount(Calc, {
      operation: {
        number1: "",
        number2: "",
        operator: "",
        result: 0,
        estado: 0,
      },
      activeTab: false,
    });

    wrapper.find("#b1").trigger("click");
    wrapper.find("#bP").trigger("click");
    wrapper.find("#b2").trigger("click");

    wrapper.find("#bM").trigger("click");

    wrapper.find("#b2").trigger("click");
    wrapper.find("#bP").trigger("click");
    wrapper.find("#b3").trigger("click");

    wrapper.find("#bE").trigger("click");

    expect(wrapper.find("#res").text()).toEqual("2.76");
  });

  it("Sum float: 1.2*2.3-1+", () => {
    const wrapper = shallowMount(Calc, {
      operation: {
        number1: "",
        number2: "",
        operator: "",
        result: 0,
        estado: 0,
      },
      activeTab: false,
    });

    wrapper.find("#b1").trigger("click");
    wrapper.find("#bP").trigger("click");
    wrapper.find("#b2").trigger("click");

    wrapper.find("#bM").trigger("click");

    wrapper.find("#b2").trigger("click");
    wrapper.find("#bP").trigger("click");
    wrapper.find("#b3").trigger("click");

    wrapper.find("#bE").trigger("click");

    wrapper.find("#bR").trigger("click");
    wrapper.find("#b1").trigger("click");
    wrapper.find("#bS").trigger("click");

    expect(wrapper.find("#res").text()).toEqual("1.76");
  });
});
