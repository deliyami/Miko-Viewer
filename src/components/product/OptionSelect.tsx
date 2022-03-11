import { Select, Text, Flex } from "@chakra-ui/react"
import { useState } from "react";
import PopOver from "./PopOver";

const OptionSelect = () => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const countArr = [1, 2, 3, 4, 5];
    const colorArr = ["red", "blue", "black", "white", "yellow"];
    const sizeArr = ["xs", "s", "m", "l", "xl"];
    function onCountChange(event) {
        console.log(event.target.value);
        setCount(event.target.value);
    }

    function onColorChange(event) {
        setColor(event.target.value);
    }
    function onSizeChange(event) {
        setSize(event.target.value);
    }
    return (
        <Flex flexDirection={"column"}>

            <PopOver count={count} size={size} color={color}></PopOver>

            <Select placeholder="数量" mt={61} value={count} onChange={onCountChange}>
                {countArr.map((count, key) => {
                    return (
                        <option key={key}>{count}</option>
                    )
                })}
            </Select>
            {/* {count !== 0 ? null : <Text align={"right"} color={"red"}>数量を選択してください。</Text>} */}
            <Select placeholder="カラー" mt={6} value={color} onChange={onColorChange}>
                {colorArr.map((color, key) => {
                    return (
                        <option key={key}>{color}</option>
                    )
                })}
            </Select>
            {/* {color !== "" ? null : <Text align={"right"} color={"red"}>カラーを選択してください。</Text>} */}
            <Select placeholder="サイズ" mt={6} value={size} onChange={onSizeChange}>
                {sizeArr.map((size, key) => {
                    return (
                        <option key={key}>{size}</option>
                    )
                })}
            </Select>
            {/* {size !== "" ? null : <Text align={"right"} color={"red"}>サイズを選択してください。</Text>} */}
        </Flex>
    )
}
export default OptionSelect;