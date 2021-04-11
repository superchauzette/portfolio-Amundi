import React from "react";
import { useCallGetFn } from "../useCallGetFn";
import { Flex } from "reflexbox";

export function Orders() {
  const { data: futuresAllOrders } = useCallGetFn("futuresAllOrders");
  console.log({ futuresAllOrders });

  return (
    <Flex>
      Orders
      <Flex flexDirection="column">titit</Flex>
    </Flex>
  );
}
