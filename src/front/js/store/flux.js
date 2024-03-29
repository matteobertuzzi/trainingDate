const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [{title: "FIRST", background: "white", initial: "white"},
             {title: "SECOND", background: "white", initial: "white"}],
      currentUser: {},
      logged: false,
      specializations: [],
      trainersClasses: [],
      allClasses: [],
      userClasses: [],
    },

    actions: {
      setLogged: (value) =>{
				if (!value) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("availableUser");
                }
				setStore({ logged: value });	  
			},

			setUser: (value) => {
				setStore({ currentUser: value})
			},

      setTrainersClases: (value) => {
        setStore({trainersClasses: value})
				setStore({ user: value})
			},
        
      getAllClasses: async ()=>{
        const url = `${process.env.BACKEND_URL}api/classes`
        const response = await fetch(url)
        if (!response.ok) {
          console.error(`Error fetching classes. HTTP Status ${response.status}`)
          return null
        }
        const data = await response.json()
        setStore({allClasses: data.results})
      },

      getSpecializations: async () => {
        const specializationsFromLocalStorage = localStorage.getItem('specializations');
        if (specializationsFromLocalStorage) {
            setStore({ specializations: JSON.parse(specializationsFromLocalStorage) });
        } else {
            const response = await fetch(`${process.env.BACKEND_URL}api/specializations`);
            if (!response.ok) {
                console.error('Error al obtener las especializaciones:', response.status);
                return;
            }
            const data = await response.json();
            localStorage.setItem('specializations', JSON.stringify(data.specializations));
            setStore({ specializations: data.specializations });
        }
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
        const response = await fetch(`${process.env.BACKEND_URL}api/login/${user_type}`, options)
        if (!response.ok) return false
        const data = await response.json()
        setStore({ currentUser:  data.results });
        localStorage.setItem("availableAccount", JSON.stringify(data.results));
        localStorage.setItem("accessToken", data.access_token);
        getActions().setLogged(true)
        return true
      },

      getUserClasses: async () => {
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
        const url = process.env.BACKEND_URL + `api/users/${userId}/classes`
        const response = await fetch(url, options)
        if (!response.ok) {
          console.error(`Error fetching user classes. HTTP Status ${response.status}`)
          return null
        }
        const data = await response.json();
        const userClassInfo = data.result;
        setStore({userClasses: data.class})
        let userClassesId = []
        let classDetails = []
        for (const item of userClassInfo) {
          const classId = item.class;
          userClassesId.push(classId);
          console.log(userClassesId);
          const classUrl = process.env.BACKEND_URL + `api/classes/${classId}`;
          const resp = await fetch(classUrl);
          if (!resp.ok) {
            console.error(`Error fetching classes. HTTP Status ${resp.status}`);
            return null;
          }
          const resData = await resp.json(); // Use resp instead of response
          classDetails.push(resData.results);
        }
        setStore({userClasses: classDetails})
        console.log(getStore().userClasses);
      },

      addUser: async (inputs)=>{
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: inputs.name,
            last_name: inputs.last_name,
            email: inputs.email,
            password: inputs.password,
            city: inputs.city,
            postal_code: parseInt(inputs.postal_code),
            phone_number: inputs.phone_number,
            gender: inputs.gender
          }),
        };
        const response = await fetch(`${process.env.BACKEND_URL}api/users`, options);
        if(!response.ok){
          return false;
        };
        const data = await response.json();
        return true
      },
    
      addTrainer: async (inputs) => {
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: inputs.name,
            last_name: inputs.last_name,
            email: inputs.email,
            password: inputs.password,
            city: inputs.city,
            postal_code: parseInt(inputs.postal_code),
            phone_number: inputs.phone_number,
            gender: inputs.gender,
            website_url: inputs.website_url,
            instagram_url: inputs.instagram_url,
            facebook_url: inputs.facebook_url,
            x_url: inputs.x_url,
            bank_iban: inputs.bank_iban
        }),
        };
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers`, options);
        if(!response.ok){
          return false;
        };
        const data = await response.json();
        return true
      },

      getAvailableAccount: async () => {
        const token = localStorage.getItem("accessToken");
        const account = localStorage.getItem("availableAccount");
        if (!token) {
            console.error("No access token found");
            localStorage.removeItem("availableAccount")
            return null;
        }
    
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    
        const response = await fetch(`${process.env.BACKEND_URL}api/current_available_account`, options);
        if (!response.ok) {
            if (response.status === 401) {
                console.error("Access token is not valid. Removed from local storage.");
                localStorage.removeItem("accessToken")
                localStorage.removeItem("availableAccount")
            } else {
                console.error(`Error fetching protected data. HTTP Status: ${response.status}`);
            }
        }
      
          const data = await response.json();
          console.log(JSON.parse(account))
          setStore({ currentUser: JSON.parse(account) });
				  getActions().setLogged(true)
      },

      postTrainerClasses: async (inputs) => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const trainerId = availableAccount.trainer.id;
        if (!token) {
            console.error("No access token found");
            return null;
        }

        const options = {
            method: "POST",
            headers: {
               "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                city: inputs.city,
                postal_code: inputs.postal_code,
                street_name: inputs.street_name,
                street_number: inputs.street_number,
                additional_info: inputs.additional_info,
                capacity: inputs.capacity,
                start_date: inputs.start_date,
                end_date: inputs.end_date,
                price: inputs.price,
                training_level: inputs.training_level,
                training_type: inputs.training_type,
            }),
        };
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/classes`, options);
        if (!response.ok) return response.status; 
        const data = await response.json();
        console.log(data)
        setStore({ trainersClasses: data.class })
      }}
}
}

export default getState;