function App() {
  const customENVars = process.env.CUSTOM_ENV;
  console.log(customENVars);

  return (
    <section>
      <pre>
        {JSON.stringify(customENVars, null, 2)}
      </pre>
    </section>
  );
}

export default App;
