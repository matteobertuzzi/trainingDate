const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [{title: "FIRST", background: "white", initial: "white"},
             {title: "SECOND", background: "white", initial: "white"}],
      currentUser: {},
      logged: false,
      specializations: [],
      trainersClasses: []
    },

    actions: {
      setLogged: (value) =>{
				if (!value) {
                    localStorage.removeItem("accessToken");
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
        setStore({ currentUser: data.results });
        localStorage.setItem("availableAccount", JSON.stringify(data.results));
        localStorage.setItem("accessToken",  JSON.stringify(data.access_token))
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
            if (response.status === 401) {
                localStorage.removeItem("accessToken");
                console.error("Access token is not valid. Removed from local storage.");
            } else {
                console.error(`Error fetching protected data. HTTP Status: ${response.status}`);
            }
            return null;
        }
    
        const data = await response.json();
        console.log(data);
        setStore({ currentUser: data.account });
        getActions().setLogged(true);
    },

      getSpecializations: async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/specializations`)
        if(!response.ok) return response.status, 404
        const data = await response.json();
        setStore({ specializations: data.specializations });
        localStorage.setItem('specializations', JSON.stringify(data.specializations));
      },

      postTrainerClasses: async (inputs, id) => {
        const token = localStorage.getItem("accessToken");
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
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${id}/classes`, options);
        if (!response.ok) return response.status; 
        const data = await response.json();
        setStore({ trainersClasses: data.class })
      }}

}
}

export default getState;
