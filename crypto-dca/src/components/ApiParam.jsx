import React from "react";
import { Flex } from "reflexbox";

export function ApiParam() {
  return (
    <Flex p={4} flexDirection="column">
      <input placeholder="API Key" />
      <Flex my={3} />
      <input placeholder="API Secret" />
    </Flex>
  );
}
