import PetOwnerStore from "./petOwnerStore";
import PetList from "./components/PetList";
import OwnerList from "./components/OwnerList";

function App() {
  const store = new PetOwnerStore(); // class 컴포넌트로 작성한 경우
  return (
    <div className="App">
      <h2>PetList</h2>
      <PetList store={store} />
      <h2>OwnerList</h2>
      <OwnerList store={store} />
    </div>
  );
}

export default App;
