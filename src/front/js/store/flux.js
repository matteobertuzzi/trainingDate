const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [{ title: "FIRST", background: "white", initial: "white" },
      { title: "SECOND", background: "white", initial: "white" }],
      allClasses: [],
      currentUser: { id: 1 },
      logged: false,
      userClasses: [],
      specializations: []
    },

    actions: {
      setLogged: (value) => {
        if (!value) {
          localStorage.removeItem("accessToken");
        }
        setStore({ logged: value });
      },

      setUser: (value) => {
        setStore({ user: value })
      },
      getAllClasses: async () => {
        const classesInLocalStorage = localStorage.getItem('allClasses')
        if (classesInLocalStorage) {
          setStore({ allClasses: JSON.parse(classesInLocalStorage) })
        } else {
          const url = `${process.env.BACKEND_URL}/api/classes`
          const response = await fetch(url)
          if (!response.ok) {
            console.error(`Error fetching classes. HTTP Status ${response.status}`)
            return null
          }
          const data = await response.json()
          setStore({ allClasses: data.results })
          console.log(getStore().allClasses)
          localStorage.setItem('allClasses', JSON.stringify(data.results))
        }
      },
      getSpecializations: async () => {
        const specializationsInLocalStorage = localStorage.getItem('specializations')
        if (specializationsInLocalStorage) {
          setStore({ specializations: JSON.parse(specializationsInLocalStorage) })
        } else {
          const url = `${process.env.BACKEND_URL}/api/specializations`
          const response = await fetch(url)
          if (!response.ok) {
            console.error(`Error fetching specializations. HTTP Status ${response.status}`)
            return null
          }
          const data = await response.json()
          const specializations = data.specializations
          setStore({ specializations: specializations })
          console.log(getStore().specializations)
          localStorage.setItem('specializations', JSON.stringify(specializations))
        }
      },

      loginUser: async (inputs, user_type) => {
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

      getAvailableAccount: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found");
          return null;
        }
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`${process.env.BACKEND_URL}/api/current_available_account`, options);
        if (!response.ok) {
          console.error(`Error fetching protected data. HTTP Status: ${response.status}`);
          return null;
        }
        const data = await response.json();
        console.log(data)
        setStore({ currentUser: data.account })
        getActions().setLogged(true)
      },
      getUserClasses: async () => {
        const userClassesInLocalStorage = localStorage.getItem('userClasses')
        if (userClassesInLocalStorage) {
          setStore({ userClasses: JSON.parse(userClassesInLocalStorage) })
        } else {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            console.error("No access token proivded!");
            return null;
          }
          const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const userId = getStore().currentUser.id
          const url = process.env.BACKEND_URL + `/api/users/${userId}/classes`
          const response = await fetch(url, options)
          if (!response.ok) {
            console.error(`Error fetching user classes. HTTP Status ${response.status}`)
            return null
          }
          const data = await response.json();
          const userClassInfo = data.result;
          let userClassesId = []
          let classDetails = []
          for (const item of userClassInfo) {
            const classId = item.class;
            userClassesId.push(classId);
            console.log(userClassesId);
            const classUrl = process.env.BACKEND_URL + `/api/classes/${classId}`;
            const resp = await fetch(classUrl);
            if (!resp.ok) {
              console.error(`Error fetching classes. HTTP Status ${resp.status}`);
              return null;
            }
            const resData = await resp.json(); // Use resp instead of response
            classDetails.push(resData.results);
          }
          setStore({ userClasses: classDetails })
          console.log(getStore().userClasses);
          localStorage.setItem('userClasses', JSON.stringify(classDetails))
        }
      },
      addUser: async (newUser) => {
        console.log(newUser)
        const url = process.env.BACKEND_URL + '/api/users'
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser),
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          console.log(response.status, response.statusText);
          return response.statusText;
        };
        const data = await response.json();
        console.log(data);
        return data
      },
      addTrainer: async (newTrainer) => {
        const url = process.env.BACKEND_URL + '/api/trainers'
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newTrainer),
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          console.log(response.status, response.statusText);
          return response.statusText;
        };
        const data = await response.json();
        console.log(data);
        return data
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