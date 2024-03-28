const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [{title: "FIRST", background: "white", initial: "white"},
<<<<<<< HEAD
             {title: "SECOND", background: "white", initial: "white"}],
      currentUser: {},
      logged: false,
      specializations: [],
      trainersClasses: []
=======
             {title: "SECOND", background: "white", initial: "white"}]      
>>>>>>> f366117a2e7be3dbab78eafb3b2925ea0ea4283e
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

      setSpecializations: (value) => {
        setStore({specializations: value})
      },

      setTrainersClases: (value) => {
        setStore({trainersClasses: value})
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
        setStore({ currentUser:  JSON.stringify(data.results) });
        localStorage.setItem("availableAccount", JSON.stringify(data.results));
        localStorage.setItem("accessToken", data.access_token);
        getActions().setLogged(true)
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

      getSpecializations: async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/specializations`)
        if(!response.ok) return response.status, 404
        const data = await response.json();
        localStorage.setItem('specializations', JSON.stringify(data.specializations));
        setStore({ specializations: data.specializations });
      },

      postTrainerClasses: async (inputs) => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const trainerId = availableAccount.trainer.id;
        console.log(availableAccount, availableAccountString)
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
