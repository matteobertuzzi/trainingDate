const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [{title: "FIRST", background: "white", initial: "white"},
             {title: "SECOND", background: "white", initial: "white"}],
      currentUser: {},
      logged: false,
    },

    actions: {
      setLogged: (value) =>{
				if (!value) {
                    localStorage.removeItem("accessToken");
                }
				setStore({ logged: value });	  
			},

			setUser: (value) => {
				setStore({ user: value})
			},

      loginUser: async(inputs, user_type) => {
        const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: inputs.email,
              password: inputs.password,
          }),
        };
        const response = await fetch(`${process.env.BACKEND_URL}/api/login/${user_type}`, options)
        if (!response.ok) return false
        const data = await response.json()
        localStorage.setItem("accessToken", data.access_token);
        setStore({ currentUser: data.results });
        return true
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => { getActions().changeColor(0, "green"); },
      getMessage: async () => {
        try {
          // Fetching data from the backend
          const url = process.env.BACKEND_URL + "/api/hello";
          const options = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const response = await fetch(url, options)
          const data = await response.json()
          setStore({ message: data.message })
          return data;  // Don't forget to return something, that is how the async resolves
        } catch (error) {
          console.log("Error loading message from backend", error)
        }
      },
      changeColor: (index, color) => {
        const store = getStore();  // Get the store
        // We have to loop the entire demo array to look for the respective index and change its color
        const demo = store.demo.map((element, i) => {
          if (i === index) element.background = color;
          return element;
        });
        setStore({ demo: demo });  // Reset the global store
      }
    }
  };
};

export default getState;
