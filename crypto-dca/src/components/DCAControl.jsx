import React from "react";
import { Flex, Box } from "reflexbox";
import Select from "react-select";
import { useCallGetFn } from "../useCallGetFn";
import { firebase } from "../firebase";

const Text = Box;

function DCAControl() {
  const { data: futuresExchangeInfo } = useCallGetFn("futuresExchangeInfo");

  const symbols = futuresExchangeInfo?.symbols
    ?.map((s) => s.baseAsset)
    ?.map((s) => ({ label: s, value: s }));

  const onSubmit = (values) => {
    //const userId = "I5KYk4bOg1lBGeydp2vk";
    console.log({ values });
    //  firebase.firestore().collection(`/users/${userId}/orders`).add(values);
  };

  return (
    <Flex flexDirection="column">
      <form>
        <Flex
          width="100%"
          justifyContent="space-around"
          alignItems="center"
          mt={3}
        >
          <Box width="30%">
            <Select
              name="money"
              label="Money"
              options={symbols}
              placeholder="montant en €"
            />
          </Box>
          <Box width="30%">
            <input
              name="firstName"
              // ref={register({ required: true, maxLength: 10 })}
              // min="0.01"
              // style={{ width: "100%" }}
              // placeholder="montant en €"
            />
          </Box>
          <Box width="30%">
            <Select
              name="frequence"
              label="Frequence"
              options={[
                { label: "every day", value: "1" },
                { label: "every week", value: "2" },
                { label: "every week", value: "3" },
              ]}
            />
          </Box>
          <Box>
            <button type="submit">Ajouter</button>
          </Box>
        </Flex>
      </form>
      <Text m={2}>Resultats</Text>
      <Flex flexDirection="column" px={2}>
        <Flex>
          <Box width="30%">BTC</Box>
          <Box width="30%">20€</Box>
          <Box width="30%">every day</Box>
        </Flex>
        <Flex>
          <Box width="30%">BTC</Box>
          <Box width="30%">20€</Box>
          <Box width="30%">every day</Box>
        </Flex>
        <Flex>
          <Box width="30%">BTC</Box>
          <Box width="30%">20€</Box>
          <Box width="30%">every day</Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DCAControl;
