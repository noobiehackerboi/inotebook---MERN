import Notes from "./Notes"

const Home = (props) => {
  return (
    <div data-bs-theme={props.mode}>
      <Notes showAlert={props.showAlert} />
    </div >
  )
}

export default Home;