const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [{ title: "FIRST", background: "white", initial: "white" },
      { title: "SECOND", background: "white", initial: "white" }],
      currentUser: null,
      logged: false,
      specializations: [],
      trainerSpecializations: [],
      trainerClasses: [],
      userInTrainerClass: [],
      allClasses: [],
      userClasses: [],
      cart: [],
      clientSecret: [],
      filters: {
        trainingType: '',
        trainingLevel: ''
      },
      currentGeolocation: {
        lat: '',
        lng: ''
      }
    },

    actions: {

      setUser: (value) => {
        setStore({ currentUser: value })
      },

      setTrainersClases: (value) => {
        setStore({ trainerClasses: value })
        setStore({ user: value })
      },

      setLogged: (value) => {
        if (!value) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("availableAccount");
          localStorage.removeItem("userClasses");
          setStore({ currentUser: null })
        } else {
          setStore({ logged: value })
        }
      },

      addCartItem: (newItem) => {
        const store = getStore();
        if (!store.cart.includes(newItem)) {
          const updatedCart = [...store.cart, newItem];
          setStore({ cart: updatedCart });
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
          getActions().removeCartItem(newItem, store.cart);
        }
      },

      removeCartItem: (item, array) => {
        const updatedCart = array.filter((element) => element !== item);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setStore({ cart: updatedCart });
      },

      getCartItem: () => {
        const storageCart = localStorage.getItem('cart');
        if (storageCart) {
          setStore({ cart: JSON.parse(storageCart) });
        } else {
          setStore({ cart: [] });
        }
      },

      getAllClasses: async () => {
        const url = `${process.env.BACKEND_URL}api/classes`
        const response = await fetch(url)
        if (!response.ok) {
          console.error(`Error fetching classes. HTTP Status ${response.status}`)
          return null
        }
        const data = await response.json()
        setStore({ allClasses: data.results })
        localStorage.setItem('allClasses', JSON.stringify(data.results))
      },

      getTrainerSpecializations: async () => {
        let currentAccount = localStorage.getItem('availableAccount');
        currentAccount = JSON.parse(currentAccount);
        const id = currentAccount.trainer.id;
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

        const url = process.env.BACKEND_URL + `api/trainers/${id}/specializations`
        const response = await fetch(url, options)
        if (!response.ok) {
          console.error(`Error fetching user classes. HTTP Status ${response.status}`)
          return null
        }
        const data = await response.json();
        setStore({ trainerSpecializations: data.result })
        localStorage.setItem('trainerSpecializations', JSON.stringify(data.result))
      },

      getSpecializations: async () => {
        const url = `${process.env.BACKEND_URL}api/specializations`
        const response = await fetch(url)
        if (!response.ok) {
          console.error(`Error fetching specializations. HTTP Status ${response.status}`)
          return null
        }
        const data = await response.json()
        const specializations = data.specializations
        setStore({ specializations: specializations })
        localStorage.setItem('specializations', JSON.stringify(specializations))
      },

      getUserClasses: async () => {
        let currentAccount = localStorage.getItem('availableAccount');
        currentAccount = JSON.parse(currentAccount);
        const id = currentAccount.user.id;
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
        const url = process.env.BACKEND_URL + `api/users/${id}/classes`
        const response = await fetch(url, options)
        if (!response.ok) {
          console.error(`Error fetching user classes. HTTP Status ${response.status}`)
          return null
        }
        const data = await response.json();
        setStore({ userClasses: data.result })
        localStorage.setItem('userClasses', JSON.stringify(data.result))
      },

      getTrainerClasses: async () => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const trainerId = availableAccount.trainer.id;
        if (!trainerId) {
          console.log("No trainer available")
          return null
        }
        if (!token) {
          console.error("No access token found");
          return null;
        }
        const options = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/classes`, options)
        if (!response.ok) {
          return response.status
        }
        const data = await response.json()
        const classes = data.classes
        setStore({ trainerClasses: classes })
        localStorage.setItem('trainerClasses', JSON.stringify(classes))
      },

      getTrainerClassDetails: async (classId) => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const trainerId = availableAccount.trainer.id;
        if (!trainerId) {
          console.log("No trainer available")
          return null
        }
        if (!token) {
          console.error("No access token found");
          return null;
        }
        const options = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/classes/${classId}`, options)
        if (!response) return response.status
        const data = await response.json()
        setStore({userInTrainerClass : data})
      },

      getAvailableAccount: async () => {
        const token = localStorage.getItem("accessToken");
        const account = localStorage.getItem("availableAccount");
        let redirectToHome = false;

        if (!token) {
          console.error("No access token found");
          localStorage.removeItem("availableAccount");
          getActions().setLogged(false);
          redirectToHome = true;
          return
        }

        if (redirectToHome) {
          window.location.href = `${process.env.FRONT_URL}`;
          return;
        }

        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(`${process.env.BACKEND_URL}api/current_available_account`, options);

        if (!response.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("availableAccount");
          getActions().setLogged(false);
          window.location.href = `${process.env.FRONT_URL}`
          return response.status
        } else {
          const data = await response.json();
          setStore({ currentUser: JSON.parse(account) });
          if (data.results.role == "trainers") {
            getActions().getTrainerClasses()
            getActions().getTrainerSpecializations()
          } else if (data.results.role == "users") {
            getActions().getUserClasses()
          }
          getActions().setLogged(true);
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
        const response = await fetch(`${process.env.BACKEND_URL}api/login/${user_type}`, options)
        if (!response.ok) return false
        const data = await response.json()
        setStore({ currentUser: data.results });
        localStorage.setItem("availableAccount", JSON.stringify(data.results));
        localStorage.setItem("accessToken", data.access_token);
        getActions().setLogged(true);

        if (user_type == "trainers") {
          getActions().getTrainerClasses()
          localStorage.removeItem("userClasses")
          setStore({ userClasses: [] });
          window.location.href = `${process.env.FRONT_URL}`
        } else if (user_type == "users") {
          getActions().getUserClasses()
          localStorage.removeItem("trainerClasses")
          setStore({ trainerClasses: [] });
          window.location.href = `${process.env.FRONT_URL}`
        }
        return true
      },

      addUser: async (inputs) => {
        const url = process.env.BACKEND_URL + 'api/users'
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
            postal_code: inputs.postal_code,
            phone_number: inputs.phone_number,
            gender: inputs.gender
          }),
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          console.log(response.status, response.statusText);
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
        if (!response.ok) {
          console.log(response.status, response.statusText);
          return false;
        };
        const data = await response.json();
        return true
      },

      postTrainerClasses: async (inputs) => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const trainerId = availableAccount.trainer.id;
        if (!token) {
          console.error("No access token found");
          return false;
        }
        const options = {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token} `,
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
            price: inputs.price * 100,
            training_level: inputs.training_level,
            training_type: inputs.training_type
          }),
        };
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/classes`, options);
        if (!response.ok) {
          console.error("Failed to create class:", response.status);
          return false;
        }
        const data = await response.json();
        return true
      },

      updateUser: async (id, inputs) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found!");
          return null;
        }
        const url = `${process.env.BACKEND_URL}/api/users/${id}`
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            city: inputs.city,
            postal_code: inputs.postal_code,
            phone_number: inputs.phone_number,
          }),
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          console.error(`Error updating user id: ${id}. HTTP Status ${response.status}`);
          return null;
        }
        const data = await response.json();
        const userData = data.user_update;
        console.log(userData);
        const user = { role: 'users', user: userData }
        localStorage.setItem('availableAccount', JSON.stringify(user));
        return user
      },

      updateTrainer: async (id, inputs) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found!");
          return null;
        }
        const url = `${process.env.BACKEND_URL}api/trainers/${id}`
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            city: inputs.city,
            postal_code: inputs.postal_code,
            phone_number: inputs.phone_number,
            website_url: inputs.website_url,
            instagram_url: inputs.instagram_url,
            facebook_url: inputs.facebook_url,
            x_url: inputs.x_url,
            bank_iban: inputs.bank_iban
          }),
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          console.error(`Error updating trainer id: ${id}. HTTP Status ${response.status}`);
          return null
        }
        const data = await response.json();
        const trainerData = data.trainer_update;
        console.log(trainerData);
        const trainer = { role: 'trainers', trainer: trainerData };
        localStorage.setItem('availableAccount', JSON.stringify(trainer));
        return trainer;
      },

      updateFilters: (newFilters) => {
        setStore({ filters: newFilters });
      },

      postTrainerSpecialization: async (inputs) => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const trainerId = availableAccount.trainer.id;

        if (!token) {
          console.error("No access token found!");
          return null;
        }

        const formData = new FormData();
        formData.append('certification', inputs.certification);
        formData.append('specialization_id', inputs.specialization_id);

        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        };

        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/specializations`, options);
          if (!response.ok) {
            console.error("Failed to post specialization:", response.status);
            return false;
          }
          const data = await response.json();
          console.log(data);
          return true;
        } catch (error) {
          console.error("Error posting specialization:", error);
          return false;
        }
      },

      postUserClass: async (amount, classId) => {
        const token = localStorage.getItem("accessToken");
        const availableAccountString = localStorage.getItem("availableAccount");
        const availableAccount = JSON.parse(availableAccountString);
        const userId = availableAccount.user.id;
        const storageUserClasses = localStorage.getItem("userClasses")
        const userClasses = JSON.parse(storageUserClasses)

        if (!token) {
          console.error("No access token found!");
          return null;
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: amount,
            class_id: classId
          }),
        };

        const response = await fetch(`${process.env.BACKEND_URL}api/users/${userId}/classes`, options)
        if (!response.ok) return response.status
        const data = await response.json()
        console.log(data.results)
        const updatedUserClasses = { ...userClasses, ...data.results };
        setStore({ userClasses: updatedUserClasses });
        localStorage.setItem('userClasses', JSON.stringify(updatedUserClasses));
      },

      deleteUserClass: async (userId, classId) => {
        const token = localStorage.getItem("accessToken");
        const storageAllClasses = localStorage.getItem("allClasses")
        const allClasses = JSON.parse(storageAllClasses)
        const updatedClasses = allClasses.filter((element) => element.id !== classId);

        if (!token) {
          console.error("No access token found!");
          return null;
        }

        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            class_id: classId
          }),
        };

        const response = await fetch(`${process.env.BACKEND_URL}api/users/${userId}/classes/${classId}`, options)
        if (!response.ok) return response.status
        const data = await response.json()
        console.log(data)
        localStorage.setItem('userClasses', JSON.stringify(updatedClasses));
        setStore({ userClasses: updatedClasses });
      },

      deleteTrainerClass: async (trainerId, classId) => {
        const token = localStorage.getItem("accessToken");
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: trainerId,
            class_id: classId
          })
        }
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/classes/${classId}`, options)

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Failed to delete class: ${errorMessage}`);
          return false;
        }

        const storedClassesString = localStorage.getItem("trainerClasses");
        if (storedClassesString) {
          const storedClasses = JSON.parse(storedClassesString);
          const updatedClasses = storedClasses.filter(cls => cls.id !== classId);
          localStorage.setItem("trainerClasses", JSON.stringify(updatedClasses));
          return true;
        } else {
          console.error('No classes found in local storage');
          return false;
        }
      },

      deleteUser: async (id) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No access token found!");
          return null;
        }
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await fetch(`${process.env.BACKEND_URL}api/users/${id}`, options)
        if (!response.ok) return false
        const data = response.json()
        setStore({ logged: false })
        setStore({ currentUser: [] })
        localStorage.removeItem("accessToken")
        localStorage.removeItem("availableUser")
        window.location.href = `${process.env.FRONT_URL}`
        return true
      },

      deleteTrainer: async (id) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No access token found!");
          return null;
        }
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${id}`, options)
        if (!response.ok) return response.status
        const data = response.json()
        console.log(data)
        setStore({ logged: false })
        setStore({ currentUser: [] })
        localStorage.removeItem("accessToken")
        localStorage.removeItem("availableUser")
        window.location.href = `${process.env.FRONT_URL}`
      },

      createCheckoutSession: async (productId, customerId) => {
        try {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.STRIPE_API_KEY}`
            },
            body: JSON.stringify({
              product_id: productId,
              stripe_customer_id: customerId
            }),
          };

          const response = await fetch(`${process.env.BACKEND_URL}api/create-checkout-session`, options);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create checkout session');
          }
          const data = await response.json();
          window.location.href = data.sessionUrl;
        } catch (error) {
          throw new Error(error.message || 'Failed to create checkout session');
        }
      },

      getGeolocation: async (adr) => {
        const apiKey = process.env.GOOGLE_API_KEY;
        const address = adr;


        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to process geolocation request. HTTP error ${response.statusText}`)
        };
        const data = await response.json();
        const location = data.results[0].geometry.location;
        console.log(location)
        const lat = location.lat;
        const lng = location.lng;
        const currentGeolocation = {
          lat: lat,
          lng: lng
        };
        setStore({ currentGeolocation });
        return currentGeolocation;
      }

    }
  }
}

export default getState;