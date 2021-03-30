import { useCallGetFn } from "./useCallGetFn";

function App() {
  const { data } = useCallGetFn("test");

  console.log(data);

  return (
    <div>
      <header>Crytpto DCA</header>
      <input type="text" />
      {data.symbols?.map((symbol) => (
        <div>{symbol.baseAsset}</div>
      ))}
    </div>
  );
}

export default App;
