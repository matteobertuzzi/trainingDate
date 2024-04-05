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
      allClasses: [],
      userClasses: [],
      cart: [],
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

      addCartItem: (newItem) => {
        const store = getStore();
        if (!store.cart.includes(newItem)) {
          const updatedCart = [...store.cart, newItem];
          setStore({ cart: updatedCart });
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
          getActions().removeFavorites(newItem, store.cart);
        }
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

      removeCartItem: (item, array) => {
        const updatedCart = array.filter((element) => element !== item);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setStore({ cart: updatedCart });
      },

      getAllClasses: async () => {
        const classesInLocalStorage = localStorage.getItem('allClasses')
        if (classesInLocalStorage) {
          setStore({ allClasses: JSON.parse(classesInLocalStorage) })
        } else {
          const url = `${process.env.BACKEND_URL}api/classes`
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
          const url = `${process.env.BACKEND_URL}api/specializations`
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
        const response = await fetch(`${process.env.BACKEND_URL}api/login/${user_type}`, options)
        if (!response.ok) return false
        const data = await response.json()
        setStore({ currentUser: data.results });
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
          localStorage.removeItem("availableAccount");
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
            console.error("Access token is not valid or expired. Removed from local storage.");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("availableAccount");
          } else {
            console.error(`Error fetching protected data. HTTP Status: ${response.status}`);
          }
          return null;
        }

        const data = await response.json();
        setStore({ currentUser: JSON.parse(account) });
        getActions().setLogged(true);
      },

      getUserClasses: async () => {
        const userClassesInLocalStorage = localStorage.getItem('userClasses')
        if (userClassesInLocalStorage) {
          setStore({ userClasses: JSON.parse(userClassesInLocalStorage) })
        } else {
          let currentAccount = localStorage.getItem('availableAccount');
          currentAccount = JSON.parse(currentAccount);
          const id = currentAccount.user.id;
          console.log(id);
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
          const userClassInfo = data.result;
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
          setStore({ userClasses: classDetails })
          console.log(getStore().userClasses);
          localStorage.setItem('userClasses', JSON.stringify(classDetails))
        }
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
          return response.statusText;
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
        return data
      },

      getAvailableAccount: async () => {
        const token = localStorage.getItem("accessToken");
        const account = localStorage.getItem("availableAccount");

        if (!token) {
          console.error("No access token found");
          localStorage.removeItem("availableAccount");
          getActions().setLogged(false)
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
            console.error("Access token is not valid or expired. Removed from local storage.");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("availableAccount");
            getActions().setLogged(false)
          } else {
            console.error(`Error fetching protected data. HTTP Status: ${response.status}`);
            getActions().setLogged(false)
          }
          return null;
        }

        const data = await response.json();
        setStore({ currentUser: JSON.parse(account) });
        getActions().setLogged(true);
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
            training_type: inputs.training_type
          }),
        };
        const response = await fetch(`${process.env.BACKEND_URL}api/trainers/${trainerId}/classes`, options);
        if (!response.ok) {
          console.log(response)
          return false;
        }
        const data = await response.json();
        console.log(data)
        getActions().postStripeProduct(data.class.id, data.class.training_level, data.class.price)
        setStore({ trainerClasses: data.class })
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

      updateCart: (newClass) => {
        const cartClasses = getStore().cart;
        if (cartClasses.includes(newClass)) {
          console.error("Class already added to cart!")
          return null
        } else {
          const updatedCart = [...cartClasses, newClass];
          setStore({ cart: updatedCart });
          console.log(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
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

        // Crear un nuevo objeto FormData
        const formData = new FormData();
        formData.append('certification', inputs.certification);
        formData.append('specialization_id', inputs.specialization_id);

        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData // Pasar formData directamente como cuerpo de la solicitud
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

      createCheckoutSession: async (productId) => {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRIPE_API_KEY}`
          },
          body: JSON.stringify({
            productId: productId
          }),
        };

        const response = await fetch(`${process.env.BACKEND_URL}api/create-checkout-session`, options);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create checkout session');
        }

        const data = await response.json();
        window.location.href = data.sessionUrl;
      },

      postStripeProduct: async (id, level, amount) => {
        const stripe = require('stripe')(process.env.STRIPE_API_KEY);

        try {
          // Crear el producto en Stripe
          const product = await stripe.products.create({
            name: id,
            description: level
          });

          console.log('Producto creado:', product);

          // Crear el precio asociado al producto
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: amount * 100,
            currency: 'eur'
          });

          console.log('Precio creado:', price);
        } catch (error) {
          console.error('Error al crear el producto o precio en Stripe:', error);
          throw error;
        }
      },

      deleteStripeProduct: async (productId) => {
        const options = {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${process.env.STRIPE_API_KEY}`,
          },
        };

        const response = await fetch(`https://api.stripe.com/v1/products/${productId}`, options);
        if (!response.ok) {
          console.error(`Error al eliminar el producto. Código de estado HTTP: ${response.status}`);
          return false;
        }
        return true
        console.log('Producto eliminado correctamente');
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
        console.log(data);
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