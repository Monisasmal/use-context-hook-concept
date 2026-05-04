import { Component, useState, useEffect, createContext, useContext } from "react";

function Intro(){
  return(
    <div style={{background:"#cff0f8ff", padding:"20px", borderRadius:"5px"}}>
      <h2>What is useContext and why is it used?</h2>
      <p>✅ Answer:
        useContext is a  React Hook that allows you to access the value of a Context directly without <br/>using prop drilling (passing props down through multiple levels).</p>
        <p>Example:
       Instead of passing user from App ➝ Navbar ➝ Profile, you can store user in a Context <br/> and access it directly in Profile.</p>
       <h2>What is the difference between useContext and Context API?</h2>
       <ol> 
        <li>
          Context API = a mechanism provided by React to share data globally. <br/> (It includes createContext, Provider, and Consumer.)
        </li>
        <li>useContext = a hook that makes it easy to consume the context value.</li>
       </ol>
    </div>
  )
}


// ---------------------- PROJECT 1: Theme Context ----------------------

const ThemeContext = createContext();

function ThemeProvider({children}) {
  const[dark,setDark] = useState(false);
  const ToggleTheme = () =>setDark((prev) => !prev)

  return(
    <ThemeContext.Provider value={{dark,ToggleTheme}}>
      {children}
      </ThemeContext.Provider>
  )
}

function ThemeChild(){
  const{dark,ToggleTheme} = useContext(ThemeContext);
  const container = {
    background: dark ? "#222" : "#f8ececff",
    color: dark ? "#fff" : "#000",
    padding: "40px",
    textAlign: "center",
    borderRadius:"10px",
    width:"250px",
    Height:"150px",
  };

  return(
  <div style={container}>
    <h2>{dark?"🌙 Dark Mode" : "☀️ Light Mode"}</h2>
    <button onClick={ToggleTheme}>Toggle</button>
  </div>
  )
}

function ThemeProject(){
  return(
    <ThemeProvider>
      <ThemeChild/>
      </ ThemeProvider>
  )
}

// 2. Global Counter----------------------------------------------------------------------------------

const CounterContext = createContext();

function CountProvider({children}){
const[count,setCount] = useState(0);
return(
  <CounterContext.Provider value={{count,setCount}}>
  {children}
  </CounterContext.Provider>
)
}

function CounterChild(){
  const{count,setCount} = useContext(CounterContext);

  const box = { 
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }

  const btn ={
    background:"pink",
    margin:"10px 10px"
  }

  const title = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }

  const container = {
    Height:"200px",
    Width:"250px",
    background: "#cff0f8ff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  }

  return (
    <div style={container}>
  <h2 style={title}>Count: {count}</h2>
  <div style={box}>
  <button  style={btn} onClick={() =>setCount(count+1)}>+</button>
  <button style={btn} onClick={() => {if(count>0) setCount(count-1)}}>-</button>
  <button style={btn} onClick={() => setCount(0)}>Reset</button>
  </div>
  </div>
  )
  
}

function CountProject(){
  return(
    <CountProvider>
      <CounterChild/>
    </CountProvider>
  )
}

// Language Switcher:-------------------------------------------------------------

const LanguageContext = createContext();
function LanguageProvider({children}){
  const[language,setLanguage] = useState("en");
  const ToggleLanguage = () => setLanguage((ele) => (ele === 'en' ? "hi" :"en"));

 
  return(
    <LanguageContext.Provider value={{language,ToggleLanguage}}>
      {children}
    </LanguageContext.Provider>
  )
}

function LanguageChild(){
  const{language,ToggleLanguage} = useContext(LanguageContext);
  const text = {
  en: { greeting: "Hello, Welcome!" },
  hi: { greeting: "नमस्ते, स्वागत है!" },
};
const btn ={
    background:"pink",
    margin:"10px 10px"
  }

   const containers = {
    minHeight:"150px",
    minWidth:"250px",
    background: "#cff0f8ff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  }

return(
  <div style={containers}>
  <div style={{textAlign:"center",}}>
  <h2>{text[language].greeting}</h2>
  <button style={btn} onClick={ToggleLanguage}>Toggle</button>
</div>
</div>
)
}

function LanguageProject(){
  return(
    <LanguageProvider>
    <LanguageChild/>
  </LanguageProvider>
  )
  
}
 
const projects = [
  {
    category: "Basic",
    items: [
       {id:1, name:"Introduction", Component:<Intro />},
       {id:2, name:"CountContext", Component:<CountProject />},
      {id:3, name: "ThemeContext", Component: <ThemeProject /> },
      {id:4, name:"Language Switcher", Component:<LanguageProject/>}
    ],
  },
  
];


export default function App() {
  const [activeProject, setActiveProject] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Responsive handling for hamburger
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: "250px",
    background: "#6200ea",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "fixed",
    left: isMobile ? (isSidebarOpen ? "0" : "-260px") : "0",
    top: 0,
    bottom: 0,
    overflowY: "auto",
    transition: "left 0.3s ease",
    zIndex: 2000,
  };

  const hamburgerStyle = {
    position: "fixed",
    top: 20,
    left: 20,
    background: "#6200ea",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: 2500,
    display: isMobile ? "block" : "none",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: isMobile && isSidebarOpen ? "block" : "none",
    zIndex: 1500,
  };

  const contentStyle = {
    flex: 1,
    marginLeft: isMobile ? "0" : "250px",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "margin-left 0.3s ease",
    background: "#ffffffff",
    minHeight: "80vh",
    minWidth:"70vw",
  };

  const menuBtn = (isActive) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    background: isActive ? "#fff" : "#3700b3",
    color: isActive ? "#000" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "0.3s",
  });

  const allItems = projects.flatMap((p) => p.items);
  const active = allItems.find((p) => p.id === activeProject)?.Component;

  return (
    <>
      <div style={overlayStyle} onClick={toggleSidebar}></div>
      <button style={hamburgerStyle} onClick={toggleSidebar}>
        ☰
      </button>

      <aside style={sidebarStyle}>
        <h2 style={{ textAlign: "center" }}>📂 useContext Projects</h2>
        {projects.map((group) => (
          <div key={group.category}>
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {group.category}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                style={menuBtn(activeProject === item.id)}
                onClick={() => {
                  setActiveProject(item.id);
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main style={contentStyle}>{active}</main>
    </>
  );
}
