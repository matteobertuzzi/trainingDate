# Training Date

<p>"Training Date" is an online platform that simplifies the connection between personal trainers and users, providing an integrated experience for scheduling, booking, and paying for private fitness training sessions. With an intuitive and user-friendly interface, "Training Date" makes organizing personalized training sessions easy.</p>

## Main Features
<p>The "Training Date" platform is divided into two distinct but equally important parts: the trainer interface and the user interface.</p>

<h4>Trainer Interface:</h4>
<ul>
  <li><strong>App Registration:</strong> Trainers can sign up for the app and confirm their registration via email.</li>
  <li><strong>Specialization Registration:</strong> Before creating their first classes, trainers must confirm their qualifications or certifications by choosing from the available disciplines in the app.</li>
  <li><strong>Specialization Confirmation:</strong> Once submitted, the specialization will be reviewed by the site administrators, and the result of the review will be confirmed by email, whether accepted or rejected.</li>
  <li><strong>Class Creation:</strong> Once the specialization is confirmed, trainers can start creating classes by entering information such as location, number of students, price, etc.</li>
  <li><strong>Profile Editing:</strong> Trainers can edit their profile information.</li>
  <li><strong>Classes:</strong> Trainers can view their created classes, divided into past and future classes for better organization.</li>
</ul>

<h4>User Interface:</h4>
<ul>
  <li><strong>App Registration:</strong> Users can sign up for the app and confirm their registration via email.</li>
  <li><strong>Profile Editing:</strong> Users can edit their profile information.</li>
  <li><strong>Available Classes:</strong> Users can view available classes and filter them to find the class that best fits their physical conditions and training needs.</li>
  <li><strong>Favorites:</strong> Users can mark their favorite classes and proceed to payment directly from this section.</li>
  <li><strong>Payment:</strong> Once a class is chosen, users can pay for it through the app.</li>
  <li><strong>Booked Classes:</strong> Users can view their booked classes and have a history of past classes.</li>
  <li><strong>Available Specializations:</strong> Users can review detailed information on the available specializations if they have any questions regarding the training offered.</li>
</ul>

## Technologies and Libraries Used

<h4>Frontend</h4>
<ul>
  <li><strong>React:</strong> React is a JavaScript library used in "Training Date" to create an interactive and dynamic user interface. It allows building reusable components that efficiently manage the application's state and update quickly when data changes.</li>
  <li><strong>React Router:</strong> React Router is a routing library used in "Training Date" to manage navigation within the application. It allows defining routes and associating specific components with each route, facilitating the creation of a smooth and dynamic navigation experience for users.</li>
  <li><strong>React-Bootstrap:</strong> React-Bootstrap is an extension of Bootstrap adapted to work with React. It is used in "Training Date" to design and style the UI elements consistently, following Bootstrap's design practices and creating an attractive and cohesive user experience.</li>
  <li><strong>Swiper:</strong> Swiper is a JavaScript library that provides a smooth touch sliding experience. It is used in "Training Date" to create and manage sliding elements, such as image carousels, allowing users to navigate intuitively through relevant content.</li>
  <li><strong>Bootswatch:</strong> Bootswatch is a collection of themes for Bootstrap that customize the visual appearance of an application. In "Training Date," Bootswatch is used to select a style theme that reflects the brand identity and provides an attractive and cohesive user experience.</li>
  <li><strong>CSS:</strong> CSS is a language used to define the presentation and layout of HTML documents. In "Training Date," CSS complements the functionalities provided by React and Bootstrap, further customizing the UI's appearance and ensuring a unique and attractive user experience.</li>
</ul>

<h4>Backend</h4>
<ul>
 <li><strong>Python:</strong> Python is the programming language used in the backend of "Training Date" to implement business logic and data handling. Its clear and readable syntax allows for efficient and scalable backend development.</li>
 <li><strong>Flask:</strong> Flask is a Python framework used in "Training Date" to build web applications. It is minimalist and flexible, providing the necessary tools to create API endpoints and manage client requests.</li>
 <li><strong>Flask-Mail:</strong> Flask-Mail is a Flask extension that facilitates sending emails from Flask applications. It is used in "Training Date" to send email notifications, such as registration confirmations.</li>
 <li><strong>Flask-SQLAlchemy:</strong> Flask-SQLAlchemy is a Flask extension that integrates with SQLAlchemy, a Python library for working with relational databases. It is used in "Training Date" to interact with the database and perform operations such as creating, reading, updating, and deleting data.</li>
 <li><strong>flask_bcrypt:</strong> flask_bcrypt is a Flask extension that facilitates password hashing in Flask applications. It is used in "Training Date" to ensure the security of user passwords through hashing and secure comparison of stored passwords.</li>
 <li><strong>flask_jwt_extended:</strong> flask_jwt_extended is a Flask extension that provides support for JSON Web Tokens (JWT) in Flask applications. It is used in "Training Date" to authenticate and authorize user requests using JWT tokens, ensuring application security.</li>
 <li><strong>itsdangerous:</strong> itsdangerous is a Python library used in Flask to generate and verify security tokens and signatures. It is used in "Training Date" to generate secure tokens for user authentication and protection against CSRF (Cross-Site Request Forgery) attacks.</li>
 <li><strong>Stripe:</strong> Stripe is an online payment platform used in "Training Date" to process payments securely and efficiently. It integrates with Flask to manage financial transactions, including charging for reserved classes.</li>
 <li><strong>Cloudinary:</strong> Cloudinary is a cloud service used in "Training Date" to store and manage images efficiently. It is used to upload trainer documentation when submitting certifications.</li>
 <li><strong>Google Maps:</strong> Google Maps is an API used in "Training Date" to integrate map functionalities into the application. It provides information on training locations and offers a rich, geolocated user experience.</li>
 <li><strong>PostgreSQL:</strong> "Training Date" uses PostgreSQL as its relational database management system. PostgreSQL is a popular choice for web applications due to its robustness, scalability, and ability to handle large volumes of data. It integrates with Flask-SQLAlchemy to interact with the database and store user information, classes, reservations, and more.</li>
</ul>

### 1) Installation:

> If you use GitHub Codespaces (recommended) or Gitpod, this template will already come with Python, Node, and the Postgres Database installed. If you are working locally, make sure to install Python 3.10, Node 

It is recommended to install the backend first; make sure you have Python 3.8, Pipenv, and a database engine (Postgres recommended)

1. Install the Python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database. Depending on your database, you have to create a DATABASE_URL variable with one of the possible values, making sure to replace the values with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgres | postgres://username:password@localhost:5432/example |

4. Apply the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models in `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a Migration

You can also undo a migration by running:

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users into the database, execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### Front-End Manual Installation:

-   Ensure you are using Node version 14+ and that you have already successfully installed and run the backend.

1. Install the packages: `$ npm install`
2. Start coding! Start the webpack dev server: `$ npm run start`
