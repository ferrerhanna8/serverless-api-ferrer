import './App.css'

function App() {
  return (
    <>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
