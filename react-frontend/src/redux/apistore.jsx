//api call to add item to the list
const todoitem_fetch = async () => {
  try {
    const response = await fetch('http://localhost:3001/tracker', {
      method: 'GET'
    });

    console.log('Response status of todoitem_fetch:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("recieved from db", data)
    return data;

  } catch (error) {
    console.error('Error submitting data:', error);
    alert('Failed to submit item. Please try again.');
  }
};
const deletetodo = async (task,deadline) => {
  try {
    const response = await fetch(`http://localhost:3001/tracker/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({task,deadline})
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("successfully deleted", data)
  } catch (error) {
    console.error('TACK AND DEADLINE NOT FOUND');
  }
}
//api call to verify login
const verifylogin = async (e,navigate)=>{
  console.log(" lets verify user credentials");
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(email, password); 
 
 try{ const response = await fetch("http://localhost:3001/loginorsignup/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      credentials:"include",
      body: JSON.stringify({email, password})
  });
          const data = await response.json();
          console.log(data);
          if(data.message === "Login successful"){
              navigate("/home");
          }
          else{
              alert("Invalid credentials");
          }
  }
  catch(error){
      console.log(error);
  }
}
//api call to signup
const signup = async (e,navigate)=>{
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(username, email, password);
  try{
    const response = await fetch("http://localhost:3001/loginorsignup/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       credentials: "include", // This line is crucial for sending cookies
      body: JSON.stringify({username, email, password})
    });
    const data = await response.json();
    console.log(data);
    if(data.message === "Signup successful"){
      navigate("/tracker");
    }
    else{
      alert("Invalid credentials");
    }
  }
  catch(error){
    console.log(error);
  }
}


const authenticated_user=async()=>{

     try {
    const response = await fetch('http://localhost:3001/loginorsignup/me', {
      method: 'GET'
    });

    console.log('Response status of fetching authenticated current user:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("authenticated user data ", data)
    return data;

  } catch (error) {
    console.error('authenticated user data error', error);
    alert('Failed to find authenticated user. Please try again.');
  }  
}
export { todoitem_fetch, deletetodo, verifylogin, signup,authenticated_user };
