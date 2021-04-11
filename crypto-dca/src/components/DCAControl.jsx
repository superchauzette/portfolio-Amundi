import React, { useState } from "react";
import { Flex, Box } from "reflexbox";
import Select from "react-select";
import { useCallGetFn } from "../useCallGetFn";
import { firebase } from "../firebase";
import { useAuth } from "./Auth";
import { toArray } from "./toArray";
import useSWR from "swr";
import { orderBy } from "lodash";

const Text = Box;

export function DCAControl() {
  const { user } = useAuth();
  const userId = user?.uid;
  const { data: futuresExchangeInfo } = useCallGetFn("futuresExchangeInfo");
  const { data: orders, mutate } = useSWR(
    userId ? `/users/${userId}/orders` : null,
    () =>
      firebase
        .firestore()
        .collection(`/users/${userId}/orders`)
        .get()
        .then((docs) => toArray(docs))
  );

  const [money, setMoney] = useState();
  const [montant, setMontant] = useState();
  const [frequence, setFrequence] = useState();

  console.log({ money, montant, frequence, user, orders });

  const symbols = futuresExchangeInfo?.symbols
    ?.map((s) => s.baseAsset)
    ?.map((s) => ({ label: s, value: s }));

  const submit = async (e) => {
    e.preventDefault();
    await firebase
      .firestore()
      .collection(`/users/${userId}/orders`)
      .add({
        money,
        montant: Number(montant),
        frequence,
        updateAt: firebase.firestore.Timestamp.now(),
      });
    await mutate();
  };

  const removeOrder = async (orderId) => {
    await firebase
      .firestore()
      .collection(`/users/${userId}/orders`)
      .doc(orderId)
      .delete();
    await mutate();
  };

  return (
    <Flex flexDirection="column">
      <form onSubmit={submit}>
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
              value={money}
              onChange={(e) => setMoney(e)}
            />
          </Box>
          <Box width="30%">
            <input
              name="montant"
              type="number"
              style={{ width: "100%", padding: "8px" }}
              placeholder="montant en €"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
            />
          </Box>
          <Box width="30%">
            <Select
              name="frequence"
              label="Frequence"
              options={[
                { label: "every 2 min", value: 2 },
                { label: "every hour", value: 60 },
                { label: "every day", value: 60 * 24 },
                { label: "every week", value: 60 * 24 * 7 },
                { label: "every month", value: 60 * 24 * 30 },
              ]}
              value={frequence}
              onChange={(e) => setFrequence(e)}
            />
          </Box>
          <Box>
            <button type="submit">Ajouter</button>
          </Box>
        </Flex>
      </form>
      <Text m={2}>Resultats</Text>
      <Flex flexDirection="column" px={2}>
        {orderBy(orders, "updateAt", "desc")?.map((order) => (
          <Flex>
            <Box width="30%">{order?.money?.value}</Box>
            <Box width="30%">{order?.montant} €</Box>
            <Box width="30%">{order?.frequence?.label}</Box>
            <Box width="30%">
              {order?.updateAt.toDate().toLocaleString("fr-FR")}
            </Box>
            <Box width="30%">
              <Text>exécuté le {executeAt(order)}</Text>
            </Box>
            <Box width="30%">
              <button onClick={() => removeOrder(order.id)}>Delete</button>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

function executeAt(order) {
  const date = order?.updateAt.toDate();
  date.setMinutes(date.getMinutes() + order?.frequence?.value);
  return date.toLocaleString("fr-FR");
}
