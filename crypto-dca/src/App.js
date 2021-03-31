import { useState } from "react";
import { useCallGetFn } from "./useCallGetFn";
import { ResponsivePie as Pie } from "@nivo/pie";
import { firebase } from "./firebase";

function App() {
  const { data: test } = useCallGetFn("test");
  const { data: balances } = useCallGetFn("getBalances");

  const [text, setText] = useState();

  console.log({ balances, text });

  const dataPie = Object.entries(balances || {})
    ?.map(([key, value]) => ({
      id: key,
      label: key,
      value: Number(value.available),
    }))
    ?.filter((item) => item.value !== 0);

  const lanceUneRequete = async () => {
    console.log("lance une requet");
    // const result = await firebase.functions().httpsCallable("getBalances")({
    //   text,
    // });
  };

  return (
    <div>
      <header>Crytpto DCA</header>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e?.target?.value)}
      />
      <button onClick={lanceUneRequete}>go</button>
      <p style={{ color: "blue" }}> BTC: {balances?.BTC?.available}</p>

      <table style={{ border: "1px solid black" }}>
        {dataPie?.map((item) => (
          <tr>
            <td>{item.label}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </table>

      <div style={{ width: "100%", height: "400px" }}>
        <Pie
          data={dataPie}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
      {test?.symbols?.map((symbol) => (
        <div>{symbol.baseAsset}</div>
      ))}
    </div>
  );
}

export default App;
