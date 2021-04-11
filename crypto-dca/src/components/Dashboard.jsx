import React from "react";
import { useState } from "react";
import { useCallGetFn } from "../useCallGetFn";
import { ResponsivePie as Pie } from "@nivo/pie";
import { Flex, Box } from "reflexbox";
import { sum } from "lodash";

const Text = Box;

function getDataPie(balances) {
  return Object.entries(balances || {})
    ?.map(([key, value]) => ({
      id: key,
      label: key + " : " + Number(value.available).toFixed(8),
      value: Number(value.available),
    }))
    ?.filter((item) => (item.value !== 0 && item.id !== "EUR"));
}


function getAvalaibleFIAT(balances) {
  return balances?.["EUR"]?.available;
}

function getTotalAccount(prices, balances, precision) {
  if (!prices) return 0;

  const myAccount = Object.entries(balances || {})
    ?.map(([key, value]) => ({
      symbol: key,
      qty: Number(value.available),
    }))
    ?.filter((item) => item.qty !== 0)
    ?.map((account) => {
      return {
        symbol: account.symbol,
        qty: account.qty,
        priceInBTC:
          account.symbol === "BTC"
            ? 1
            : Number(prices?.[`${account.symbol}BTC`]),
      };
    });

  return (
    sum(myAccount?.map((a) => a.priceInBTC * Math.pow(10, precision) * a.qty)) /
    Math.pow(10, precision)
  );
}

export function Dashboard() {
  const [text, setText] = useState();
  const { data: futuresExchangeInfo } = useCallGetFn("futuresExchangeInfo");
  const { data: balances } = useCallGetFn("getBalances");
  const { data: prices } = useCallGetFn("prices");

  

  const dataPie = getDataPie(balances);
  const BTCPrecision = 8;
  const totalAccount = getTotalAccount(prices, balances, BTCPrecision);
  const availableFIAT = getAvalaibleFIAT(balances);

  const totalInUSD = totalAccount * Number(prices?.BTCUSDT);

  console.log({ balances });



  return (
    <Flex pt={1} m={1} flexDirection="column">
      <div style={{ backgroudColor: 'orange' }}>
        <Text fontWeight="bold" color="orange">
          {totalAccount} BTC
        </Text>
        <Text fontWeight="bold" color="orange">
          {totalInUSD} $
        </Text>

        <Text fontWeight="bold" color="orange">
          FIAT disponible : {availableFIAT} EUR
        </Text>

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
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: -62,
                translateY: 0,
                itemsSpacing: 0,
                itemWidth: 106,
                itemHeight: 30,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 21,
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
      </div>
    </Flex>
  );
}
