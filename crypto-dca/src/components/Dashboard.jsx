import React from "react";

import { useState } from "react";
import { useCallGetFn } from "../useCallGetFn";
import { ResponsivePie as Pie } from "@nivo/pie";
import { firebase } from "../firebase";

function Dashboard() {

  const { data: test } = useCallGetFn("test");
  const { data: balances } = useCallGetFn("getBalances");

  const [text, setText] = useState();

  const accountBalanceObj = { balances, test };
  const accountBalance = Object.entries(accountBalanceObj || {})
  ?.map(([key, value]) => ({
    id: key,
    value: Number(value.available),
  }))
  ?.filter((item) => item.value !== 0);

  console.log({ accountBalance });


  const dataPie = Object.entries(balances || {})
    ?.map(([key, value]) => ({
      id: key,
      label: key + " : " + Number(value.available).toFixed(8),
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
    
    <div className="dashboard">
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
      <div>
        <p style={{ color: "blue" }}> Valeur du compte : {balances?.BTC?.available}</p>
      </div>

      <div style={{ width: "100%", height: "400px", padding: " 0% 0% " }}>
        <Pie
          data={dataPie}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableRadialLabels={false}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabel="id"
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: -62,
                translateY: 0,
                itemsSpacing: 0,
                itemWidth: 106,
                itemHeight: 30,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 21,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        />
      </div>
      {test?.symbols?.map((symbol) => (
        <div>{symbol.baseAsset}</div>
      ))}
    </div>

      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Dashboard</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


